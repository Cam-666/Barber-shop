"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

const allServices = [
  {
    id: 1,
    name: "Corte Clásico",
    category: "Barbería",
    duration: 30,
    price: 25,
    description: "Corte clásico profesional con máquina y tijeras. Incluye acabado perfecto.",
    specialists: ["Carlos García", "Miguel Rodríguez"],
  },
  {
    id: 2,
    name: "Fade",
    category: "Barbería",
    duration: 35,
    price: 30,
    description: "Corte Fade moderno con degradado perfecto. Estilo contemporáneo.",
    specialists: ["Carlos García", "Juan Pérez"],
  },
  {
    id: 3,
    name: "Afeitado",
    category: "Barbería",
    duration: 20,
    price: 15,
    description: "Afeitado profesional con navaja. Incluye crema y aftershave.",
    specialists: ["Carlos García", "Miguel Rodríguez"],
  },
  {
    id: 4,
    name: "Arreglo de Barba",
    category: "Barbería",
    duration: 25,
    price: 20,
    description: "Arreglo y perfilado de barba. Consulta gratuita sobre estilos.",
    specialists: ["Carlos García"],
  },
  {
    id: 5,
    name: "Corte Unisex",
    category: "Salón",
    duration: 45,
    price: 35,
    description: "Corte personalizado para hombre y mujer. Asesoramiento de estilo incluido.",
    specialists: ["María López", "Laura Estrada"],
  },
  {
    id: 6,
    name: "Coloración",
    category: "Salón",
    duration: 90,
    price: 60,
    description: "Coloración profesional con productos de calidad. Incluye tratamiento.",
    specialists: ["María López", "Sandra Pérez"],
  },
  {
    id: 7,
    name: "Balayage",
    category: "Salón",
    duration: 120,
    price: 80,
    description: "Balayage a mano con técnica francesa. Efecto natural y dimensional.",
    specialists: ["María López"],
  },
  {
    id: 8,
    name: "Alisado",
    category: "Salón",
    duration: 150,
    price: 100,
    description: "Alisado brasileño o queratina. Mantiene el cabello liso hasta 3 meses.",
    specialists: ["María López", "Sandra Pérez"],
  },
  {
    id: 9,
    name: "Manicura Clásica",
    category: "Manicura",
    duration: 40,
    price: 20,
    description: "Manicura completa con limpieza, corte y esmaltado.",
    specialists: ["Ana Rodríguez"],
  },
  {
    id: 10,
    name: "Manicura Semipermanente",
    category: "Manicura",
    duration: 50,
    price: 30,
    description: "Manicura con esmalte semipermanente UV. Dura hasta 3 semanas.",
    specialists: ["Ana Rodríguez", "Carolina Flores"],
  },
  {
    id: 11,
    name: "Diseño de Uñas",
    category: "Manicura",
    duration: 60,
    price: 40,
    description: "Diseño personalizado de uñas. Estilos únicos y creativos.",
    specialists: ["Ana Rodríguez"],
  },
  {
    id: 12,
    name: "Pedicura SPA",
    category: "Pedicura",
    duration: 60,
    price: 50,
    description: "Pedicura completa con tratamiento SPA. Incluye masaje relajante.",
    specialists: ["Laura Martínez"],
  },
]

const categories = ["Todas", "Barbería", "Salón", "Manicura", "Pedicura"]

export default function ServicesPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")

  const filtered = allServices.filter((service) => {
    const matchSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === "Todas" || service.category === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Catálogo de Servicios</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explora nuestros servicios profesionales de peluquería y belleza
            </p>
          </div>

          {/* Search and Filter */}
          <div className="space-y-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar servicios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <Link key={service.id} href={`/booking?service=${service.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs whitespace-nowrap">
                        {service.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{service.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duración:</span>
                        <span className="font-medium">{service.duration} minutos</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Precio:</span>
                        <span className="text-lg font-bold text-primary">${service.price}</span>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Especialistas:</p>
                        <div className="flex flex-wrap gap-1">
                          {service.specialists.map((specialist) => (
                            <Badge key={specialist} variant="outline" className="text-xs">
                              {specialist}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Reservar</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No se encontraron servicios que coincidan con tu búsqueda</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
