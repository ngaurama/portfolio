// hooks/useModels.ts
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import { useState, useEffect } from 'react'

type ModelType = 'laptop' | 'headphones' | 'lamp' | 'desk' | 'chair' | 'pen' | 'music_widget'

interface UseModelsReturn {
  models: {
    [key in ModelType]: GLTF | null
  }
  isLoading: boolean
}

export function useModels(): UseModelsReturn {
  const [isLoading, setIsLoading] = useState(true)

  // Load your actual model paths here
  const laptop = useGLTF('/models/laptop_rounded.glb')
  const headphones = useGLTF('/models/headphones.glb') 
  const lamp = useGLTF('/models/lamp_2.glb')
  const desk = useGLTF('/models/desk.glb')
  const chair = useGLTF('/models/chair/source/chair.glb')
  const pen = useGLTF('/models/ballpoint_pen.glb')
  const music_widget = useGLTF('/models/music_widget.glb')

  // Track when each model loads
  useEffect(() => {
    const allModelsLoaded = laptop && headphones && lamp && desk && chair && pen && music_widget
    
    // console.log('Model loading status:', {
    //   laptop: !!laptop,
    //   headphones: !!headphones,
    //   lamp: !!lamp,
    //   desk: !!desk,
    //   chair: !!chair,
    //   pen: !!pen,
    //   music_widget: !!music_widget,
    //   allLoaded: allModelsLoaded
    // })

    if (allModelsLoaded) {
      setIsLoading(false)
    }
  }, [laptop, headphones, lamp, desk, chair, pen, music_widget])

  return {
    models: {
      laptop,
      headphones, 
      lamp,
      desk,
      chair,
      pen,
      music_widget
    },
    isLoading
  }
}
