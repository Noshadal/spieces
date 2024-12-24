'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const videos = [
  '/placeholder.svg?height=200&width=400',
  '/placeholder.svg?height=200&width=400',
  '/placeholder.svg?height=200&width=400',
]

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  return (
    <div className="relative w-full h-48">
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prevSlide} className="p-1 rounded-full bg-black bg-opacity-50 text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="p-1 rounded-full bg-black bg-opacity-50 text-white">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {videos.map((video, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img src={video} alt={`Video ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

