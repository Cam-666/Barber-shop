"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Star } from "lucide-react"
import Link from "next/link"

const specialists = [
  {
    id: 1,
    name: "Carlos García",
    role: "Barbero Principal",
    specialties: ["Cortes Clásicos", "Fade", "Diseño Barba", "Afeitado"],
    bio: "Con 15 años de experiencia, Carlos es experto en barbería clásica y moderna.",
    image: "/barber-professional.png",
    rating: 4.9,
    reviews: 127,
    availability: "Lun-Sab 9:00-17:00",
  },
  {
    id: 2,
    name: "María López",
    role: "Estilista Principal",
    specialties: ["Coloración", "Balayage", "Alisado", "Cortes Modernos"],
    bio: "Especialista en coloración y tratamientos capilares con técnicas internacionales.",
    image: "/hair-stylist-woman.jpg",
    rating: 4.95,
    reviews: 156,
    availability: "Lun-Sab 10:00-18:00",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Manicurista Certificada",
    specialties: ["Manicura SPA", "Diseño de Uñas", "Semipermanente", "Nail Art"],
    bio: "Certificada internacionalmente en técnicas de uñas y diseño creativo.",
    image: "/nail-technician-applying-gel.png",
    rating: 4.88,
    reviews: 94,
    availability: "Mar-Dom 11:00-19:00",
  },
  {
    id: 4,
    name: "Laura Martínez",
    role: "Pedicurista Especialista",
    specialties: ["Pedicura SPA", "Diseño Especial", "Tratamientos", "Reflexología"],
    bio: "Experta en cuidado de pies con enfoque en relajación y belleza.",
    image: "/pedicure-specialist.jpg",
    rating: 4.92,
    reviews: 112,
    availability: "Mié-Dom 12:00-20:00",
  },
]

export default function SpecialistsPage() {
  const [search, setSearch] = useState("")

  const filtered = specialists.filter(
    (specialist) =>
      specialist.name.toLowerCase().includes(search.toLowerCase()) ||
      specialist.role.toLowerCase().includes(search.toLowerCase()) ||
      specialist.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Especialistas</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">Conoce al equipo profesional que cuidará de ti</p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar especialistas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Specialists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((specialist) => (
              <Card key={specialist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={specialist.image || "/placeholder.svg"}
                    alt={specialist.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-3 right-3 bg-background/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold">{specialist.rating}</span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div>
                    <h3 className="text-2xl font-bold">{specialist.name}</h3>
                    <p className="text-primary font-medium text-sm">{specialist.role}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{specialist.bio}</p>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">ESPECIALIDADES</p>
                    <div className="flex flex-wrap gap-2">
                      {specialist.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{specialist.availability}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="w-3 h-3" />
                      <span>{specialist.reviews} valoraciones</span>
                    </div>
                  </div>

                  <Link href={`/booking?specialist=${specialist.id}`} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Reservar con {specialist.name.split(" ")[0]}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No se encontraron especialistas que coincidan con tu búsqueda
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
