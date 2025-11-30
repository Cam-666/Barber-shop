"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Star } from "lucide-react"

const staff = [
  {
    id: 1,
    name: "Carlos García",
    role: "Barbero",
    specialties: ["Cortes", "Fade", "Afeitado"],
    rating: 4.9,
    bookings: 45,
    status: "activo",
  },
  {
    id: 2,
    name: "María López",
    role: "Estilista",
    specialties: ["Coloración", "Balayage", "Cortes"],
    rating: 4.95,
    bookings: 52,
    status: "activo",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Manicurista",
    specialties: ["Manicura", "Nail Art", "SPA"],
    rating: 4.88,
    bookings: 38,
    status: "activo",
  },
]

export default function StaffPage() {
  const [search, setSearch] = useState("")

  const filtered = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Gestión de Personal</h1>
          <p className="text-muted-foreground">Administra especialistas y permisos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Agregar Personal
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Buscar personal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </div>
                <Badge className="bg-green-500/20 text-green-600 border-0">{member.status}</Badge>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Calificación:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {member.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reservas:</span>
                  <span className="font-bold text-primary">{member.bookings}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
