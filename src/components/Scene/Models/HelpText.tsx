// components/Scene/HelpText3D.tsx
import { useRef } from 'react'
// import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

interface HelpText3DProps {
  position: [number, number, number]
  text: string
  rotation?: [number, number, number]
  fontSize?: number
  maxWidth?: number
  color?: string
}

export function HelpText3D({ 
  position, 
  text, 
  rotation = [0, 0, 0],
  fontSize = 0.15,
  maxWidth = 2,
  color = '#000000'
}: HelpText3DProps) {
  const textRef = useRef<THREE.Group>(null)

    //   useFrame((state) => {
    //     if (textRef.current) {
    //       textRef.current.lookAt(state.camera.position)
    //     }
    //   })

  return (
    <group ref={textRef} position={position} rotation={rotation}>
      <Text
        font="/fonts/gaegu-regular.woff"
        fontSize={fontSize}
        color={color}
        maxWidth={maxWidth}
        textAlign="left"
        anchorX="center"
        anchorY="middle"
        // outlineWidth={0.02}
        // outlineColor="#ffffff"
        // outlineOpacity={0.8}
      >
        {text}
      </Text>
      {/* <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[maxWidth, fontSize * 4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh> */}
    </group>
  )
}
