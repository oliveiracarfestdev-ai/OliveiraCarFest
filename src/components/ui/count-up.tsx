'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'

interface CountUpProps {
  to: number;
  duration?: number;
}

export function CountUp({ to, duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration, ease: "easeOut" })
    }
  }, [isInView, to, duration, count])

  return <motion.span ref={ref}>{rounded}</motion.span>
}
