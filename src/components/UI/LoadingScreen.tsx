// components/UI/LoadingScreen.tsx
import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  isLoaded: boolean
  onAnimationComplete: () => void
}

export function LoadingScreen({ isLoaded, onAnimationComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onAnimationComplete()
      }, 0)
      
      return () => clearTimeout(timer)
    }
  }, [isLoaded, onAnimationComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-xl">Setting up the room...</p>
      </div>
    </div>
  )
}
