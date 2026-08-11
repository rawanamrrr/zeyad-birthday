"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SPARKLE_COUNT = 30

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

interface Sparkle {
  id: number; angle: number; distance: number; size: number; duration: number; color: string
}

const sparkColors = ["#f2ede8", "#ffffff", "#ffd700", "#f5deb3", "#e8c4a0", "#f0e6d2"]

// ─── Decorative divider ───────────────────────────────────────────────────────
function Divider() {
  return (
    <svg width="260" height="24" viewBox="0 0 260 24" fill="none" className="mx-auto">
      <line x1="0" y1="12" x2="100" y2="12" stroke="#f2ede8" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M110 12 C115 6 120 6 125 12 C130 18 135 18 140 12 C145 6 150 6 155 12" stroke="#f2ede8" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8"/>
      <circle cx="130" cy="12" r="3" stroke="#f2ede8" strokeWidth="1.3" fill="none" opacity="0.8"/>
      <line x1="160" y1="12" x2="260" y2="12" stroke="#f2ede8" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
}

// ─── Floating animated star ───────────────────────────────────────────────────
function FloatingStar({ x, y, size, opacity, rotate, delay }: {
  x: number; y: number; size: number; opacity: number; rotate: number; delay: number
}) {
  return (
    <motion.div
      style={{ position: "absolute", left: `${x}%`, top: `${y}%` }}
      animate={{ y: [0, -8, 0], opacity: [opacity, opacity * 0.5, opacity] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
        <path d="M12 2 L13.5 9 L20 8 L15 13 L17 20 L12 16 L7 20 L9 13 L4 8 L10.5 9 Z"
          stroke="#f2ede8" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  )
}

// ─── Thin asterisk ────────────────────────────────────────────────────────────
function Asterisk({ x, y, size, opacity, delay }: {
  x: number; y: number; size: number; opacity: number; delay: number
}) {
  return (
    <motion.div
      style={{ position: "absolute", left: `${x}%`, top: `${y}%` }}
      animate={{ rotate: [0, 20, 0, -20, 0], opacity: [opacity, opacity * 0.4, opacity] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="1" x2="12" y2="23" stroke="#f2ede8" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="1" y1="12" x2="23" y2="12" stroke="#f2ede8" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="4" y1="4" x2="20" y2="20" stroke="#f2ede8" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="20" y1="4" x2="4" y2="20" stroke="#f2ede8" strokeWidth="0.9" strokeLinecap="round"/>
      </svg>
    </motion.div>
  )
}

// ─── Large illustrated candle ─────────────────────────────────────────────────
function Candle({ flickerScale, flickerRotate }: { flickerScale: number; flickerRotate: number }) {
  return (
    <svg width="160" height="220" viewBox="0 0 160 220" fill="none">
      {/* Ambient glow behind flame */}
      <ellipse cx="80" cy="52" rx="30" ry="24" fill="rgba(255,215,0,0.2)"/>
      <ellipse cx="80" cy="56" rx="20" ry="16" fill="rgba(255,235,150,0.18)"/>

      {/* Flame outer */}
      <motion.g
        style={{ transformOrigin: "80px 72px" }}
        animate={{ scaleY: flickerScale, scaleX: 2 - flickerScale, rotate: flickerRotate }}
        transition={{ duration: 0.18 }}
      >
        <path
          d="M80 12 C80 12 62 34 62 52 C62 66 70 76 80 76 C90 76 98 66 98 52 C98 34 80 12 80 12 Z"
          fill="url(#fg1)" opacity="0.95"
        />
        {/* Flame inner core */}
        <path
          d="M80 34 C80 34 72 44 72 54 C72 62 75.5 68 80 68 C84.5 68 88 62 88 54 C88 44 80 34 80 34 Z"
          fill="url(#fg2)" opacity="0.9"
        />
        {/* Brightest tip */}
        <ellipse cx="80" cy="48" rx="5" ry="8" fill="white" opacity="0.9"/>
      </motion.g>

      {/* Wick */}
      <line x1="80" y1="74" x2="80" y2="88" stroke="#f2ede8" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Candle body */}
      <rect x="48" y="88" width="64" height="104" rx="6" stroke="#f2ede8" strokeWidth="2" fill="#700d1e"/>
      {/* Body inner shade */}
      <rect x="100" y="88" width="12" height="104" rx="0" fill="rgba(242,237,232,0.08)"/>

      {/* Wax drips */}
      <path d="M48 96 Q40 110 44 126 Q47 138 48 152" stroke="#f2ede8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M112 96 Q120 112 116 130 Q112 144 112 158" stroke="#f2ede8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M66 88 Q62 96 64 106" stroke="#f2ede8" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M94 88 Q98 98 96 110" stroke="#f2ede8" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.5"/>

      {/* Bow decoration */}
      <path d="M80 148 C68 136 48 134 44 142 C40 150 54 158 80 148 Z" stroke="#f2ede8" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      <path d="M80 148 C92 136 112 134 116 142 C120 150 106 158 80 148 Z" stroke="#f2ede8" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      <circle cx="80" cy="148" r="4.5" stroke="#f2ede8" strokeWidth="1.5" fill="none"/>
      <path d="M77 152 C74 162 72 170 74 176" stroke="#f2ede8" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M83 152 C86 162 88 170 86 176" stroke="#f2ede8" strokeWidth="1.4" fill="none" strokeLinecap="round"/>

      {/* Candle plate */}
      <ellipse cx="80" cy="192" rx="44" ry="10" stroke="#f2ede8" strokeWidth="1.8" fill="#8b1026"/>
      <path d="M36 192 Q80 208 124 192" stroke="#f2ede8" strokeWidth="1.5" fill="none"/>
      {/* Stand stem */}
      <rect x="68" y="200" width="24" height="12" rx="3" stroke="#f2ede8" strokeWidth="1.6" fill="#8b1026"/>
      {/* Stand base */}
      <ellipse cx="80" cy="212" rx="28" ry="6" stroke="#f2ede8" strokeWidth="1.6" fill="#8b1026"/>

      {/* Gradient defs */}
      <defs>
        <linearGradient id="fg1" x1="80" y1="12" x2="80" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="45%" stopColor="#ffd700"/>
          <stop offset="100%" stopColor="#ff7700"/>
        </linearGradient>
        <linearGradient id="fg2" x1="80" y1="34" x2="80" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#fff9c4"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

// ─── Extinguished candle ───────────────────────────────────────────────────────
function ExtinguishedCandle() {
  return (
    <svg width="160" height="220" viewBox="0 0 160 220" fill="none">
      <line x1="80" y1="74" x2="80" y2="88" stroke="#f2ede8" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="48" y="88" width="64" height="104" rx="6" stroke="#f2ede8" strokeWidth="2" fill="#700d1e"/>
      <rect x="100" y="88" width="12" height="104" rx="0" fill="rgba(242,237,232,0.08)"/>
      <path d="M48 96 Q40 110 44 126 Q47 138 48 152" stroke="#f2ede8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M112 96 Q120 112 116 130 Q112 144 112 158" stroke="#f2ede8" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M66 88 Q62 96 64 106" stroke="#f2ede8" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M80 148 C68 136 48 134 44 142 C40 150 54 158 80 148 Z" stroke="#f2ede8" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      <path d="M80 148 C92 136 112 134 116 142 C120 150 106 158 80 148 Z" stroke="#f2ede8" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      <circle cx="80" cy="148" r="4.5" stroke="#f2ede8" strokeWidth="1.5" fill="none"/>
      <path d="M77 152 C74 162 72 170 74 176" stroke="#f2ede8" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M83 152 C86 162 88 170 86 176" stroke="#f2ede8" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <ellipse cx="80" cy="192" rx="44" ry="10" stroke="#f2ede8" strokeWidth="1.8" fill="#8b1026"/>
      <path d="M36 192 Q80 208 124 192" stroke="#f2ede8" strokeWidth="1.5" fill="none"/>
      <rect x="68" y="200" width="24" height="12" rx="3" stroke="#f2ede8" strokeWidth="1.6" fill="#8b1026"/>
      <ellipse cx="80" cy="212" rx="28" ry="6" stroke="#f2ede8" strokeWidth="1.6" fill="#8b1026"/>
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MakeAWish({ onWishMade }: { onWishMade?: () => void }) {
  const [wished, setWished] = useState(false)
  const [hasClickedContinue, setHasClickedContinue] = useState(false)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [flickerScale, setFlickerScale] = useState(1)
  const [flickerRotate, setFlickerRotate] = useState(0)

  useEffect(() => {
    if (wished) return
    const id = setInterval(() => {
      setFlickerScale(randomBetween(0.88, 1))
      setFlickerRotate(randomBetween(-4, 4))
    }, 180)
    return () => clearInterval(id)
  }, [wished])

  const handleWish = () => {
    if (wished) return
    setSparkles(
      Array.from({ length: SPARKLE_COUNT }).map((_, i) => ({
        id: i,
        angle: randomBetween(0, 360),
        distance: randomBetween(60, 180),
        size: randomBetween(4, 12),
        duration: randomBetween(0.5, 1.3),
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
      }))
    )
    setWished(true)
  }

  const stars = [
    { x: 2,  y: 4,  size: 26, opacity: 0.6,  rotate: 10,  delay: 0 },
    { x: 80, y: 2,  size: 30, opacity: 0.58, rotate: -8,  delay: 0.7 },
    { x: 88, y: 28, size: 20, opacity: 0.52, rotate: 15,  delay: 1.2 },
    { x: 1,  y: 50, size: 22, opacity: 0.55, rotate: -12, delay: 0.4 },
    { x: 90, y: 68, size: 24, opacity: 0.52, rotate: 5,   delay: 1.8 },
    { x: 5,  y: 78, size: 28, opacity: 0.58, rotate: 18,  delay: 0.9 },
    { x: 76, y: 86, size: 22, opacity: 0.55, rotate: -6,  delay: 0.3 },
    { x: 14, y: 90, size: 18, opacity: 0.48, rotate: 12,  delay: 1.5 },
  ]
  const asterisks = [
    { x: 70, y: 8,  size: 16, opacity: 0.48, delay: 0.5 },
    { x: 18, y: 16, size: 14, opacity: 0.42, delay: 1.1 },
    { x: 84, y: 52, size: 15, opacity: 0.42, delay: 0.8 },
    { x: 7,  y: 40, size: 14, opacity: 0.45, delay: 1.6 },
    { x: 58, y: 90, size: 14, opacity: 0.42, delay: 0.2 },
    { x: 28, y: 85, size: 16, opacity: 0.45, delay: 1.3 },
  ]

  return (
    <div
      className="w-full relative overflow-hidden flex flex-col items-center justify-center py-12 px-6"
      style={{ background: "#8b1026", minHeight: 560 }}
    >
      {/* Floating stars & asterisks */}
      {stars.map((s, i) => <FloatingStar key={i} {...s} />)}
      {asterisks.map((a, i) => <Asterisk key={i} {...a} />)}

      {/* Top divider */}
      <div className="w-full mb-8 relative z-10">
        <Divider />
      </div>

      <AnimatePresence mode="wait">
        {!wished ? (
          <motion.div
            key="pre"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center gap-4 relative z-10 w-full"
          >
            {/* Eyebrow label */}
            <p style={{
              fontFamily: "'Georgia', serif", fontSize: "0.7rem",
              color: "#f2ede8", letterSpacing: "0.28em",
              textTransform: "uppercase", opacity: 0.75,
            }}>
              — before you continue —
            </p>

            {/* Main heading */}
            <h2 style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "2.1rem", color: "#f2ede8",
              fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.07em", lineHeight: 1.1,
              textAlign: "center",
            }}>
              Make a Wish
            </h2>

            {/* Script body */}
            <p style={{
              fontFamily: "'Georgia', serif", fontSize: "1rem",
              color: "#f2ede8", fontStyle: "italic",
              lineHeight: 1.85, textAlign: "center", maxWidth: 260,
              opacity: 0.95,
            }}>
              Close your eyes,<br/>
              think of something beautiful,<br/>
              then tap the flame 🕯️
            </p>

            {/* Candle button */}
            <motion.button
              onClick={handleWish}
              whileTap={{ scale: 0.96 }}
              className="relative bg-transparent border-0 outline-none cursor-pointer flex flex-col items-center mt-1"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="Tap to make a wish"
            >
              {/* Pulsing ring hint */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
                  width: 52, height: 52, borderRadius: "50%",
                  border: "2px solid rgba(242,237,232,0.7)",
                  pointerEvents: "none", zIndex: 0,
                }}
              />
              <Candle flickerScale={flickerScale} flickerRotate={flickerRotate} />
            </motion.button>

            <p style={{
              fontSize: "0.68rem", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#f2ede8", opacity: 0.6,
            }}>
              tap to blow it out
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="post"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4 relative z-10 w-full"
          >
            {/* Smoke wisps rising from wick */}
            <div className="relative flex justify-center" style={{ height: 48 }}>
              {[
                { x: -10, delay: 0 }, { x: 0, delay: 0.2 }, { x: 10, delay: 0.1 }
              ].map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0.7, y: 0, x: s.x, scaleX: 1 }}
                  animate={{ opacity: 0, y: -46, x: s.x + (i % 2 === 0 ? -8 : 8), scaleX: 1.4 }}
                  transition={{ duration: 1.6, delay: s.delay, ease: "easeOut" }}
                  style={{
                    position: "absolute", bottom: 0,
                    width: 4, height: 36, borderRadius: 6,
                    background: "linear-gradient(to top, rgba(242,237,232,0.6), transparent)",
                  }}
                />
              ))}
            </div>

            <ExtinguishedCandle />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <p style={{
                fontFamily: "'Georgia', serif", fontSize: "1.05rem",
                color: "#f2ede8", fontStyle: "italic",
                lineHeight: 1.9, textAlign: "center", maxWidth: 270,
              }}>
                Don't tell me you wished<br/>
                for anything but me 😂
              </p>

              <motion.button
                type="button"
                onClick={() => {
                  setHasClickedContinue(true)
                  onWishMade?.()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                style={{
                  background: "#f2ede8",
                  color: "#8b1026",
                  border: "1.5px solid #f2ede8",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Akeed enty ya habebty ❤️
              </motion.button>

              {hasClickedContinue && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: "0.8rem",
                    color: "#f2ede8",
                    opacity: 0.85,
                    marginTop: "8px",
                    fontStyle: "italic",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Now you can continue scrolling 👇
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom divider */}
      <div className="w-full mt-8 relative z-10">
        <Divider />
      </div>

      {/* Sparkle burst */}
      <AnimatePresence>
        {wished && sparkles.map((s) => {
          const rad = (s.angle * Math.PI) / 180
          return (
            <motion.div key={s.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: Math.cos(rad) * s.distance, y: Math.sin(rad) * s.distance, scale: 0 }}
              transition={{ duration: s.duration, ease: "easeOut" }}
              style={{
                position: "absolute", top: "46%", left: "50%",
                width: s.size, height: s.size, borderRadius: "50%",
                background: s.color, pointerEvents: "none", zIndex: 20,
              }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
