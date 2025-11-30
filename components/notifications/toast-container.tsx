"use client"

import { useEffect, useState } from "react"
import { subscribe, type Toast } from "@/lib/notification-service"
import { ToastItem } from "./toast-item"

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const unsubscribe = subscribe(setToasts)
    return unsubscribe
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
