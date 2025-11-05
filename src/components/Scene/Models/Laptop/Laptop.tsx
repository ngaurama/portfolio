// components/Scene/Models/Laptop.tsx
import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useModels } from '../../../../hooks/useModels'
import { ScreenManager } from './ScreenManager'
import { useCamera } from '../../../../hooks/useCamera'

interface LaptopProps {
  position?: [number, number, number],
  rotation?: [number, number, number]
}

export function Laptop({ position = [0, 0, 0.3], rotation = [0, Math.PI * -0.1, 0] }: LaptopProps) {
  const { models } = useModels()
  const { moveToLaptopView, moveToFrontView, currentView } = useCamera()
  const laptopRef = useRef<THREE.Group>(null)
  const [screenMesh, setScreenMesh] = useState<THREE.Mesh | null>(null)
  const [hovered, setHovered] = useState(false)
  // const [clicked, setClicked] = useState(false)
  useEffect(() => {
    if (!models.laptop) return

    
    const findScreenMesh = (object: THREE.Object3D): THREE.Mesh | null => {
      if (object instanceof THREE.Mesh && object.name === 'Screen')
        return object
      for (const child of object.children) {
        const result = findScreenMesh(child)
        if (result) return result
      }
      
      return null
    }

    const screen = findScreenMesh(models.laptop.scene)
    if (screen) {
      setScreenMesh(screen)
    }
  }, [models.laptop])

  useFrame(() => {
    if (laptopRef.current && hovered) {
      laptopRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1)
    } else if (laptopRef.current) {
      laptopRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  const handleClick = () => {
    if (currentView !== "laptop") {
      moveToLaptopView()
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

  if (!models.laptop) return null

  return (
    <group 
      ref={laptopRef} 
      position={position} 
      rotation={rotation}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <primitive 
        object={models.laptop.scene} 
        scale={1}
      />
      {screenMesh && (
        <>
            <ScreenManager 
            screenMesh={screenMesh} 
            isPoweredOn={true}
            />
        </>
      )}
    </group>
  )
}




// BTW I know I say this a lot, and chat clowns me about it, but if anyone has any questions about the runs, feel free to ask away. I'll do my best to share my knowledge about silksong or silksong speedrunning or anything like that, so just ask away.