import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">¿Listo para tu Próxima Cita?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Reserva en línea en segundos y disfruta de una experiencia sin complicaciones
        </p>
        <Link href="/booking">
          <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
            Reservar Ahora <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
