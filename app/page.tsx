"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"

const VideoIntro = dynamic(() => import("@/components/video-intro"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#f2ede8]" />,
})

// Eagerly import so it's ready before the video finishes
const BirthdayInvitationPage = dynamic(
  () => import("@/components/birthday-invitation-page"),
  { 
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#f2ede8]" />
  }
)

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Eagerly trigger the dynamic import for BirthdayInvitationPage
    // so it's fully loaded before the video ends
    import("@/components/birthday-invitation-page")
  }, [])

  const handleIntroFinish = useCallback(() => {
    setIntroFinished(true)
  }, [])

  if (!mounted) {
    return <main className="min-h-screen bg-[#f2ede8]" />
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* BirthdayInvitationPage always mounted and pre-rendered behind video */}
      <div className={`w-full transition-opacity duration-300 ${introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <BirthdayInvitationPage />
      </div>

      {/* Video overlay — sits on top until finished */}
      {!introFinished && (
        <div className="fixed inset-0 z-[9999] bg-[#f2ede8]">
          <VideoIntro 
            onComplete={handleIntroFinish} 
            onSkip={handleIntroFinish} 
          />
        </div>
      )}
    </main>
  )
}