import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">SP</span>
              </div>
              <span className="font-bold">SalonPro</span>
            </div>
            <p className="text-sm opacity-80">
              Plataforma de gestión de citas moderna para peluquería y salón de belleza
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link href="#servicios" className="hover:opacity-100 transition">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#especialistas" className="hover:opacity-100 transition">
                  Especialistas
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:opacity-100 transition">
                  Reservar
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:opacity-100 transition">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@salonpro.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Calle Principal</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Horario</h4>
            <ul className="space-y-1 text-sm opacity-80">
              <li>Lun - Vie: 9:00 - 19:00</li>
              <li>Sábado: 10:00 - 18:00</li>
              <li>Domingo: 12:00 - 17:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 SalonPro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
