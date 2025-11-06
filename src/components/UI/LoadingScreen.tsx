import { useProgress } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'

interface LoadingScreenProps {
  onLoaded: () => void
}

const loadingImages = {
  10: '/loading/10percent.png',
  20: '/loading/20percent.png',
  30: '/loading/30percent.png',
  40: '/loading/40percent.png',
  50: '/loading/50percent.png',
  60: '/loading/60percent.png',
  70: '/loading/70percent.png',
  80: '/loading/80percent.png',
  90: '/loading/90percent.png',
  100: '/loading/100percent.png'
}

export function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const { progress, active } = useProgress()
  const [isVisible, setIsVisible] = useState(true)
  const [currentImage, setCurrentImage] = useState(loadingImages[10])
  const [fade, setFade] = useState(false)
  const currentImageRef = useRef(currentImage)

  useEffect(() => {
    const roundedProgress = Math.max(10, Math.min(Math.floor(progress / 10) * 10, 100)) as keyof typeof loadingImages
    const nextImage = loadingImages[roundedProgress]

    if (nextImage && nextImage !== currentImageRef.current) {
      setFade(true)
      const timer = setTimeout(() => {
        currentImageRef.current = nextImage
        setCurrentImage(nextImage)
        setFade(false)
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [progress])

  useEffect(() => {
    if (!active && progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onLoaded()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [active, progress, onLoaded])

  if (!isVisible) return null

  // const loadingMessages = [
  //   "Setting up the site...",
  //   "Loading 3D models...", 
  //   "Preparing textures...",
  //   "Final touches...",
  //   "Ready to explore!"
  // ]

  // const messageIndex = Math.min(Math.floor(progress / 20), loadingMessages.length - 1)

  return (
    <div className="fixed inset-0 bg-blue-50 z-50 flex items-center justify-center" style={{ fontFamily: "'gaegu', sans-serif" }}>
      <div className="text-black text-center w-100">
        {/* <p className="text-4xl mb-6">{loadingMessages[messageIndex]}</p> */}
        <p className="text-4xl mb-6">Setting up the site...</p>

        {/* Image-based Progress */}
        <div className="relative">
          <img
            src={currentImage}
            alt={`Loading ${Math.round(progress)}%`}
            className={`w-full h-full object-contain transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>

        {/* Progress Text */}
        {/* <div className="flex justify-between text-xl mb-2 mt-4">
          <span>{loadingMessages[messageIndex]}</span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div> */}

        <p className="text-xl text-black mt-4">
          Use desktop for best experience
        </p>
      </div>
    </div>
  )
}

// // components/UI/LoadingScreen.tsx
// import { useProgress } from '@react-three/drei'
// import { useEffect, useRef, useState } from 'react'

// interface LoadingScreenProps {
//   onLoaded: () => void
// }

// const loadingImages = {
//   10: '/loading/10percent.png',
//   20: '/loading/20percent.png',
//   30: '/loading/30percent.png',
//   40: '/loading/40percent.png',
//   50: '/loading/50percent.png',
//   60: '/loading/60percent.png',
//   70: '/loading/70percent.png',
//   80: '/loading/80percent.png',
//   90: '/loading/90percent.png',
//   100: '/loading/100percent.png'
// }

// export function LoadingScreen({ onLoaded }: LoadingScreenProps) {
//   const { progress, active } = useProgress()
//   const [isVisible, setIsVisible] = useState(true)
//   const [currentImage, setCurrentImage] = useState(loadingImages[10])
//   const [fade, setFade] = useState(false)
//   const currentImageRef = useRef(currentImage)


//   useEffect(() => {
//     const roundedProgress = Math.max(10, Math.min(Math.floor(progress / 10) * 10, 100)) as keyof typeof loadingImages
//     const nextImage = loadingImages[roundedProgress]

//     if (nextImage && nextImage !== currentImageRef.current) {
//         setFade(true)
//       setTimeout(() => {
//         currentImageRef.current = nextImage
//         setCurrentImage(nextImage)
//         setFade(false)
//       }, 200)
//     }
//   }, [progress])

//   // Hide loading screen when done
//   useEffect(() => {
//     if (!active && progress >= 100) {
//       const timer = setTimeout(() => {
//         setIsVisible(false)
//         onLoaded()
//       }, 500) // small delay for final fade

//       return () => clearTimeout(timer)
//     }
//   }, [active, progress, onLoaded])

//   if (!isVisible) return null

//   // const loadingMessages = [
//   //   "Setting up the room...",
//   //   "Loading 3D models...", 
//   //   "Preparing textures...",
//   //   "Final touches...",
//   //   "Ready to explore!"
//   // ]

//   // const messageIndex = Math.min(Math.floor(progress / 20), loadingMessages.length - 1)

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ fontFamily: "'gaegu', sans-serif" }}>
//       <div className="text-black text-center">
//         <p className="text-4xl">Setting up the site...</p>
//         {/* <p className="text-4xl mb-6">{loadingMessages[messageIndex]}</p> */}

//         {/* Image-based Progress */}
//         <div className="relative w-100 h-100">
//           <img
//             src={currentImage}
//             alt={`Loading ${Math.round(progress)}%`}
//             className={`w-full h-full object-contain transition-opacity duration-200 ${fade ? 'opacity-0' : 'opacity-100'}`}
//           />
//         </div>

//         {/* Progress Text */}
//         {/* <div className="text-xl font-mono">{Math.round(progress)}%</div> */}
//         <p className="text-lg text-black">Use desktop for best experience</p>
//       </div>
//     </div>
//   )
// }

// // components/UI/LoadingScreen.tsx
// import { useProgress } from '@react-three/drei'
// import { useEffect, useState } from 'react'

// interface LoadingScreenProps {
//   onLoaded: () => void
// }

// export function LoadingScreen({ onLoaded }: LoadingScreenProps) {
//   const { progress, active } = useProgress()
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     if (!active && progress >= 100) {
//       const timer = setTimeout(() => {
//         setIsVisible(false)
//         onLoaded()
//       }, 0)

//       return () => clearTimeout(timer)
//     }
//   }, [active, progress, onLoaded])

//   if (!isVisible) return null

//   const loadingMessages = [
//     "Setting up the room...",
//     "Loading 3D models...", 
//     "Preparing textures...",
//     "Final touches...",
//     "Ready to explore!"
//   ]

//   const messageIndex = Math.min(
//     Math.floor(progress / 20),
//     loadingMessages.length - 1
//   )

//   return (
//     <div className="fixed inset-0 bg-blue-50 z-50 flex items-center justify-center" style={{ fontFamily: "'gaegu', sans-serif" }}>
//       <div className="text-black text-center w-100">
//         <p className="text-4xl mb-6">Setting up the room...</p>
//         {/* Progress Bar */}
//         <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
//           <div 
//             className="bg-blue-500 h-3 rounded-full transition-all duration-200 ease-out relative"
//             style={{ width: `${progress}%` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
//           </div>
//         </div>
        
//         {/* Progress Text */}
//         <div className="flex justify-between text-xl mb-2">
//           <span>{loadingMessages[messageIndex]}</span>
//           <span className="font-mono">{Math.round(progress)}%</span>
//         </div>
        
//         <p className="text-lg text-gray-400 mt-4">
//           Use desktop for best experience
//         </p>
//       </div>
//     </div>
//   )
// }

// // components/UI/LoadingScreen.tsx
// import { useState, useEffect } from 'react'

// interface LoadingScreenProps {
//   isLoaded: boolean
//   onAnimationComplete: () => void
// }

// export function LoadingScreen({ isLoaded, onAnimationComplete }: LoadingScreenProps) {
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     if (isLoaded) {
//       const timer = setTimeout(() => {
//         setIsVisible(false)
//         onAnimationComplete()
//       }, 0)
      
//       return () => clearTimeout(timer)
//     }
//   }, [isLoaded, onAnimationComplete])

//   if (!isVisible) return null

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//       <div className="text-white text-center">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
//         <p className="text-3xl">Setting up the room...</p>
//         <p className="text-sm">(Use in desktop for best experience)</p>
//       </div>
//     </div>
//   )
// }
