import ProductCard from './ProductCard'

const products = [
  { id: 1, name: 'Cinnamon Sticks', price: 5.99, rating: 4.5, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Ground Turmeric', price: 3.99, rating: 4.2, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Whole Cloves', price: 4.49, rating: 4.7, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Cardamom Pods', price: 6.99, rating: 4.8, image: '/placeholder.svg?height=200&width=200' },
]

export default function ProductList() {
  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

