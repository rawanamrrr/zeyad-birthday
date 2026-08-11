"use client"

import { useEffect, useRef } from "react"

const filmFrames = [
  { src: "/film-1.jpeg", frame: "1A", brand: "ILFORD HP5", num: "FR 01" },
  { src: "/film-2.jpeg", frame: "2A", brand: "PORTRA 160", num: "FR 02" },
  { src: "/film-3.jpeg", frame: "3A", brand: "FUJI PRO 400H", num: "FR 03" },
  { src: "/film-4.jpeg", frame: "4A", brand: "ILFORD HP5", num: "FR 04" },
  { src: "/film-5.jpeg", frame: "5A", brand: "PORTRA 160", num: "FR 05" },
  { src: "/film-6.jpeg", frame: "6A", brand: "FUJI PRO 400H", num: "FR 06" },
  { src: "/film-7.jpeg", frame: "7A", brand: "ILFORD HP5", num: "FR 07" },
  { src: "/film-8.jpeg", frame: "8A", brand: "PORTRA 160", num: "FR 08" },
  // Duplicated for seamless infinite loop
  { src: "/film-1.jpeg", frame: "1A", brand: "ILFORD HP5", num: "FR 01" },
  { src: "/film-2.jpeg", frame: "2A", brand: "PORTRA 160", num: "FR 02" },
  { src: "/film-3.jpeg", frame: "3A", brand: "FUJI PRO 400H", num: "FR 03" },
  { src: "/film-4.jpeg", frame: "4A", brand: "ILFORD HP5", num: "FR 04" },
  { src: "/film-5.jpeg", frame: "5A", brand: "PORTRA 160", num: "FR 05" },
  { src: "/film-6.jpeg", frame: "6A", brand: "FUJI PRO 400H", num: "FR 06" },
  { src: "/film-7.jpeg", frame: "7A", brand: "ILFORD HP5", num: "FR 07" },
  { src: "/film-8.jpeg", frame: "8A", brand: "PORTRA 160", num: "FR 08" },
]

// Film perforations row
function Perforations() {
  return (
    <div className="flex items-center w-full overflow-hidden" style={{ background: "#8b1026", paddingTop: 5, paddingBottom: 5 }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 18,
            height: 12,
            borderRadius: 3,
            backgroundColor: "#f2ede8",
            marginLeft: 10,
            flexShrink: 0,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  )
}

export default function FilmStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number | null>(null)
  const posRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const speed = 0.55

    const animate = () => {
      posRef.current += speed
      const halfWidth = track.scrollWidth / 2
      if (posRef.current >= halfWidth) {
        posRef.current = 0
      }
      track.style.transform = `translateX(-${posRef.current}px)`
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden" style={{ background: "#8b1026" }}>

      {/* TOP PERFORATIONS */}
      <Perforations />

      {/* MAIN FILM TRACK */}
      <div className="w-full overflow-hidden" style={{ background: "#0d0005", paddingTop: 6, paddingBottom: 6 }}>
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{ willChange: "transform", width: "max-content", gap: 3 }}
        >
          {filmFrames.map((frame, index) => (
            <div
              key={index}
              className="relative shrink-0 flex flex-col"
              style={{ width: 200, background: "#0d0005" }}
            >
              {/* Top metadata bar */}
              <div
                className="flex justify-between items-center px-2 py-1"
                style={{ borderBottom: "1px solid #2a0010" }}
              >
                <span
                  className="font-mono text-[9px] tracking-widest select-none"
                  style={{ color: "#c8400a", letterSpacing: "0.18em" }}
                >
                  ▪ ▪ ▪ ▪
                </span>
                <span
                  className="font-mono text-[9px] tracking-wider uppercase select-none font-bold"
                  style={{ color: "#d94f10" }}
                >
                  {frame.brand}
                </span>
                <span
                  className="font-mono text-[9px] tracking-widest select-none"
                  style={{ color: "#c8400a", letterSpacing: "0.18em" }}
                >
                  ▪ ▪ ▪ ▪
                </span>
              </div>

              {/* Photo frame */}
              <div
                className="relative mx-1.5 my-1"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={frame.src}
                  alt={`Film frame ${frame.frame}`}
                  className="w-full h-full object-cover block"
                  style={{
                    filter: "sepia(0.3) contrast(1.08) brightness(0.95)",
                    outline: "2px solid #1a0008",
                  }}
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent && !parent.querySelector(".film-placeholder")) {
                      const ph = document.createElement("div")
                      ph.className = "film-placeholder"
                      ph.style.cssText =
                        "width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a0008;position:absolute;top:0;left:0;"
                      ph.innerHTML = `<span style="color:#c8400a;font-size:10px;font-family:monospace;text-align:center;padding:4px;">film-${(index % 6) + 1}.jpg</span>`
                      parent.style.position = "relative"
                      parent.appendChild(ph)
                    }
                  }}
                />
              </div>

              {/* Bottom metadata bar */}
              <div
                className="flex justify-between items-center px-2 py-1"
                style={{ borderTop: "1px solid #2a0010" }}
              >
                <span
                  className="font-mono text-[9px] select-none"
                  style={{ color: "#c8400a" }}
                >
                  {frame.num}
                </span>
                <span
                  className="font-mono text-[9px] font-bold select-none"
                  style={{ color: "#d94f10" }}
                >
                  {frame.frame}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM PERFORATIONS */}
      <Perforations />

    </div>
  )
}
