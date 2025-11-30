"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

const appointments = [
  {
    id: 1,
    client: "Juan Pérez",
    service: "Corte Clásico",
    specialist: "Carlos García",
    date: "25/11/2025",
    time: "14:00",
    status: "confirmado",
    price: 25,
  },
  {
    id: 2,
    client: "María García",
    service: "Coloración",
    specialist: "María López",
    date: "25/11/2025",
    time: "16:30",
    status: "completado",
    price: 60,
  },
  {
    id: 3,
    client: "Ana Rodríguez",
    service: "Manicura Semipermanente",
    specialist: "Ana Rodríguez",
    date: "26/11/2025",
    time: "11:00",
    status: "confirmado",
    price: 30,
  },
  {
    id: 4,
    client: "Laura Martínez",
    service: "Pedicura SPA",
    specialist: "Laura Martínez",
    date: "26/11/2025",
    time: "15:00",
    status: "cancelado",
    price: 50,
  },
]

export default function AppointmentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const filtered = appointments.filter((apt) => {
    const matchSearch =
      apt.client.toLowerCase().includes(search.toLowerCase()) ||
      apt.service.toLowerCase().includes(search.toLowerCase()) ||
      apt.specialist.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "todos" || apt.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Gestión de Citas</h1>
          <p className="text-muted-foreground">Administra todas las citas del salón</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Nueva Cita
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, servicio o especialista..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["todos", "confirmado", "completado", "cancelado"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === status
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Cliente</th>
                  <th className="px-6 py-3 text-left font-semibold">Servicio</th>
                  <th className="px-6 py-3 text-left font-semibold">Especialista</th>
                  <th className="px-6 py-3 text-left font-semibold">Fecha y Hora</th>
                  <th className="px-6 py-3 text-left font-semibold">Estado</th>
                  <th className="px-6 py-3 text-left font-semibold">Precio</th>
                  <th className="px-6 py-3 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((apt) => (
                  <tr key={apt.id} className="border-b border-border hover:bg-muted/30 transition">
                    <td className="px-6 py-4">{apt.client}</td>
                    <td className="px-6 py-4">{apt.service}</td>
                    <td className="px-6 py-4">{apt.specialist}</td>
                    <td className="px-6 py-4">
                      {apt.date} {apt.time}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          apt.status === "confirmado"
                            ? "bg-blue-500/10 text-blue-600 border-0"
                            : apt.status === "completado"
                              ? "bg-green-500/10 text-green-600 border-0"
                              : "bg-red-500/10 text-red-600 border-0"
                        }
                      >
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 font-semibold">${apt.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
