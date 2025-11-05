// components/Scene/Models/Chair.tsx
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModels } from '../../../hooks/useModels'
import { useCamera } from '../../../hooks/useCamera'

interface ChairProps {
  position?: [number, number, number]
}

export function Chair({ position = [0, 0, 0] }: ChairProps) {
  const { models } = useModels()
  const chairRef = useRef<THREE.Group>(null)
  const { currentView, moveToFrontView, moveToSideView } = useCamera()
  const [hovered, setHovered] = useState(false)
  
  // const handleClick = (event: Event) => {
  //   if (currentView !== 'book') {
  //     event.stopPropagation()
  //     moveToFrontView()
  //   }
  // }

  const handlePointerEnter = () => {
    if (currentView !== 'book') {
      setHovered(true)
      document.body.style.cursor = 'pointer'
    }
  }

  const handlePointerLeave = () => {
    if (currentView !== 'book') {
      setHovered(false)
      document.body.style.cursor = 'default'
    }
  }

  const handleClick = (event: Event) => {
    if (currentView !== "front") {
      event.stopPropagation()
      moveToFrontView()
    } else {
      moveToSideView()
    }
  }

  useFrame(() => {
    if (chairRef.current && hovered && currentView !== 'book') {
      chairRef.current.scale.lerp(new THREE.Vector3(1.02, 1.02, 1.02), 0.1)
    } else if (chairRef.current) {
      chairRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  if (!models.chair) return null

  return (
    <group 
      ref={chairRef} 
      position={position}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      >
      <primitive 
        object={models.chair.scene} 
        scale={6}
        rotation={[0, Math.PI * 1.17, 0]}
    />
    </group>
  )
}
