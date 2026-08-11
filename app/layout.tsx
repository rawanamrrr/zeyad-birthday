import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { RomanticAudio } from "@/components/romantic-audio"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { Footer } from "@/components/footer"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://birthday-invitation.com"),
  title: "Babe's Birthday Invitation 🎂",
  description: "Join us in celebrating Babe's Birthday!",
  generator: "Digitiva",
  openGraph: {
    type: "website",
    title: "Babe's Birthday Invitation 🎂",
    description: "Join us in celebrating Babe's Birthday!",
    images: [
      {
        url: "/invitation.jpg",
        alt: "Babe's Birthday Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Babe's Birthday Invitation 🎂",
    description: "Join us in celebrating Babe's Birthday!",
    images: ["/invitation.jpg"],
  },
  icons: {
    icon: "/invitation.jpg",
    apple: "/invitation.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Open Graph tags for Facebook & WhatsApp previews */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Babe's Birthday Invitation 🎂" />
        <meta property="og:description" content="Join us in celebrating Babe's Birthday!" />
        <meta
          property="og:image"
          content="/invitation.jpg"
        />
        <meta property="og:image:alt" content="Babe's Birthday Invitation" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Babe's Birthday Invitation 🎂" />
        <meta name="twitter:description" content="Join us in celebrating Babe's Birthday!" />
        <meta name="twitter:image" content="/invitation.jpg" />

        {/* Preload All Invitation & Asset Images for Zero Lag */}
        <link rel="preload" href="/invitation.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/no.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/mission.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/plan.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/dress.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/message.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/disco-ball.png" as="image" type="image/png" />
        <link rel="preload" href="/disco-cherries.png" as="image" type="image/png" />
        <link rel="preload" href="/film-1.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/film-2.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/film-3.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/film-4.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/film-5.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/film-6.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/film-7.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/film-8.jpeg" as="image" type="image/jpeg" />

        {/* Preload video for intro */}
        <link
          rel="preload"
          href="/engagement-video.mp4"
          as="video"
          type="video/mp4"
        />
        {/* Preload Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          as="style"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <Suspense fallback={null}>
            {children}
            <RomanticAudio />
          </Suspense>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  )
}