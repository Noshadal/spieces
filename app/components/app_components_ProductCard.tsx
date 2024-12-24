'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useFirebase } from './FirebaseProvider'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { user, db } = useFirebase()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
    // TODO: Implement actual add to cart functionality
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user || !db) return

    const favoriteRef = doc(db, 'favorites', `${user.uid}_${product.id}`)

    try {
      if (isFavorite) {
        await deleteDoc(favoriteRef)
      } else {
        await setDoc(favoriteRef, { userId: user.uid, productId: product.id })
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <Link href={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative pb-[100%]">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-500'
          }`}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={`p-2 rounded-full ${
              isAdded ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            } transition-colors duration-300`}
          >
            {isAdded ? 'Added' : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </Link>
  )
}

