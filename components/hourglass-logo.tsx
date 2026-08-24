"use client"

import { useEffect, useState } from "react"

export function HourglassLogo({ className = "" }: { className?: string }) {
  const [isRotating, setIsRotating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true)
      setTimeout(() => setIsRotating(false), 3000)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div className={`w-12 h-12 ${isRotating ? "animate-hourglass" : ""}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="hourglassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.65 0.15 280)" />
              <stop offset="50%" stopColor="oklch(0.70 0.12 320)" />
              <stop offset="100%" stopColor="oklch(0.75 0.08 180)" />
            </linearGradient>
          </defs>

          {/* Dış çerçeve */}
          <path
            d="M 30 10 L 70 10 L 70 15 L 55 40 L 55 60 L 70 85 L 70 90 L 30 90 L 30 85 L 45 60 L 45 40 L 30 15 Z"
            fill="none"
            stroke="url(#hourglassGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Üst kum */}
          <path d="M 35 15 L 65 15 L 50 35 Z" fill="url(#hourglassGradient)" opacity="0.6" />

          {/* Alt kum */}
          <path d="M 35 85 L 65 85 L 50 65 Z" fill="url(#hourglassGradient)" opacity="0.8" />

          {/* Akan kum parçacıkları */}
          <circle cx="50" cy="50" r="2" fill="oklch(0.70 0.12 320)" opacity="0.8">
            <animate attributeName="cy" from="40" to="60" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  )
}
