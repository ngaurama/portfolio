// components/Scene/Models/Pen.tsx
import { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModels } from '../../../hooks/useModels'

interface PenProps {
  position?: [number, number, number],
  rotation?: [number, number, number]
}

export function Pen({ position = [0, 0, 0], rotation = [0, Math.PI * -0.1, 0]}: PenProps) {
  const { models } = useModels()
  const penRef = useRef<THREE.Group>(null)

  if (!models.pen) return null

  return (
    <group ref={penRef} position={position} rotation={rotation}>
      <primitive 
        object={models.pen.scene} 
        scale={0.0023}
        rotation={[Math.PI / 2, Math.PI, Math.PI / 2.8]}
      />
    </group>
  )
}
