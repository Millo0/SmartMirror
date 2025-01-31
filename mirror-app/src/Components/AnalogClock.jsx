import React, { useEffect, useState } from 'react'

export function AnalogClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hourDegrees = (hours % 12 + minutes / 60) * 30
  const minuteDegrees = (minutes + seconds / 60) * 6
  const secondDegrees = seconds * 6

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Clock face */}
        <circle cx="50" cy="50" r="48" fill="url(#grad)" />
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#4B5563', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1F2937', stopOpacity: 1 }} />
          </radialGradient>
        </defs>

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="15"
            transform={`rotate(${i * 30} 50 50)`}
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* Minute markers */}
        {[...Array(60)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="8"
            x2="50"
            y2="10"
            transform={`rotate(${i * 6} 50 50)`}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        ))}

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          transform={`rotate(${hourDegrees} 50 50)`}
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          transform={`rotate(${minuteDegrees} 50 50)`}
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Second hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="10"
          transform={`rotate(${secondDegrees} 50 50)`}
          stroke="#EF4444"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx="50" cy="50" r="2" fill="white" />
      </svg>
    </div>
  )
}

