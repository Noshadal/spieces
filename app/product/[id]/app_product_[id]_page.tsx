'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react'

const product = {
  id: 1,
  name: 'Cinnamon Sticks',
  price: 5.99,
  rating: 4.5,
  image: '/placeholder.svg?height=400&width=400',
  description: 'High-quality cinnamon sticks, perfect for adding warmth and flavor to your dishes and beverages.',
}

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Added ${quantity} ${product.name} to cart`)
  }

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log(`Buying ${quantity} ${product.name}`)
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="relative h-64 bg-gray-100">
        <button onClick={() => router.back()} className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-gray-600">{product.rating}</span>
        </div>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 bg-gray-200 rounded-l"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded-r"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-full flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-2 px-4 bg-green-500 text-white rounded-full"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

