"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import type { SelectedService } from "./booking-flow"

const services = [
  { id: 1, name: "Corte Clásico", category: "Barbería", duration: 30, price: 25 },
  { id: 2, name: "Fade", category: "Barbería", duration: 35, price: 30 },
  { id: 3, name: "Afeitado", category: "Barbería", duration: 20, price: 15 },
  { id: 4, name: "Arreglo de Barba", category: "Barbería", duration: 25, price: 20 },
  { id: 5, name: "Corte Unisex", category: "Salón", duration: 45, price: 35 },
  { id: 6, name: "Coloración", category: "Salón", duration: 90, price: 60 },
  { id: 7, name: "Balayage", category: "Salón", duration: 120, price: 80 },
  { id: 8, name: "Alisado", category: "Salón", duration: 150, price: 100 },
  { id: 9, name: "Manicura Clásica", category: "Manicura", duration: 40, price: 20 },
  { id: 10, name: "Manicura Semipermanente", category: "Manicura", duration: 50, price: 30 },
  { id: 12, name: "Pedicura SPA", category: "Pedicura", duration: 60, price: 50 },
]

const groupedByCategory = services.reduce(
  (acc, service) => {
    const existing = acc.find((g) => g.category === service.category)
    if (existing) {
      existing.services.push(service)
    } else {
      acc.push({ category: service.category, services: [service] })
    }
    return acc
  },
  [] as Array<{ category: string; services: typeof services }>,
)

interface ServiceSelectorProps {
  selectedServices: SelectedService[]
  onSelect: (service: SelectedService) => void
}

export function ServiceSelector({ selectedServices, onSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-6">
      {groupedByCategory.map((group) => (
        <div key={group.category}>
          <h3 className="font-semibold text-lg mb-4">{group.category}</h3>
          <div className="grid grid-cols-1 gap-3">
            {group.services.map((service) => {
              const isSelected = selectedServices.some((s) => s.id === service.id)
              return (
                <Card
                  key={service.id}
                  onClick={() =>
                    onSelect({
                      id: service.id,
                      name: service.name,
                      duration: service.duration,
                      price: service.price,
                    })
                  }
                  className={`cursor-pointer transition ${
                    isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted"
                  }`}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <Checkbox checked={isSelected} className="mt-1" onClick={(e) => e.stopPropagation()} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{service.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {service.duration} min
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Duración: {service.duration} minutos</p>
                    </div>
                    <div className="text-lg font-bold text-primary">${service.price}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
