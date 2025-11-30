"use client"

import { type Toast, removeToast } from "@/lib/notification-service"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

interface ToastItemProps {
  toast: Toast
}

export function ToastItem({ toast }: ToastItemProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const colors = {
    success: "bg-green-500/10 text-green-600 border-green-500/30",
    error: "bg-red-500/10 text-red-600 border-red-500/30",
    warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    info: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  }

  const Icon = icons[toast.type]

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm pointer-events-auto max-w-sm animate-in slide-in-from-right-5 ${
        colors[toast.type]
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button onClick={() => removeToast(toast.id)} className="flex-shrink-0 hover:opacity-70 transition">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
