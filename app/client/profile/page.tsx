"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, Heart, Bell, Moon, Save, Loader2 } from "lucide-react"

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    phone: "+1 (555) 123-4567",
    favoriteSpecialist: "Carlos García",
  })

  const [notifications, setNotifications] = useState({
    emailConfirmations: true,
    emailReminders: true,
    smsReminders: false,
    marketing: false,
  })

  const [darkMode, setDarkMode] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: Implement save profile
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Profile saved:", formData)
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationChange = (field: string) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    // TODO: Implement dark mode toggle
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Mi Perfil</h1>
      <p className="text-muted-foreground mb-8">Gestiona tu cuenta y preferencias</p>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Información Personal</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Preferencias</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notificaciones</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tu información de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Nombre Completo
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Tu nombre"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="tu@correo.com"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Teléfono
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="h-10"
                />
              </div>

              <div className="border-t border-border pt-6">
                <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>Personaliza tu experiencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  Especialista Favorito
                </label>
                <Input
                  value={formData.favoriteSpecialist}
                  onChange={(e) => handleInputChange("favoriteSpecialist", e.target.value)}
                  placeholder="Nombre del especialista favorito"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">Este especialista será sugerido en futuras reservas</p>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Modo Oscuro</p>
                      <p className="text-xs text-muted-foreground">Cambiar a modo oscuro</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      darkMode ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>Controla cómo deseas ser notificado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "emailConfirmations",
                  label: "Confirmaciones por Correo",
                  description: "Recibe confirmación cuando se reserva una cita",
                },
                {
                  key: "emailReminders",
                  label: "Recordatorios por Correo",
                  description: "Recordatorios 24h y 2h antes de tu cita",
                },
                {
                  key: "smsReminders",
                  label: "Recordatorios por SMS",
                  description: "Recordatorios por mensaje de texto",
                },
                {
                  key: "marketing",
                  label: "Promociones y Ofertas",
                  description: "Recibe información sobre nuestras promociones",
                },
              ].map((option) => (
                <div key={option.key} className="flex items-center justify-between border border-border rounded-lg p-4">
                  <div>
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(option.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[option.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        notifications[option.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}

              <div className="border-t border-border pt-6">
                <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Preferencias
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
