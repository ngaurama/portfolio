// components/Scene/DevControls.tsx
import { OrbitControls } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'

interface DevControlsProps {
  enabled: boolean
}

export function DevControls({ enabled }: DevControlsProps) {
  // const { camera, gl } = useThree()

  if (!enabled) return null

  return (
    <OrbitControls
      // args={[camera, gl.domElement]}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      minDistance={1}
      maxDistance={20}
    />
  )
}
