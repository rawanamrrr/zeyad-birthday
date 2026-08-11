"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FilmStrip from "@/components/film-strip"
import MakeAWish from "@/components/make-a-wish"
import BirthdayCountdown from "@/components/birthday-countdown"
import WelcomeNote from "@/components/welcome-note"
import ReasonCards from "@/components/reason-cards"

const invitationMain = { src: "/invitation.jpg", alt: "Birthday Invitation" }
const noImage = { src: "/no.jpg", alt: "Are you sure?" }

const missionImage = [{ src: "/mission.jpg", alt: "The Mission" }]

const planImage = [{ src: "/plan.jpg", alt: "The Plan" }]
const dressImage = [{ src: "/dress.jpg", alt: "Dress Code" }]

const afterFilmImages = [
  { src: "/message.jpg", alt: "Special Message" },
]

export default function BirthdayInvitationPage() {
  const [mounted, setMounted] = useState(false)
  const [hasAccepted, setHasAccepted] = useState(false)
  const [showNoPage, setShowNoPage] = useState(false)
  const [noCount, setNoCount] = useState(0)
  const [hasMadeWish, setHasMadeWish] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Pre-cache ALL website images immediately in background
    if (typeof window !== "undefined") {
      const allImages = [
        invitationMain.src,
        noImage.src,
        ...missionImage.map((img) => img.src),
        ...planImage.map((img) => img.src),
        ...dressImage.map((img) => img.src),
        ...afterFilmImages.map((img) => img.src),
        "/disco-ball.png",
        "/disco-cherries.png",
        "/film-1.jpeg",
        "/film-2.jpeg",
        "/film-3.jpeg",
        "/film-4.jpeg",
        "/film-5.jpeg",
        "/film-6.jpeg",
        "/film-7.jpeg",
        "/film-8.jpeg",
      ]
      allImages.forEach((src) => {
        const image = new Image()
        image.src = src
      })
    }
  }, [])

  const handleYes = () => {
    setHasAccepted(true)
    setShowNoPage(false)
  }

  const handleNoClick = () => {
    setShowNoPage(true)
  }

  const handleStillNo = () => {
    setNoCount((prev) => prev + 1)
  }

  if (!mounted) {
    return (
      <div className="w-full h-[100dvh] bg-background flex items-center justify-center m-0 p-0">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  // Calculate dynamic scale & font size for the Accept button on No screen
  const acceptScale = 1 + noCount * 0.35
  const acceptFontSize = Math.min(1.1 + noCount * 0.2, 2.4)

  const noLabels = ["Still No", "Wrong Answer", "Choose Wisely", "Think Again", "Final Warning"]
  const noButtonLabel = noLabels[Math.min(noCount, noLabels.length - 1)]

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden p-0 m-0 border-0">
      {/* NO SCREEN VIEW (FULL ZERO-GAP SCREEN) */}
      <AnimatePresence>
        {showNoPage && !hasAccepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] bg-[#f2ede8] p-0 m-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-0 m-0 border-0">
              <img
                src={noImage.src}
                alt={noImage.alt}
                className="w-full h-full block object-cover object-center m-0 p-0 border-0 outline-none"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = "none"
                  if (target.parentElement) {
                    const fallback = target.parentElement.querySelector(".no-fallback")
                    if (fallback) fallback.classList.remove("hidden")
                  }
                }}
              />

              <div className="no-fallback hidden h-full w-full py-24 px-6 flex flex-col items-center justify-center gap-4 bg-[#f2ede8] text-[#8b1026]">
                <h2 className="text-2xl font-bold font-serif">Are you sure?</h2>
                <p className="text-sm opacity-80">You can't say no to this invitation!</p>
              </div>

              {/* BUTTONS DIRECTLY ON NO.JPG IMAGE */}
              <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-20 px-6 flex flex-col items-center justify-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-xs sm:max-w-sm">
                  {/* GROWING ACCEPT BUTTON */}
                  <motion.button
                    type="button"
                    onClick={handleYes}
                    animate={{ scale: acceptScale }}
                    transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
                    style={{ fontSize: `${acceptFontSize}rem` }}
                    className="bg-[#8b1026] hover:bg-[#700d1e] text-white font-bold px-8 py-3.5 rounded-full active:scale-95 cursor-pointer z-30 border border-white/10"
                  >
                    Accept
                  </motion.button>

                  {/* STILL NO BUTTON */}
                  {noCount < noLabels.length - 1 && (
                    <button
                      type="button"
                      onClick={handleStillNo}
                      className="bg-[#2b2826]/15 hover:bg-[#2b2826]/25 text-[#2b2826] font-semibold px-6 py-3 rounded-full border border-[#2b2826]/20 hover:border-[#2b2826]/40 transition-all duration-200 text-sm opacity-90 active:scale-95 cursor-pointer z-20"
                    >
                      {noButtonLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex flex-col items-center justify-start p-0 m-0 gap-0 border-0">
        {/* MAIN INVITATION VIEW (ONLY SHOWN BEFORE ACCEPTING) */}
        {!hasAccepted && (
          <div className="w-full h-[100dvh] relative overflow-hidden bg-card p-0 m-0 border-0">
            <img
              src={invitationMain.src}
              alt={invitationMain.alt}
              className="w-full h-full block object-cover object-center m-0 p-0 border-0 outline-none"
              loading="eager"
              // @ts-ignore
              fetchPriority="high"
            />

            {/* YES & NO BUTTONS DIRECTLY OVERLAID ON INVITATION.JPG */}
            <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-20 px-6 sm:px-8 flex flex-col items-center gap-3 text-center">
              <div className="flex items-center justify-center gap-3.5 w-full max-w-[260px] sm:max-w-[290px]">
                <button
                  type="button"
                  onClick={handleYes}
                  className="flex-1 bg-[#8b1026] hover:bg-[#700d1e] text-white font-semibold py-2.5 px-5 rounded-full active:scale-95 transition-all duration-200 cursor-pointer text-sm sm:text-base border border-white/20"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={handleNoClick}
                  className="flex-1 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-medium py-2.5 px-5 rounded-full border border-white/30 hover:border-white/50 active:scale-95 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REST OF THE PAGES (Only shown after user selects YES or ACCEPT) */}
        <AnimatePresence>
          {hasAccepted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center p-0 m-0 gap-0 border-0"
            >
              {/* WELCOME NOTE SECTION (Right before mission.jpg) */}
              <WelcomeNote />

              {/* mission.jpg */}
              {missionImage.map((item) => (
                <div
                  key={item.src}
                  className="w-full relative overflow-hidden bg-card p-0 m-0 border-0"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto block object-cover object-center m-0 p-0 border-0 outline-none"
                    loading="eager"
                  />
                </div>
              ))}

              {/* MAKE A WISH SECTION */}
              <MakeAWish onWishMade={() => setHasMadeWish(true)} />

              {/* REST OF CONTENT - Only revealed after making a wish */}
              <AnimatePresence>
                {hasMadeWish && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex flex-col items-center p-0 m-0 gap-0 border-0"
                  >
                    {/* plan.jpg */}
                    {planImage.map((item) => (
                      <div
                        key={item.src}
                        className="w-full relative overflow-hidden bg-card p-0 m-0 border-0"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto block object-cover object-center m-0 p-0 border-0 outline-none"
                          loading="eager"
                        />
                      </div>
                    ))}

                    {/* BIRTHDAY COUNTDOWN SECTION */}
                    <BirthdayCountdown />

                    {/* dress.jpg */}
                    {dressImage.map((item) => (
                      <div
                        key={item.src}
                        className="w-full relative overflow-hidden bg-card p-0 m-0 border-0"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto block object-cover object-center m-0 p-0 border-0 outline-none"
                          loading="eager"
                        />
                      </div>
                    ))}

                    {/* FILM STRIP SECTION */}
                    <FilmStrip />

                    {/* After film strip: message */}
                    {afterFilmImages.map((item) => (
                      <div
                        key={item.src}
                        className="w-full relative overflow-hidden bg-card p-0 m-0 border-0"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto block object-cover object-center m-0 p-0 border-0 outline-none"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
