import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const specialists = [
  {
    name: "Carlos García",
    role: "Barbero Principal",
    specialties: ["Cortes Clásicos", "Fade", "Diseño Barba"],
    image: "/barber-professional.png",
  },
  {
    name: "María López",
    role: "Estilista",
    specialties: ["Coloración", "Balayage", "Cortes Modernos"],
    image: "/hair-stylist-woman.jpg",
  },
  {
    name: "Ana Rodríguez",
    role: "Manicurista",
    specialties: ["Manicura SPA", "Diseño de Uñas", "Semipermanente"],
    image: "/nail-technician-applying-gel.png",
  },
  {
    name: "Laura Martínez",
    role: "Pedicurista",
    specialties: ["Pedicura SPA", "Diseño Especial", "Tratamientos"],
    image: "/pedicure-specialist.jpg",
  },
]

export function Specialists() {
  return (
    <section id="especialistas" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Nuestros Especialistas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conoce al equipo profesional que te cuidará en cada servicio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((specialist) => (
            <Card key={specialist.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img
                  src={specialist.image || "/placeholder.svg"}
                  alt={specialist.name}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-lg mb-1">{specialist.name}</CardTitle>
                <p className="text-sm text-primary font-medium mb-3">{specialist.role}</p>
                <div className="flex flex-wrap gap-2">
                  {specialist.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
