import "./globals.css"
import { Inter } from "next/font/google"
import { GameProvider } from "@/contexts/GameContext"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "QuizMaster - Gamified Learning",
  description: "An engaging, gamified quiz application to challenge your mind",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  )
}

