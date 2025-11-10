import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useCamera } from '../../../hooks/useCamera'

interface HelpText3DProps {
  position: [number, number, number]
  text: string
  rotation?: [number, number, number]
  fontSize?: number
  maxWidth?: number
  color?: string
  fadeOut?: boolean
  outlineWidth?: number
  outlineColor?: string
  outlineOpacity?: number
}

export function HelpText3D({ 
  position, 
  text, 
  rotation = [0, 0, 0],
  fontSize = 0.15,
  maxWidth = 2,
  color = '#000000',
  fadeOut = false,
  outlineWidth,
  outlineColor,
  outlineOpacity
}: HelpText3DProps) {
  const textRef = useRef<THREE.Group>(null)
  const [opacity, setOpacity] = useState(1)
  const {currentView} = useCamera()

  useEffect(() => {
    if (fadeOut && currentView !== 'side') {
      let frame: number
      const duration = 1500
      const start = performance.now()
      const animate = (time: number) => {
        const t = Math.min((time - start) / duration, 1)
        setOpacity(1 - t)
        if (t < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frame)
    } else {
      setOpacity(1)
    }
  }, [fadeOut])

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
        material-toneMapped={false}
        material-color={new THREE.Color(color)}
        material-transparent
        material-opacity={opacity}
        outlineWidth={outlineWidth}
        outlineColor={outlineColor}
        outlineOpacity={outlineOpacity}
      >
        {text}
      </Text>
    </group>
  )
}
