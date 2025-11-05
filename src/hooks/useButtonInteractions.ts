// hooks/useButtonInteractions.ts
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const useButtonInteractions = () => {
  const { gl, camera, scene } = useThree()
  
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const mouse = new THREE.Vector2()
      const rect = gl.domElement.getBoundingClientRect()
      
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      
      const intersects = raycaster.intersectObjects(scene.children, true)
      
      for (const intersect of intersects) {
        const mesh = intersect.object as THREE.Mesh
        if (mesh.userData.isButton) {
          mesh.dispatchEvent({ type: 'click', target: mesh });
          break
        }
      }
    }
    
    const handleMouseMove = (event: MouseEvent) => {
      const mouse = new THREE.Vector2()
      const rect = gl.domElement.getBoundingClientRect()
      
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      
      const intersects = raycaster.intersectObjects(scene.children, true)
      
      let foundButton = false
      for (const intersect of intersects) {
        const mesh = intersect.object as THREE.Mesh
        if (mesh.userData.isButton) {
          mesh.dispatchEvent({ type: 'pointerenter', target: mesh });
          foundButton = true
        }
      }
      
      if (!foundButton) {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.userData.isButton) {
            child.dispatchEvent({ type: 'pointerleave' })
          }
        })
      }
    }
    
    gl.domElement.addEventListener('click', handleClick)
    gl.domElement.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      gl.domElement.removeEventListener('click', handleClick)
      gl.domElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [gl, camera, scene])
}
