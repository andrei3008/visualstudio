"use client"

import { useEffect } from "react"
import Link from "next/link"

interface ScrollToTopLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function ScrollToTopLink({ href, children, className, onClick }: ScrollToTopLinkProps) {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent default behavior for internal links
    if (href.startsWith('/')) {
      e.preventDefault()
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Navigate after a small delay to ensure scroll happens
      setTimeout(() => {
        window.location.href = href
      }, 100)
    }

    // Call original onClick if provided
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}