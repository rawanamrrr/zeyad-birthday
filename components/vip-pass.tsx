"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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

export default function VipPass() {
  const [isFlipped, setIsFlipped] = useState(false)

  const stars = [
    { x: 4, y: 10, size: 24, opacity: 0.45, rotate: 12 },
    { x: 86, y: 12, size: 26, opacity: 0.45, rotate: -8 },
    { x: 6, y: 84, size: 22, opacity: 0.4, rotate: 15 },
    { x: 84, y: 86, size: 24, opacity: 0.45, rotate: -12 },
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
          textTransform: "uppercase", opacity: 0.7, marginBottom: "6px"
        }}>
          — OFFICIAL ACCESS TICKET —
        </p>

        {/* 3D Flip Ticket Container */}
        <div
          className="w-full max-w-[310px] cursor-pointer my-2"
          onClick={() => setIsFlipped((prev) => !prev)}
          style={{ perspective: 1000 }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d", position: "relative" }}
            className="w-full rounded-2xl"
          >
            {/* FRONT SIDE */}
            <div
              className="w-full py-8 px-6 flex flex-col items-center justify-between text-center relative rounded-2xl"
              style={{
                background: "#f2ede8",
                color: "#8b1026",
                minHeight: 380,
                border: "2px stroke #8b1026",
                outline: "2px solid #8b1026",
                outlineOffset: "-8px",
                boxShadow: "0 8px 24px rgba(139,16,38,0.12)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {/* Crown Icon */}
              <div className="text-4xl my-1">👑</div>

              <div>
                <h2 style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: "1.95rem", color: "#8b1026",
                  fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", lineHeight: 1.15,
                }}>
                  VIP Birthday Pass
                </h2>
                <p style={{
                  fontFamily: "'Georgia', serif", fontSize: "0.92rem",
                  color: "#7a4a52", fontStyle: "italic", marginTop: "6px"
                }}>
                  All-Access Ticket For My Favorite Person
                </p>
              </div>

              <Divider />

              <div className="w-full py-2 px-3 rounded-lg border border-[#8b1026]/20 bg-[#8b1026]/5">
                <span className="text-[10px] font-mono tracking-widest text-[#8b1026] uppercase block opacity-75">
                  PASS HOLDER
                </span>
                <span className="text-sm font-serif font-bold text-[#8b1026]">
                  The Birthday Girl 💖
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-mono tracking-widest text-[#8b1026] opacity-60 uppercase mt-2">
                <span>( Tap ticket to flip 🔄 )</span>
              </div>
            </div>

            {/* BACK SIDE */}
            <div
              className="w-full py-8 px-6 flex flex-col items-center justify-between text-center absolute inset-0 rounded-2xl"
              style={{
                background: "#8b1026",
                color: "#f2ede8",
                minHeight: 380,
                outline: "2px solid #f2ede8",
                outlineOffset: "-8px",
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                boxShadow: "0 8px 24px rgba(139,16,38,0.18)",
              }}
            >
              <h3 style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "1.25rem", color: "#f2ede8",
                fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                VIP Privileges Included 🎟️
              </h3>

              <ul className="text-xs font-serif space-y-2.5 text-left w-full my-2 px-1" style={{ color: "#f2ede8" }}>
                <li className="flex items-center gap-2">
                  <span>💋</span> Unlimited Hugs & Kisses On Demand
                </li>
                <li className="flex items-center gap-2">
                  <span>👑</span> 100% Royal Treatment All Day Long
                </li>
                <li className="flex items-center gap-2">
                  <span>🍰</span> First Priority Slice of Cake
                </li>
                <li className="flex items-center gap-2">
                  <span>🚗</span> Special Birthday Date & Fun Activities
                </li>
                <li className="flex items-center gap-2">
                  <span>💖</span> Zero Arguments Allowed Today
                </li>
              </ul>

              <div className="w-full py-1.5 px-3 rounded-lg border border-white/20 bg-white/10 text-[11px] font-mono tracking-wider">
                VALID: FOREVER & EVER ❤️
              </div>

              <div className="flex items-center gap-1 text-[11px] font-mono tracking-widest text-[#f2ede8] opacity-70 uppercase mt-1">
                <span>( Tap to flip back 🔄 )</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
