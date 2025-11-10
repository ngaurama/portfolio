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

  const laptop = useGLTF('/models/laptop.glb')
  const headphones = useGLTF('/models/optimized_headphones.glb') 
  const lamp = useGLTF('/models/lamp.glb')
  const desk = useGLTF('/models/optimized_desk.glb')
  const chair = useGLTF('/models/optimized_chair.glb')
  const pen = useGLTF('/models/optimized_ballpoint_pen.glb')
  const music_widget = useGLTF('/models/optimized_simple_music_widget.glb')

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
