"use client"

import { useEffect, useRef } from "react"

interface VideoIntroProps {
  onComplete: () => void
  onSkip: () => void
}

export default function VideoIntro({ onComplete, onSkip }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Preload invitation.jpg in the background while video plays
    const img = new window.Image();
    img.src = "/invitation.jpg";

    // Simple autoplay attempt - let the browser handle it
    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay blocked - browser will handle it
      });
    };

    // Try when video can play
    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      style={{ background: '#f2ede8', width: '100%', height: '100dvh' }}
      onClick={onSkip}
    >
      <div className="w-full h-full flex items-center justify-center" style={{ background: 'transparent' }}>
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline={true}
          muted={true}
          autoPlay={true}
          onEnded={onComplete}
          preload="auto"
          disablePictureInPicture
          loop={false}
          style={{ background: 'transparent', display: 'block' }}
        >
        <source src="/engagement-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
