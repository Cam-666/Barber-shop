"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Edit, Trash2, Plus } from "lucide-react"
import Link from "next/link"

// Mock appointment data
const upcomingAppointments = [
  {
    id: 1,
    service: "Corte Clásico",
    specialist: "Carlos García",
    date: new Date(Date.now() + 86400000),
    time: "14:00",
    duration: 30,
    price: 25,
    status: "confirmado",
  },
  {
    id: 2,
    service: "Coloración",
    specialist: "María López",
    date: new Date(Date.now() + 86400000 * 3),
    time: "16:30",
    duration: 90,
    price: 60,
    status: "confirmado",
  },
]

const pastAppointments = [
  {
    id: 3,
    service: "Manicura Semipermanente",
    specialist: "Ana Rodríguez",
    date: new Date(Date.now() - 86400000 * 5),
    time: "11:00",
    duration: 50,
    price: 30,
    status: "completado",
  },
  {
    id: 4,
    service: "Pedicura SPA",
    specialist: "Laura Martínez",
    date: new Date(Date.now() - 86400000 * 10),
    time: "15:00",
    duration: 60,
    price: 50,
    status: "completado",
  },
]

function AppointmentCard({
  appointment,
  isPast = false,
}: {
  appointment: (typeof upcomingAppointments)[0]
  isPast?: boolean
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{appointment.service}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <User className="w-4 h-4" />
              {appointment.specialist}
            </p>
          </div>
          <Badge variant={isPast ? "outline" : "default"} className="bg-primary/20 text-primary border-0">
            {isPast ? "Completado" : "Confirmado"}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {appointment.date.toLocaleDateString("es-ES", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              {appointment.time} - {appointment.duration} min
            </span>
          </div>
        </div>

        <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
          <span className="font-bold text-primary">${appointment.price}</span>
          <div className="flex gap-2">
            {!isPast ? (
              <>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-1" />
                  Reprogramar
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Repetir
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ClientDashboard() {
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Mi Panel de Control</h1>
        <p className="text-muted-foreground">Gestiona tus citas y perfil</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Próximas Citas</p>
                <p className="text-3xl font-bold mt-1">{upcomingAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Citas Completadas</p>
                <p className="text-3xl font-bold mt-1">{pastAppointments.length}</p>
              </div>
              <Badge className="bg-green-500/20 text-green-600 border-0" variant="outline">
                Todos
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gastado Total</p>
                <p className="text-3xl font-bold mt-1 text-primary">
                  ${[...upcomingAppointments, ...pastAppointments].reduce((sum, a) => sum + a.price, 0)}
                </p>
              </div>
              <Badge className="bg-primary/20 text-primary border-0" variant="outline">
                Total
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas Citas</TabsTrigger>
          <TabsTrigger value="past">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No hay citas próximas</h3>
                <p className="text-muted-foreground mb-4">Reserva tu próxima cita ahora</p>
                <Link href="/booking">
                  <Button className="bg-primary hover:bg-primary/90">Reservar Cita</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Sin historial de citas</h3>
              </CardContent>
            </Card>
          ) : (
            pastAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} isPast />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
