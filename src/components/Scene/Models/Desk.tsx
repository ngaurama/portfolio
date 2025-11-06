// components/Scene/Models/Desk.tsx
import { useRef } from 'react'
import * as THREE from 'three'
import { useModels } from '../../../hooks/useModels'
import { HelpText3D } from './HelpText'
import { useAtom } from 'jotai'
import { helpActiveAtom } from '../../../atoms/helpAtom'

interface DeskProps {
  position?: [number, number, number]
}

export function Desk({ position = [0, 0, 0] }: DeskProps) {
  const { models } = useModels()
  const deskRef = useRef<THREE.Group>(null)
  const [helpActive] = useAtom(helpActiveAtom)

  if (!models.desk) return null

  return (
    <group ref={deskRef} position={position}>
      <primitive 
        object={models.desk.scene} 
        scale={0.4}
        rotation={[0, Math.PI * 0.5, 0]}
      />
      {/* &nbsp; */}
      {helpActive && (
        <>
          <HelpText3D
            position={[3, 4.8, 1.2]}
            rotation={[0, -Math.PI * 0.51, 0]}
            text="Click on the book to view main portfolio content."
            fontSize={0.35}
            maxWidth={2.8}
          />

          <HelpText3D
            position={[-0.5, 5.6, -3]}
            rotation={[0.12, 0.1, 0]}
            text="Click on laptop to interact with the terminal."
            fontSize={0.35}
            maxWidth={3}
          />

          <HelpText3D
            position={[3, 5.75, -1.1]}
            rotation={[0, -0.8, 0]}
            text="Click &nbsp;&nbsp;on the lamp to        change the lighting   color"
            fontSize={0.25}
            maxWidth={2.3}
          />

          <HelpText3D
            position={[-3.9, 4.8, -0.5]}
            rotation={[0, 0.1, 0]}
            text="Click on the headphones for music. (coming soon)"
            fontSize={0.25}
            maxWidth={2.2}
          />

          <HelpText3D
            position={[-3, 4.18, 3]}
            rotation={[0, 0, 0]}
            color={"white"}
            text="Scroll to change views"
            fontSize={0.23}
            maxWidth={5}
          />
        </>
      )}
    </group>
  )
}

// // components/Scene/Models/Desk.tsx
// import { useRef } from 'react'
// // import { useFrame } from '@react-three/fiber'
// import * as THREE from 'three'
// import { useModels } from '../../../hooks/useModels'

// interface DeskProps {
//   position?: [number, number, number]
// }

// export function Desk({ position = [0, 0, 0] }: DeskProps) {
//   const { models } = useModels()
//   const deskRef = useRef<THREE.Group>(null)

//   if (!models.desk) return null

//   return (
//     <group ref={deskRef} position={position}>
//       <primitive 
//         object={models.desk.scene} 
//         scale={0.4}
//         rotation={[0, Math.PI * 0.5, 0]}
//       />
//     </group>
//   )
// }
