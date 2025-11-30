"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2 } from "lucide-react"

const services = [
  { id: 1, name: "Corte Clásico", category: "Barbería", duration: 30, price: 25, active: true },
  { id: 2, name: "Fade", category: "Barbería", duration: 35, price: 30, active: true },
  { id: 3, name: "Coloración", category: "Salón", duration: 90, price: 60, active: true },
  { id: 4, name: "Balayage", category: "Salón", duration: 120, price: 80, active: true },
  { id: 5, name: "Manicura Clásica", category: "Manicura", duration: 40, price: 20, active: true },
]

export default function ServicesPage() {
  const [search, setSearch] = useState("")

  const filtered = services.filter(
    (service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Gestión de Servicios</h1>
          <p className="text-muted-foreground">Administra los servicios disponibles</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Servicio
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Buscar servicios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.category}</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duración:</span>
                  <span className="font-medium">{service.duration} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Precio:</span>
                  <span className="font-bold text-primary">${service.price}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
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
