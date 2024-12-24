'use client'

import { useState, useEffect } from 'react'
import { useFirebase } from '../components/FirebaseProvider'
import { collection, query, where, getDocs } from 'firebase/firestore'
import ProductCard from '../components/ProductCard'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  image: string
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Product[]>([])
  const { user, db } = useFirebase()

  useEffect(() => {
    if (user && db) {
      const fetchFavorites = async () => {
        const favoritesRef = collection(db, 'favorites')
        const q = query(favoritesRef, where('userId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const favoriteProducts: Product[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          favoriteProducts.push({
            id: data.productId,
            name: data.name,
            price: data.price,
            rating: data.rating,
            image: data.image,
          })
        })
        setFavorites(favoriteProducts)
      }
      fetchFavorites()
    }
  }, [user, db])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

