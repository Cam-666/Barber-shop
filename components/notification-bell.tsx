"use client"

import { useState } from "react"
import { Bell, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Notification {
  id: number
  title: string
  message: string
  timestamp: Date
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Cita Confirmada",
    message: "Tu cita con Carlos García está confirmada para mañana a las 14:00",
    timestamp: new Date(Date.now() - 60000),
    read: false,
  },
  {
    id: 2,
    title: "Recordatorio",
    message: "Tu cita con María López es en 2 horas",
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: 3,
    title: "Servicio Disponible",
    message: "Nuevo servicio disponible: Tratamiento SPA Premium",
    timestamp: new Date(Date.now() - 86400000),
    read: true,
  },
]

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `Hace ${minutes}m`
    if (hours < 24) return `Hace ${hours}h`
    if (days < 7) return `Hace ${days}d`
    return date.toLocaleDateString()
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 hover:bg-muted rounded-lg transition">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <Card className="absolute right-0 mt-2 w-96 z-50 shadow-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Notificaciones</h3>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-muted rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {mockNotifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p className="text-sm">No tienes notificaciones</p>
                </div>
              ) : (
                mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-border hover:bg-muted/50 transition cursor-pointer ${
                      !notification.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatTime(notification.timestamp)}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-border">
              <Button variant="ghost" className="w-full text-xs">
                Ver todas las notificaciones
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
