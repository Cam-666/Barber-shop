import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Sparkles, Palette, Brush } from "lucide-react"

const services = [
  {
    category: "Barbería",
    icon: Scissors,
    items: [
      { name: "Corte Clásico", duration: "30 min", price: "$25" },
      { name: "Fade", duration: "35 min", price: "$30" },
      { name: "Afeitado", duration: "20 min", price: "$15" },
      { name: "Arreglo de Barba", duration: "25 min", price: "$20" },
    ],
  },
  {
    category: "Salón",
    icon: Palette,
    items: [
      { name: "Corte Unisex", duration: "45 min", price: "$35" },
      { name: "Coloración", duration: "90 min", price: "$60" },
      { name: "Balayage", duration: "120 min", price: "$80" },
      { name: "Alisado", duration: "150 min", price: "$100" },
    ],
  },
  {
    category: "Manicura",
    icon: Brush,
    items: [
      { name: "Manicura Clásica", duration: "40 min", price: "$20" },
      { name: "Manicura Semipermanente", duration: "50 min", price: "$30" },
      { name: "Diseño de Uñas", duration: "60 min", price: "$40" },
      { name: "Tratamiento SPA", duration: "45 min", price: "$35" },
    ],
  },
  {
    category: "Pedicura",
    icon: Sparkles,
    items: [
      { name: "Pedicura Clásica", duration: "40 min", price: "$25" },
      { name: "Pedicura Estética", duration: "50 min", price: "$35" },
      { name: "Pedicura SPA", duration: "60 min", price: "$50" },
      { name: "Diseño Especial", duration: "75 min", price: "$60" },
    ],
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios profesionales para tu bienestar y belleza
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.category} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {service.items.map((item) => (
                      <div key={item.name} className="text-sm">
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="flex justify-between text-muted-foreground text-xs">
                          <span>{item.duration}</span>
                          <span className="font-semibold text-primary">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
