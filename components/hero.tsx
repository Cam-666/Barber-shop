import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pretty">
            Tu Belleza es Nuestra
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Prioridad
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Reserva tu cita en línea fácilmente. Servicios profesionales de peluquería y belleza con los mejores
            especialistas
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                Reservar Ahora
              </Button>
            </Link>
            <Link href="#servicios">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Conocer Servicios
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 md:pt-16 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-accent">50+</div>
              <p className="text-sm text-muted-foreground">Servicios</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-secondary">15+</div>
              <p className="text-sm text-muted-foreground">Especialistas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
