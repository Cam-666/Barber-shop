"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

type UserRole = "client" | "specialist" | "admin"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userRole, setUserRole] = useState<UserRole>("client")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        setError("Por favor completa todos los campos")
        return
      }
      setStep(2)
    } else {
      setLoading(true)
      try {
        if (formData.password !== formData.confirmPassword) {
          setError("Las contraseñas no coinciden")
          return
        }

        // TODO: Implement registration with backend
        console.log("Registration attempt:", { ...formData, userRole })

        setTimeout(() => {
          router.push("/auth/login")
        }, 1000)
      } catch (err) {
        setError("Error en el registro. Por favor intenta de nuevo.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </Link>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{step === 1 ? "Crear Cuenta" : "Seguridad"}</CardTitle>
            <CardDescription>
              {step === 1 ? "Completa tus datos personales" : "Configura tu contraseña"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleNext} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-medium">¿Quién eres?</label>
                  <div className="space-y-2">
                    {[
                      { value: "client", label: "Cliente", description: "Quiero reservar citas" },
                      { value: "specialist", label: "Especialista", description: "Quiero trabajar aquí" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setUserRole(option.value as UserRole)}
                        className={`w-full p-3 rounded-lg border-2 transition text-left ${
                          userRole === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-medium text-sm">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Info */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre Completo</label>
                  <Input
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Correo Electrónico</label>
                  <Input
                    type="email"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Teléfono</label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={loading}
                    className="h-10"
                  />
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded">
                    {error}
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 h-10">
                  Continuar
                </Button>
              </form>
            ) : (
              <form onSubmit={handleNext} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contraseña</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={loading}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirmar Contraseña</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    disabled={loading}
                    className="h-10"
                  />
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" required />
                    <span>
                      Acepto los{" "}
                      <Link href="#" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>
                    </span>
                  </label>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 h-10">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    "Crear Cuenta"
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition"
                >
                  ← Volver
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
