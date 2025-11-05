// components/Scene/Models/Desk.tsx
import { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModels } from '../../../hooks/useModels'

interface DeskProps {
  position?: [number, number, number]
}

export function Desk({ position = [0, 0, 0] }: DeskProps) {
  const { models } = useModels()
  const deskRef = useRef<THREE.Group>(null)

  if (!models.desk) return null

  return (
    <group ref={deskRef} position={position}>
      <primitive 
        object={models.desk.scene} 
        scale={0.4}
        rotation={[0, Math.PI * 0.5, 0]}
      />
    </group>
  )
}
