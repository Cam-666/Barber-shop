"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { SelectedSpecialist } from "./booking-flow"

const specialists = [
  {
    id: 1,
    name: "Carlos García",
    role: "Barbero Principal",
    image: "/barber-professional.png",
    rating: 4.9,
    reviews: 127,
  },
  {
    id: 2,
    name: "María López",
    role: "Estilista Principal",
    image: "/hair-stylist-woman.jpg",
    rating: 4.95,
    reviews: 156,
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Manicurista",
    image: "/nail-technician-applying-gel.png",
    rating: 4.88,
    reviews: 94,
  },
  {
    id: 4,
    name: "Laura Martínez",
    role: "Pedicurista",
    image: "/pedicure-specialist.jpg",
    rating: 4.92,
    reviews: 112,
  },
]

interface SpecialistSelectorProps {
  onSelect: (specialist: SelectedSpecialist | null) => void
  selectedSpecialist: SelectedSpecialist | null
}

export function SpecialistSelector({ onSelect, selectedSpecialist }: SpecialistSelectorProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Elige un Especialista</h3>
          <p className="text-sm text-muted-foreground mt-2">Puedes dejar que el sistema asigne uno automáticamente</p>
        </CardHeader>
        <CardContent>
          <button
            onClick={() => onSelect(null)}
            className={`w-full p-4 rounded-lg border-2 transition text-left mb-4 ${
              selectedSpecialist === null ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: selectedSpecialist === null ? "#FF007F" : "#e5e7eb" }}
              >
                {selectedSpecialist === null && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <div>
                <p className="font-medium">Asignación Automática</p>
                <p className="text-sm text-muted-foreground">El sistema elegirá el mejor especialista disponible</p>
              </div>
            </div>
          </button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {specialists.map((specialist) => {
          const isSelected = selectedSpecialist?.id === specialist.id
          return (
            <Card
              key={specialist.id}
              onClick={() =>
                onSelect({
                  id: specialist.id,
                  name: specialist.name,
                  role: specialist.role,
                })
              }
              className={`cursor-pointer transition overflow-hidden ${
                isSelected ? "ring-2 ring-primary" : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-4 flex items-start gap-4">
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ borderColor: isSelected ? "#FF007F" : "#e5e7eb" }}
                >
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">{specialist.name}</h4>
                  <p className="text-sm text-muted-foreground">{specialist.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium">{specialist.rating}</span>
                    <span className="text-xs text-muted-foreground">({specialist.reviews} valoraciones)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
