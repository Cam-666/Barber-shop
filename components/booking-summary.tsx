import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SelectedService, SelectedSpecialist, SelectedDateTime } from "./booking-flow"

interface BookingSummaryProps {
  services: SelectedService[]
  specialist: SelectedSpecialist | null
  dateTime: SelectedDateTime | null
  notes: string
}

export function BookingSummary({ services, specialist, dateTime, notes }: BookingSummaryProps) {
  const totalPrice = services.reduce((sum, s) => sum + s.price, 0)
  const totalDuration = services.reduce((sum, s) => sum + s.duration, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de tu Cita</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Servicios</h4>
          {services.map((service) => (
            <div key={service.id} className="flex justify-between text-sm">
              <span>{service.name}</span>
              <span>${service.price}</span>
            </div>
          ))}
        </div>

        {specialist && (
          <div>
            <h4 className="font-semibold mb-2">Especialista</h4>
            <p className="text-sm">{specialist.name}</p>
          </div>
        )}

        {dateTime && (
          <div>
            <h4 className="font-semibold mb-2">Fecha y Hora</h4>
            <p className="text-sm">
              {dateTime.date.toLocaleDateString("es-ES")} a las {dateTime.time}
            </p>
          </div>
        )}

        {notes && (
          <div>
            <h4 className="font-semibold mb-2">Notas</h4>
            <p className="text-sm text-muted-foreground">{notes}</p>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-primary">${totalPrice}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Duración total: {totalDuration} minutos</p>
        </div>
      </CardContent>
    </Card>
  )
}
