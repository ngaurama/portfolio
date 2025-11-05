// components/Scene/Models/Headphones.tsx
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useModels } from '../../../../hooks/useModels'
import { useFrame } from '@react-three/fiber'
import { useCamera } from '../../../../hooks/useCamera'

interface HeadphonesProps {
  position?: [number, number, number],
  rotation?: [number, number, number]
}

export function Headphones({ position = [0, 0, 0], rotation = [0, Math.PI * -0.1, 0]}: HeadphonesProps) {
  const { models } = useModels()
  const { moveToHeadphoneView, moveToFrontView, currentView } = useCamera()
  const headphoneRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (headphoneRef.current && hovered) {
      headphoneRef.current.scale.lerp(new THREE.Vector3(1.04, 1, 1.04), 0.1)
    } else if (headphoneRef.current) {
      headphoneRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  const handleClick = () => {
    if (currentView !== "headphone") {
      moveToHeadphoneView()
    } else {
      moveToFrontView()
    }
  }

  const handlePointerEnter = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerLeave = () => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  if (!models.headphones) return null

  return (
    <group 
      ref={headphoneRef} 
      position={position} 
      rotation={rotation}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      >
      <primitive 
        object={models.headphones.scene} 
        scale={0.8}
        rotation={[0, Math.PI * 0.4, 0]}
      />
    </group>
  )
}
