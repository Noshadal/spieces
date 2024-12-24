'use client'

import { useState, useEffect } from 'react'
import { useFirebase } from '../components/FirebaseProvider'
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import Link from 'next/link'

interface CartItem {
  id: string
  productId: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { user, db } = useFirebase()

  useEffect(() => {
    if (user && db) {
      const fetchCartItems = async () => {
        const cartRef = collection(db, 'cart')
        const q = query(cartRef, where('userId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const items: CartItem[] = []
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as CartItem)
        })
        setCartItems(items)
      }
      fetchCartItems()
    }
  }, [user, db])

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (!db) return
    const itemRef = doc(db, 'cart', itemId)
    await updateDoc(itemRef, { quantity: newQuantity })
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = async (itemId: string) => {
    if (!db) return
    await deleteDoc(doc(db, 'cart', itemId))
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 bg-gray-200 rounded-l">-</button>
                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">Remove</button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
            <Link href="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

