// components/UI/VideoModal.tsx
import React, { useEffect, useRef } from 'react';

interface VideoModalProps {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ 
  videoUrl, 
  isOpen, 
  onClose,
  title = "Video"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-75 backdrop-blur-sm p-4">
      <div 
        ref={modalRef}
        className="relative bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700"
          >
            ×
          </button>
        </div>

        <div className="relative w-full" style={{ paddingBottom: '120%' }}> {/* 16:9 aspect ratio 56.25% */} 
          <video
            ref={videoRef}
            controls
            autoPlay
            className="absolute inset-0 w-full h-full rounded-b-lg"
            onEnded={onClose}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="p-3 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            Press ESC or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
};
