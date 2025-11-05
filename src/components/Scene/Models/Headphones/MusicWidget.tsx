// components/Scene/Models/MusicWidget.tsx
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useModels } from '../../../../hooks/useModels'
import { useFrame } from '@react-three/fiber'
import { useMusicPlayer } from '../../../../hooks/useMusicPlayer'
import { Text } from '@react-three/drei'

interface MusicWidgetProps {
  position?: [number, number, number],
  rotation?: [number, number, number],
}

export function MusicWidget({ position = [0, 0, 0], rotation = [0, Math.PI * -0.1, 0] }: MusicWidgetProps) {
  const { models } = useModels()
  // const { scene } = useThree()
  const musicWidgetRef = useRef<THREE.Group>(null)
  const progressBarRef = useRef<THREE.Mesh>(null)
  const progresserRef = useRef<THREE.Mesh>(null)
  const playButtonRef = useRef<THREE.Mesh>(null)
  const pauseButtonRef = useRef<THREE.Mesh>(null)
  const nextButtonRef = useRef<THREE.Mesh>(null)
  const prevButtonRef = useRef<THREE.Mesh>(null)

  const [, setHoveredButton] = useState<string | null>(null)
  
  const {
    isPlaying,
    currentSong,
    progress,
    play,
    pause,
    playNext,
    playPrevious
  } = useMusicPlayer()


  useEffect(() => {
    if (!models.music_widget) return

    models.music_widget.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        switch (child.name.toLowerCase()) {
          case 'progress_bar':
            progressBarRef.current = child;
            child.userData.originalPosition = child.position.clone();
            child.userData.originalScale = child.scale.clone();
            break;
          case 'progresser':
            progresserRef.current = child;
            child.userData.originalPosition = child.position.clone();
            break;
          case 'play':
            playButtonRef.current = child;
            break;
          case 'pause':
            pauseButtonRef.current = child;
            break;
          case 'next':
            nextButtonRef.current = child;
            break;
          case 'previous':
            prevButtonRef.current = child;
            break;
        }
      }
    });
  }, [models.music_widget]);

useFrame(() => {
  if (progresserRef.current && progressBarRef.current) {
    const progressNormalized = progress / 100;
    
    // const barWidth = progressBarRef.current.scale.x;
    const barPosition = progressBarRef.current.position;
    
    const leftEdge = barPosition.x - 1.6;
    const rightEdge = barPosition.x + 1.3;
    
    progresserRef.current.position.x = leftEdge + progressNormalized * (rightEdge - leftEdge);
    
  }
});

const fillRef = useRef<THREE.Mesh>(null);
useEffect(() => {
  if (!progressBarRef.current) return;

  const leftEdge = -1.6;
  const rightEdge = 1.3;
  const totalRange = rightEdge - leftEdge;
  
  const fillGeometry = new THREE.PlaneGeometry(totalRange, 0.09);
  const fillMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xcc0000,
    transparent: true,
    opacity: 0.7
  });
  
  const fillMesh = new THREE.Mesh(fillGeometry, fillMaterial);
  fillMesh.name = 'fill';
  fillMesh.position.set(leftEdge, 0, 0.01);
  fillMesh.scale.x = 0;
  
  progressBarRef.current.add(fillMesh);
  fillRef.current = fillMesh;
}, [progressBarRef.current]);
useFrame(() => {
  if (progresserRef.current && fillRef.current) {
    const progressNormalized = progress / 100;
    
    const leftEdge = -1.6;
    const rightEdge = 1.3;
    const totalRange = rightEdge - leftEdge;
    
    const currentX = leftEdge + progressNormalized * totalRange;
    
    progresserRef.current.position.x = currentX;
    fillRef.current.scale.x = progressNormalized;
    fillRef.current.position.x = leftEdge + (progressNormalized * totalRange) / 2;
  }
});

  const handleButtonClick = (buttonType: string) => {
    switch (buttonType) {
      case 'play':
        play();
        break;
      case 'pause':
        pause();
        break;
      case 'next':
        playNext();
        break;
      case 'previous':
        playPrevious();
        break;
    }
  }

  const handlePointerEnter = (buttonType: string) => {
    setHoveredButton(buttonType);
    document.body.style.cursor = 'pointer';
  }

  const handlePointerLeave = () => {
    setHoveredButton(null);
    document.body.style.cursor = 'default';
  }


  useEffect(() => {
    if (!models.music_widget) return;

    const addButtonInteractions = (mesh: THREE.Mesh | null, buttonType: string) => {
      if (!mesh) {

        return;
      }
      
      mesh.userData.isButton = true;
      mesh.userData.buttonType = buttonType;

      const handleClick = () => handleButtonClick(buttonType);
      const handleEnter = () => handlePointerEnter(buttonType);
      const handleLeave = handlePointerLeave;

      mesh.addEventListener('click', handleClick);
      mesh.addEventListener('pointerenter', handleEnter);
      mesh.addEventListener('pointerleave', handleLeave);

      return () => {
        mesh.removeEventListener('click', handleClick);
        mesh.removeEventListener('pointerenter', handleEnter);
        mesh.removeEventListener('pointerleave', handleLeave);
      };
    };

    const cleanups = [
      addButtonInteractions(playButtonRef.current, 'play'),
      addButtonInteractions(pauseButtonRef.current, 'pause'),
      addButtonInteractions(nextButtonRef.current, 'next'),
      addButtonInteractions(prevButtonRef.current, 'previous'),
    ];

    return () => {
      cleanups.forEach(cleanup => cleanup && cleanup());
    };
  }, [models.music_widget]);

  // Update button visibility based on play state
  useEffect(() => {
    if (playButtonRef.current) {
      playButtonRef.current.visible = !isPlaying;
    }
    if (pauseButtonRef.current) {
      pauseButtonRef.current.visible = isPlaying;
    }
  }, [isPlaying]);

  if (!models.music_widget) {

    return null;
  }

    // const textRef = useRef<THREE.Mesh>(null)
  // const [positionTest, setPositionTest] = useState([0, 0, 0]) // x, y, z

  // useEffect(() => {
  //   const handleKey = (e: KeyboardEvent) => {
  //     setPositionTest((prev) => {
  //       const [x, y, z] = prev
  //       let newPos = [...prev]

  //       switch (e.key) {
  //         case 'q': newPos[0] += 0.05; break
  //         case 'w': newPos[0] -= 0.05; break
  //         case 'a': newPos[1] += 0.05; break
  //         case 's': newPos[1] -= 0.05; break
  //         case 'z': newPos[2] += 0.05; break
  //         case 'x': newPos[2] -= 0.05; break
  //       }

  //       console.log('Text position:', newPos)
  //       return newPos
  //     })
  //   }

  //   window.addEventListener('keydown', handleKey)
  //   return () => window.removeEventListener('keydown', handleKey)
  // }, [])

  return (
    <group 
      ref={musicWidgetRef} 
      position={position} 
      rotation={rotation}
    >
      <primitive 
        object={models.music_widget.scene} 
        scale={0.7}
        rotation={[0, Math.PI * 0.4, 0]}
      />
      
      {currentSong && (
        <group position={[0.5, 1, -0.5]}>
          <Text
            position={[-0.45, 0.1, 0.55]}
            rotation={[0, Math.PI * 0.4, 0]}
            fontSize={0.15}
            color="black"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.5}
          >
            {currentSong.title}
          </Text>
          <Text
            position={[-0.45, -0.1, 0.55]}
            rotation={[0, Math.PI * 0.4, 0]}
            fontSize={0.12}
            color="black"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.5}
          >
            {currentSong.artist}
          </Text>
        </group>
      )}
    </group>
  )
}
