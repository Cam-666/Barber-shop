"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">SalonPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#servicios" className="text-sm hover:text-primary transition">
              Servicios
            </Link>
            <Link href="#especialistas" className="text-sm hover:text-primary transition">
              Especialistas
            </Link>
            <Link href="/services" className="text-sm hover:text-primary transition">
              Catálogo
            </Link>
            <Link href="#contacto" className="text-sm hover:text-primary transition">
              Contacto
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="ghost" className="text-foreground hover:bg-muted">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-primary hover:bg-primary/90">Registrarse</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border">
            <Link href="#servicios" className="block text-sm py-2 hover:text-primary transition">
              Servicios
            </Link>
            <Link href="#especialistas" className="block text-sm py-2 hover:text-primary transition">
              Especialistas
            </Link>
            <Link href="/services" className="block text-sm py-2 hover:text-primary transition">
              Catálogo
            </Link>
            <Link href="#contacto" className="block text-sm py-2 hover:text-primary transition">
              Contacto
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Tema:</span>
                <ThemeToggle />
              </div>
              <Link href="/auth/login" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/register" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90">Registrarse</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
