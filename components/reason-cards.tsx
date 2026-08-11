"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface Reason {
  id: number
  num: string
  title: string
  text: string
  icon: string
}

const reasons: Reason[] = [
  {
    id: 1,
    num: "01",
    title: "Reason #1",
    text: "Your smile instantly brightens up my whole world ☀️",
    icon: "✨",
  },
  {
    id: 2,
    num: "02",
    title: "Reason #2",
    text: "How sweet, caring, and genuine you are every single day 🌸",
    icon: "💖",
  },
  {
    id: 3,
    num: "03",
    title: "Reason #3",
    text: "Simply because you are YOU — my favorite person forever 👑",
    icon: "🎁",
  },
]

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
    <svg width="220" height="20" viewBox="0 0 220 20" fill="none" className="mx-auto my-1">
      <line x1="0" y1="10" x2="80" y2="10" stroke="#8b1026" strokeWidth="1" opacity="0.35"/>
      <circle cx="110" cy="10" r="3" stroke="#8b1026" strokeWidth="1.2" fill="none" opacity="0.7"/>
      <line x1="140" y1="10" x2="220" y2="10" stroke="#8b1026" strokeWidth="1" opacity="0.35"/>
    </svg>
  )
}

export default function ReasonCards() {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({})

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const stars = [
    { x: 4, y: 8, size: 24, opacity: 0.45, rotate: 12 },
    { x: 86, y: 10, size: 26, opacity: 0.45, rotate: -8 },
    { x: 6, y: 88, size: 22, opacity: 0.4, rotate: 15 },
    { x: 84, y: 90, size: 24, opacity: 0.45, rotate: -12 },
  ]
  const asterisks = [
    { x: 80, y: 48, size: 14, opacity: 0.35 },
    { x: 12, y: 45, size: 14, opacity: 0.35 },
  ]

  return (
    <div
      className="w-full relative overflow-hidden flex flex-col items-center justify-center py-12 px-6"
      style={{ background: "#f2ede8" }}
    >
      {stars.map((s, i) => <FloatingStar key={i} {...s} />)}
      {asterisks.map((a, i) => <Asterisk key={i} {...a} />)}

      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center z-10">
        <p style={{
          fontFamily: "'Georgia', serif", fontSize: "0.7rem",
          color: "#8b1026", letterSpacing: "0.26em",
          textTransform: "uppercase", opacity: 0.7, marginBottom: "4px"
        }}>
          — JUST A FEW REASONS —
        </p>

        <h2 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "1.9rem", color: "#8b1026",
          fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.06em", lineHeight: 1.2,
        }}>
          Why I Love You 💕
        </h2>

        <p style={{
          fontFamily: "'Georgia', serif", fontSize: "0.95rem",
          color: "#7a4a52", fontStyle: "italic", marginTop: "4px", marginBottom: "8px"
        }}>
          Tap each card to reveal what's inside
        </p>

        <Divider />

        {/* 3 Flip Cards Stack */}
        <div className="w-full flex flex-col gap-4 my-4">
          {reasons.map((r) => {
            const isFlipped = !!flippedCards[r.id]
            return (
              <div
                key={r.id}
                className="w-full cursor-pointer"
                onClick={() => toggleCard(r.id)}
                style={{ perspective: 1000, height: 110 }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d", position: "relative" }}
                  className="w-full h-full rounded-xl"
                >
                  {/* FRONT */}
                  <div
                    className="w-full h-full p-4 flex items-center justify-between rounded-xl relative border"
                    style={{
                      background: "#f2ede8",
                      color: "#8b1026",
                      borderColor: "#8b1026",
                      boxShadow: "0 4px 14px rgba(139,16,38,0.08)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#8b1026] text-[#f2ede8] flex items-center justify-center font-mono font-bold text-xs">
                        {r.num}
                      </div>
                      <span style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontSize: "1.1rem", fontWeight: 700, color: "#8b1026"
                      }}>
                        {r.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-mono text-[#8b1026] opacity-70">
                      <span>Tap to reveal</span>
                      <span>✨</span>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="w-full h-full p-4 flex items-center justify-center text-center rounded-xl absolute inset-0"
                    style={{
                      background: "#8b1026",
                      color: "#f2ede8",
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      boxShadow: "0 4px 14px rgba(139,16,38,0.15)",
                    }}
                  >
                    <p style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "0.95rem",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                      color: "#f2ede8"
                    }}>
                      {r.text}
                    </p>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
