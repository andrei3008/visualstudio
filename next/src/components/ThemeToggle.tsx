"use client"
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch (e) {
      console.warn('Failed to save theme preference:', e)
    }
    // Remove focus from button after click
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="rounded p-2 w-9 h-9 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Comută la temă ${dark ? 'luminoasă' : 'întunecată'}`}
      aria-expanded={dark}
      className="rounded-lg p-2 w-9 h-9 flex items-center justify-center transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600"
    >
      {dark ? (
        <Sun className="w-4 h-4 text-yellow-500 transition-all duration-200 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-all duration-200 rotate-0" />
      )}
    </button>
  )
}