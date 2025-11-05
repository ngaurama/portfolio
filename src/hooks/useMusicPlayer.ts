// hooks/useMusicPlayer.ts
import { useState, useRef, useEffect } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export const useMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const songs: Song[] = [
    {
      id: '1', 
      title: 'Music Coming Soon',
      artist: 'nitai',
      url: '#'
    },
  ];

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => playNext();
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Load first song by default - use functional update to avoid dependency issues
    if (songs.length > 0) {
      setCurrentSong(songs[0]);
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []); // Empty dependency array since songs is stable

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong]);

  const play = () => {
    if (audioRef.current && currentSong) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playNext = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === -1 ? 0 : (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    isPlaying,
    currentTime,
    duration,
    currentSong,
    songs,
    progress,
    play,
    pause,
    playNext,
    playPrevious,
    seek
  };
};
// // hooks/useMusicPlayer.ts
// import { useState, useRef, useEffect } from 'react';

// export interface Song {
//   id: string;
//   title: string;
//   artist: string;
//   url: string;
// }

// export const useMusicPlayer = () => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [currentSong, setCurrentSong] = useState<Song | null>(null);

//   const songs: Song[] = [
//     // {
//     //   id: '1',
//     //   title: 'Sanctuary OS - 01',
//     //   artist: 'Dusqk',
//     //   url: '/music/Dusqk - Sanctuary OS - 01 Sanctuary OS.mp3'
//     // },
//     {
//       id: '1', 
//       title: 'Sanctuary OS - 02',
//       artist: 'Dusqk',
//       url: '/music/Dusqk - Sanctuary OS - 02 Sanctuary 1.mp3'
//     },
//     // Add more songs here
//   ];

//   useEffect(() => {
//     audioRef.current = new Audio();
    
//     const audio = audioRef.current;
    
//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => setDuration(audio.duration);
//     const handleEnded = () => playNext();
    
//     audio.addEventListener('timeupdate', updateTime);
//     audio.addEventListener('loadedmetadata', updateDuration);
//     audio.addEventListener('ended', handleEnded);

//     // Load first song by default
//     if (songs.length > 0 && !currentSong) {
//       setCurrentSong(songs[0]);
//     }

//     return () => {
//       audio.removeEventListener('timeupdate', updateTime);
//       audio.removeEventListener('loadedmetadata', updateDuration);
//       audio.removeEventListener('ended', handleEnded);
//       audio.pause();
//     };
//   }, []);

//   useEffect(() => {
//     if (audioRef.current && currentSong) {
//       audioRef.current.src = currentSong.url;
//       if (isPlaying) {
//         audioRef.current.play();
//       }
//     }
//   }, [currentSong]);

//   const play = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   const pause = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };
  

//   const playNext = () => {
//     if (!currentSong) return;
    
//     const currentIndex = songs.findIndex(song => song.id === currentSong.id);
//     const nextIndex = (currentIndex + 1) % songs.length;
//     setCurrentSong(songs[nextIndex]);
//   };

//   const playPrevious = () => {
//     if (!currentSong) return;
    
//     const currentIndex = songs.findIndex(song => song.id === currentSong.id);
//     const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
//     setCurrentSong(songs[prevIndex]);
//   };

//   const seek = (time: number) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = time;
//       setCurrentTime(time);
//     }
//   };

//   const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

//   return {
//     isPlaying,
//     currentTime,
//     duration,
//     currentSong,
//     songs,
//     progress,
//     play,
//     pause,
//     playNext,
//     playPrevious,
//     seek
//   };
// };
