import VideoCarousel from './components/VideoCarousel'
import ProductList from './components/ProductList'

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 pb-16">
      <VideoCarousel />
      <ProductList />
    </div>
  )
}

