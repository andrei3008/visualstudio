"use client"
import { useEffect } from 'react'

export default function ThemeInit() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const enableDark = saved ? saved === 'dark' : systemDark
      document.documentElement.classList.toggle('dark', enableDark)
    } catch {}
  }, [])
  return null
}

