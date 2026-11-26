"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY
      const scrollableHeight = doc.scrollHeight - window.innerHeight
      if (scrollableHeight <= 0) {
        setProgress(0)
        return
      }
      const next = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
      setProgress(next)
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-16 z-40 h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-[#569429] transition-[width] duration-100 ease-out motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
