'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: string
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Force targetDate to local timezone correctly (assuming targetDate is like "2024-09-27T20:00:00")
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-4 text-center w-full">
      <div className="flex flex-col">
        <span className="font-heading text-4xl font-bold text-primary">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="font-sans text-xs text-muted-foreground">DIAS</span>
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-4xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="font-sans text-xs text-muted-foreground">HORAS</span>
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-4xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="font-sans text-xs text-muted-foreground">MIN</span>
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-4xl font-bold text-primary">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="font-sans text-xs text-muted-foreground">SEG</span>
      </div>
    </div>
  )
}
