"use client"

import { motion, useScroll, useTransform } from "framer-motion"

// Hand-drawn open star SVG
function OpenStar({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2 L14.5 9 L22 9 L16 13.5 L18.5 21 L12 16.5 L5.5 21 L8 13.5 L2 9 L9.5 9 Z"
        stroke="#4a4a4a" strokeWidth="1.3" strokeLinejoin="round" fill="none"
      />
    </svg>
  )
}

// Hand-drawn 4-point sparkle star SVG
function SparkleStar({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2 C12 7 17 12 22 12 C17 12 12 17 12 22 C12 17 7 12 2 12 C7 12 12 7 12 2 Z"
        stroke="#4a4a4a" strokeWidth="1.2" fill="none" strokeLinejoin="round"
      />
    </svg>
  )
}

// Thin asterisk SVG
function Asterisk({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <line x1="12" y1="1" x2="12" y2="23" stroke="#4a4a4a" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="1" y1="12" x2="23" y2="12" stroke="#4a4a4a" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="4" y1="4" x2="20" y2="20" stroke="#4a4a4a" strokeWidth="1" strokeLinecap="round"/>
      <line x1="20" y1="4" x2="4" y2="20" stroke="#4a4a4a" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

// Sketched hatched star SVG (bottom left)
function SketchedHatchedStar() {
  return (
    <svg width="48" height="48" viewBox="0 0 50 50" fill="none">
      <path
        d="M25 4 L30 18 L45 18 L33 27 L37 42 L25 33 L13 42 L17 27 L5 18 L20 18 Z"
        stroke="#8b1026" strokeWidth="1.8" fill="none" strokeLinejoin="round"
      />
      {/* Internal hatching lines */}
      <line x1="20" y1="18" x2="30" y2="28" stroke="#8b1026" strokeWidth="1.2" opacity="0.7"/>
      <line x1="17" y1="27" x2="25" y2="33" stroke="#8b1026" strokeWidth="1.2" opacity="0.7"/>
      <line x1="25" y1="12" x2="33" y2="27" stroke="#8b1026" strokeWidth="1.2" opacity="0.7"/>
      <line x1="13" y1="42" x2="25" y2="33" stroke="#8b1026" strokeWidth="1.2" opacity="0.7"/>
    </svg>
  )
}

// Hand-drawn sketch heart for divider
function SketchedHeart() {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
      <path
        d="M12 20 C12 20 2 13 2 7 C2 4 4.5 1.5 7.5 1.5 C9.5 1.5 11 2.5 12 4 C13 2.5 14.5 1.5 16.5 1.5 C19.5 1.5 22 4 22 7 C22 13 12 20 12 20 Z"
        stroke="#8b1026" strokeWidth="1.6" fill="#8b1026" fillOpacity="0.85"
      />
      {/* Hatching overlay */}
      <line x1="5" y1="6" x2="19" y2="15" stroke="#f6f3ed" strokeWidth="1" opacity="0.5"/>
      <line x1="8" y1="4" x2="16" y2="16" stroke="#f6f3ed" strokeWidth="1" opacity="0.5"/>
    </svg>
  )
}

// Party popper icon SVG
function PartyPopper() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" className="inline-block align-middle ml-1">
      {/* Cone */}
      <path d="M8 28 L14 14 L22 22 Z" stroke="#8b1026" strokeWidth="1.8" fill="#8b1026" strokeLinejoin="round"/>
      {/* Ribbons & Confetti */}
      <path d="M18 12 Q22 6 26 8" stroke="#8b1026" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M22 16 Q28 12 32 16" stroke="#8b1026" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M14 8 Q18 2 24 4" stroke="#8b1026" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <circle cx="28" cy="6" r="1.5" fill="#8b1026"/>
      <circle cx="32" cy="11" r="1.5" fill="#8b1026"/>
      <circle cx="23" cy="4" r="1.5" fill="#8b1026"/>
      <rect x="25" y="18" width="3" height="3" fill="#8b1026" transform="rotate(20 25 18)"/>
    </svg>
  )
}

// Corner Bow Frame SVG
function CornerBowFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-[355px] sm:max-w-[385px] mx-auto my-3 p-9 sm:p-10 text-center">
      {/* Organic Curved Hand-Drawn Frame Border */}
      <svg
        viewBox="0 0 310 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Hand-drawn organic curved path bowing outward */}
        <path
          d="M 18 10 
             Q 155 3 292 10 
             Q 302 100 292 190 
             Q 155 197 18 190 
             Q 8 100 18 10 Z"
          stroke="#8b1026" strokeWidth="1.6" strokeLinecap="round" fill="none"
        />

        {/* Top-Left Bow */}
        <g transform="translate(18, 10)">
          <path d="M0 0 C-6 -8 -14 -6 -12 2 C-10 10 -2 6 0 0 Z" stroke="#8b1026" strokeWidth="1.4" fill="none"/>
          <path d="M0 0 C8 -6 14 -4 12 4 C10 10 2 6 0 0 Z" stroke="#8b1026" strokeWidth="1.4" fill="none"/>
          <circle cx="0" cy="0" r="2.5" fill="#8b1026"/>
          <path d="M0 0 C-4 8 -6 14 -4 18" stroke="#8b1026" strokeWidth="1.2" fill="none"/>
          <path d="M0 0 C4 8 6 14 4 18" stroke="#8b1026" strokeWidth="1.2" fill="none"/>
        </g>

        {/* Top-Right Bow */}
        <g transform="translate(292, 10)">
          <path d="M0 0 C-8 -6 -14 -4 -12 4 C-10 10 -2 6 0 0 Z" stroke="#8b1026" strokeWidth="1.4" fill="none"/>
          <path d="M0 0 C6 -8 14 -6 12 2 C10 10 2 6 0 0 Z" stroke="#8b1026" strokeWidth="1.4" fill="none"/>
          <circle cx="0" cy="0" r="2.5" fill="#8b1026"/>
          <path d="M0 0 C-4 8 -6 14 -4 18" stroke="#8b1026" strokeWidth="1.2" fill="none"/>
          <path d="M0 0 C4 8 6 14 4 18" stroke="#8b1026" strokeWidth="1.2" fill="none"/>
        </g>

        {/* Bottom-Left Bow */}
        <g transform="translate(18, 190)">
          <path d="M0 0 C-6 -8 -14 -6 -12 2 C-10 10 -2 6 0 0 Z" stroke="#8b1026" strokeWidth="1.4" fill="none"/>
          <path d="M0 0 C8 -6 14 -4 12 4 C10 10 2 6 0 0 Z" stroke="#8b1026" strokeWidth="1.4" fill="none"/>
          <circle cx="0" cy="0" r="2.5" fill="#8b1026"/>
          <path d="M0 0 C-4 -8 -6 -14 -4 -18" stroke="#8b1026" strokeWidth="1.2" fill="none"/>
          <path d="M0 0 C4 -8 6 -14 4 -18" stroke="#8b1026" strokeWidth="1.2" fill="none"/>
        </g>

        {/* Bottom-Right Bow */}
        <g transform="translate(292, 190)">
          <path d="M0 0 C-8 -6 -14 -4 -12 4 C-10 10 -2 6 0 0 Z" stroke="#8b1026" strokeWidth="1.4" fill="none"/>
          <path d="M0 0 C6 -8 14 -6 12 2 C10 10 2 6 0 0 Z" stroke="#8b1026" strokeWidth="1.4" fill="none"/>
          <circle cx="0" cy="0" r="2.5" fill="#8b1026"/>
          <path d="M0 0 C-4 -8 -6 -14 -4 -18" stroke="#8b1026" strokeWidth="1.2" fill="none"/>
          <path d="M0 0 C4 -8 6 -14 4 -18" stroke="#8b1026" strokeWidth="1.2" fill="none"/>
        </g>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function WelcomeNote() {
  const { scrollY } = useScroll()
  // Parallax Y offset for disco balls as page scrolls
  const leftBallY = useTransform(scrollY, [0, 800], [0, -110])
  const rightBallY = useTransform(scrollY, [0, 800], [0, -170])

  const scrollToMission = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })
  }

  return (
    <div
      className="w-full min-h-[100dvh] relative overflow-hidden flex flex-col items-center justify-between pt-10 pb-0 px-4"
      style={{
        backgroundColor: "#f6f3ed",
        backgroundImage: `radial-gradient(#8b1026 0.5px, transparent 0.5px)`,
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0",
        // Faint subtle grid overlay
        boxShadow: "inset 0 0 100px rgba(139,16,38,0.03)",
      }}
    >
      {/* TOP LEFT DISCO BALL WITH PARALLAX */}
      <motion.div
        style={{ y: leftBallY }}
        className="absolute -top-6 -left-16 sm:-top-8 sm:-left-24 z-20 pointer-events-none"
      >
        <img
          src="/disco-ball.png"
          alt="Disco Ball"
          className="w-48 sm:w-64 h-auto block"
          style={{ mixBlendMode: "multiply", transform: "rotate(15deg)" }}
        />
      </motion.div>

      {/* TOP RIGHT DISCO BALL WITH PARALLAX */}
      <motion.div
        style={{ y: rightBallY }}
        className="absolute top-24 -right-16 sm:top-32 sm:-right-24 z-20 pointer-events-none"
      >
        <img
          src="/disco-ball.png"
          alt="Disco Ball Right"
          className="w-36 sm:w-48 h-auto block"
          style={{ mixBlendMode: "multiply", transform: "rotate(20deg)" }}
        />
      </motion.div>

      {/* SCATTERED STARS & SPARKLES */}
      <OpenStar size={24} className="absolute top-10 right-20 opacity-80" />
      <OpenStar size={26} className="absolute top-20 right-8 opacity-75" />
      <Asterisk size={16} className="absolute top-12 left-36 opacity-70" />
      <Asterisk size={18} className="absolute top-14 right-44 opacity-70" />
      <SparkleStar size={18} className="absolute top-28 left-6 opacity-80" />
      <OpenStar size={22} className="absolute top-44 left-5 opacity-80" />
      <OpenStar size={20} className="absolute top-40 right-6 opacity-75" />
      <SparkleStar size={16} className="absolute top-52 right-12 opacity-80" />

      {/* MAIN CONTAINER CONTENT */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center z-10 mt-28 sm:mt-36 pt-4">

        {/* STATUS: ACCEPTED ♥ BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -10, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-[#8b1026] bg-[#f6f3ed] text-[#8b1026]"
          style={{ boxShadow: "0 2px 8px rgba(139,16,38,0.08)" }}
        >
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase font-bold">
            STATUS: ACCEPTED ♥
          </span>
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 mb-2"
        >
          <h1
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "2.5rem",
              color: "#8b1026",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
            }}
          >
            YAY! YOU SAID
          </h1>
          <div className="flex items-center justify-center gap-1">
            <h1
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "2.5rem",
                color: "#8b1026",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                lineHeight: 1.1,
              }}
            >
              YES!
            </h1>
            <PartyPopper />
          </div>
        </motion.div>

        {/* DIVIDER WITH SKETCHED HEART */}
        <div className="flex items-center justify-center gap-3 my-2 opacity-90">
          <div className="w-8 h-[1.2px] bg-[#8b1026]" />
          <SketchedHeart />
          <div className="w-8 h-[1.2px] bg-[#8b1026]" />
        </div>

        {/* CORNER BOW FRAME WITH SCRIPT NOTE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full relative mt-4"
        >
          <CornerBowFrame>
            <p
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.3rem",
                color: "#8b1026",
                fontStyle: "italic",
                lineHeight: 1.88,
              }}
            >
              Now that it's official,<br />
              get ready for the sweetest<br />
              birthday celebration<br />
              planned just for you ♥
            </p>
          </CornerBowFrame>

          {/* DISCO CHERRIES ON BOTTOM RIGHT OF FRAME */}
          <div className="absolute -bottom-4 -right-2 z-20 pointer-events-none">
            <img
              src="/disco-cherries.png"
              alt="Disco Cherries"
              className="w-24 sm:w-28 h-auto block"
              style={{ mixBlendMode: "multiply", transform: "rotate(15deg)" }}
            />
          </div>

          {/* SKETCHED HATCHED STAR ON BOTTOM LEFT */}
          <div className="absolute -bottom-6 -left-2 z-20 pointer-events-none">
            <SketchedHatchedStar />
          </div>
        </motion.div>

        {/* BOTTOM SCATTERED STARS */}
        <div className="relative w-full h-8 my-1">
          <OpenStar size={22} className="absolute left-4 top-0 opacity-80" />
          <Asterisk size={16} className="absolute right-12 top-1 opacity-70" />
          <SparkleStar size={16} className="absolute right-4 top-4 opacity-80" />
        </div>

        {/* BEGIN THE JOURNEY BUTTON */}
        <motion.button
          onClick={scrollToMission}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-10 mb-14 px-9 py-4 rounded-full font-bold text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 z-30"
          style={{
            background: "#8b1026",
            color: "#f6f3ed",
            border: "1.5px solid #8b1026",
            fontFamily: "'Georgia', serif",
            letterSpacing: "0.06em",
          }}
        >
          <span>BEGIN THE JOURNEY ↓</span>
        </motion.button>
      </div>
    </div>
  )
}
