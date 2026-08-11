"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Target Date: August 12 at 6:00 PM Egypt Time (UTC+3)
function getTargetDate() {
  const currentYear = new Date().getFullYear()
  // ISO format with +03:00 Egypt Time offset
  const target = new Date(`${currentYear}-08-12T18:00:00+03:00`)
  // If date already passed for this year, target next year
  if (target.getTime() < new Date().getTime()) {
    return new Date(`${currentYear + 1}-08-12T18:00:00+03:00`)
  }
  return target
}

function FloatingStar({ x, y, size, opacity, rotate }: { x: number; y: number; size: number; opacity: number; rotate: number }) {
  return (
    <svg
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, opacity, transform: `rotate(${rotate}deg)` }}
      width={size} height={size} viewBox="0 0 24 24" fill="none"
    >
      <path
        d="M12 2 L13.5 9 L20 8 L15 13 L17 20 L12 16 L7 20 L9 13 L4 8 L10.5 9 Z"
        stroke="#8b1026" strokeWidth="1.3" fill="none" strokeLinejoin="round"
      />
    </svg>
  )
}

function Asterisk({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) {
  return (
    <svg
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, opacity }}
      width={size} height={size} viewBox="0 0 24 24" fill="none"
    >
      <line x1="12" y1="1" x2="12" y2="23" stroke="#3d1017" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="1" y1="12" x2="23" y2="12" stroke="#3d1017" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="4" y1="4" x2="20" y2="20" stroke="#3d1017" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="20" y1="4" x2="4" y2="20" stroke="#3d1017" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  )
}

function Divider() {
  return (
    <svg width="240" height="20" viewBox="0 0 240 20" fill="none" className="mx-auto">
      <line x1="0" y1="10" x2="90" y2="10" stroke="#8b1026" strokeWidth="1" opacity="0.35"/>
      <circle cx="120" cy="10" r="3" stroke="#8b1026" strokeWidth="1.2" fill="none" opacity="0.7"/>
      <line x1="150" y1="10" x2="240" y2="10" stroke="#8b1026" strokeWidth="1" opacity="0.35"/>
    </svg>
  )
}

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = getTargetDate()

    const updateTimer = () => {
      const now = new Date().getTime()
      const diff = target.getTime() - now

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ]

  const stars = [
    { x: 5, y: 10, size: 24, opacity: 0.45, rotate: 12 },
    { x: 88, y: 14, size: 26, opacity: 0.45, rotate: -8 },
    { x: 8, y: 78, size: 22, opacity: 0.4, rotate: 18 },
    { x: 85, y: 80, size: 24, opacity: 0.45, rotate: -15 },
  ]
  const asterisks = [
    { x: 82, y: 48, size: 14, opacity: 0.35 },
    { x: 12, y: 45, size: 14, opacity: 0.35 },
  ]

  return (
    <div
      className="w-full relative overflow-hidden flex flex-col items-center justify-center py-14 px-6"
      style={{ background: "#f2ede8" }}
    >
      {stars.map((s, i) => <FloatingStar key={i} {...s} />)}
      {asterisks.map((a, i) => <Asterisk key={i} {...a} />)}

      <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-5 text-center z-10">
        <p style={{
          fontFamily: "'Georgia', serif", fontSize: "0.72rem",
          color: "#8b1026", letterSpacing: "0.26em",
          textTransform: "uppercase", opacity: 0.7,
        }}>
          — counting down the moments —
        </p>

        <h2 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "1.75rem", color: "#8b1026",
          fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.05em", lineHeight: 1.25,
        }}>
          Until I Get To Annoy You All Day Long 🤪
        </h2>

        <p style={{
          fontFamily: "'Georgia', serif", fontSize: "1rem",
          color: "#7a4a52", fontStyle: "italic", lineHeight: 1.6,
          maxWidth: 270,
        }}>
          Every second brings us closer to celebrating you!
        </p>

        <Divider />

        {/* Countdown Boxes */}
        <div className="grid grid-cols-4 gap-2.5 w-full my-2">
          {timeUnits.map((unit) => (
            <motion.div
              key={unit.label}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center justify-center py-3 px-1 rounded-xl"
              style={{
                background: "#8b1026",
                color: "#f2ede8",
                boxShadow: "0 4px 12px rgba(139,16,38,0.18)",
                border: "1.5px solid rgba(139,16,38,0.4)",
              }}
            >
              <span style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "1.65rem", fontWeight: 700, lineHeight: 1.1,
              }}>
                {String(unit.value).padStart(2, "0")}
              </span>
              <span style={{
                fontFamily: "'Georgia', serif", fontSize: "0.58rem",
                letterSpacing: "0.15em", opacity: 0.85, marginTop: 4,
              }}>
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        <Divider />
      </div>
    </div>
  )
}
