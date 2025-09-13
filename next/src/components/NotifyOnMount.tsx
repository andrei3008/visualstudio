"use client"
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

type Props = {
  message: string
  type?: 'success' | 'error' | 'info'
}

export default function NotifyOnMount({ message, type = 'info' }: Props) {
  useEffect(() => {
    if (!message) return
    if (type === 'success') toast.success(message)
    else if (type === 'error') toast.error(message)
    else toast(message)
  }, [message, type])
  return null
}

