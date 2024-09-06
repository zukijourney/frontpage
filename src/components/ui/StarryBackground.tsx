'use client'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface Star {
  x: number;
  y: number;
  size: number;
}

export function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    const newStars: Star[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }))
    setStars(newStars)
  }, [])

  if (theme === 'light') {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-twinkle {
          animation: twinkle 3s infinite;
        }
      `}</style>
    </div>
  )
}