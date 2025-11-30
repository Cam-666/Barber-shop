"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StepIndicator } from "./step-indicator"
import { ServiceSelector } from "./service-selector"
import { SpecialistSelector } from "./specialist-selector"
import { DateTimeSelector } from "./datetime-selector"

type BookingStep = "services" | "specialist" | "datetime" | "summary" | "confirmation"

export interface SelectedService {
  id: number
  name: string
  duration: number
  price: number
}

export interface SelectedSpecialist {
  id: number
  name: string
  role: string
}

export interface SelectedDateTime {
  date: Date
  time: string
}

export function BookingFlow({
  initialServiceId,
  initialSpecialistId,
}: {
  initialServiceId?: number
  initialSpecialistId?: number
}) {
  const [step, setStep] = useState<BookingStep>("services")
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([])
  const [selectedSpecialist, setSelectedSpecialist] = useState<SelectedSpecialist | null>(null)
  const [selectedDateTime, setSelectedDateTime] = useState<SelectedDateTime | null>(null)
  const [notes, setNotes] = useState("")

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0)
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0)

  const handleServiceSelect = (service: SelectedService) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id)
      if (exists) {
        return prev.filter((s) => s.id !== service.id)
      }
      return [...prev, service]
    })
  }

  const handleContinue = () => {
    if (step === "services" && selectedServices.length > 0) {
      setStep("specialist")
    } else if (step === "specialist") {
      setStep("datetime")
    } else if (step === "datetime" && selectedDateTime) {
      setStep("summary")
    } else if (step === "summary") {
      setStep("confirmation")
    }
  }

  const handleBack = () => {
    const steps: BookingStep[] = ["services", "specialist", "datetime", "summary"]
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const steps = ["Servicios", "Especialista", "Fecha y Hora", "Resumen", "Confirmación"]
  const currentStepIndex = ["services", "specialist", "datetime", "summary", "confirmation"].indexOf(step)

  return (
    <div className="max-w-4xl mx-auto px-4">
      {step === "confirmation" ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">¡Cita Confirmada!</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tu cita ha sido reservada exitosamente. Recibirás un correo de confirmación con todos los detalles.
          </p>
          <div className="bg-muted/50 rounded-lg p-8 mb-8 text-left max-w-lg mx-auto space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Número de Confirmación</p>
              <p className="text-2xl font-bold text-primary">
                #AP-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">Resumen de la Cita</p>
              <div className="space-y-2">
                {selectedServices.map((service) => (
                  <p key={service.id} className="text-sm">
                    <span className="font-medium">{service.name}</span> - {service.duration} min
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Ir al Inicio
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => (window.location.href = "/client/dashboard")}
            >
              Ver mis Citas
            </Button>
          </div>
        </div>
      ) : (
        <>
          <StepIndicator steps={steps} currentStep={currentStepIndex} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === "services" && (
                <ServiceSelector selectedServices={selectedServices} onSelect={handleServiceSelect} />
              )}

              {step === "specialist" && (
                <SpecialistSelector onSelect={setSelectedSpecialist} selectedSpecialist={selectedSpecialist} />
              )}

              {step === "datetime" && (
                <DateTimeSelector
                  onSelect={setSelectedDateTime}
                  selectedDateTime={selectedDateTime}
                  serviceDuration={totalDuration}
                />
              )}

              {step === "summary" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de tu Cita</CardTitle>
                    <CardDescription>Verifica todos los detalles antes de confirmar</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Services */}
                    <div>
                      <h3 className="font-semibold mb-3">Servicios</h3>
                      <div className="space-y-2">
                        {selectedServices.map((service) => (
                          <div key={service.id} className="flex justify-between p-3 bg-muted rounded">
                            <span>{service.name}</span>
                            <span className="font-medium">${service.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialist */}
                    {selectedSpecialist && (
                      <div>
                        <h3 className="font-semibold mb-3">Especialista</h3>
                        <div className="p-3 bg-muted rounded">
                          <p className="font-medium">{selectedSpecialist.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedSpecialist.role}</p>
                        </div>
                      </div>
                    )}

                    {/* Date and Time */}
                    {selectedDateTime && (
                      <div>
                        <h3 className="font-semibold mb-3">Fecha y Hora</h3>
                        <div className="p-3 bg-muted rounded">
                          <p className="font-medium">
                            {selectedDateTime.date.toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">{selectedDateTime.time}</p>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div>
                      <h3 className="font-semibold mb-3">Notas Adicionales</h3>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Cuéntanos algo adicional sobre tu cita (preferencias, alergias, etc.)"
                        className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                      />
                    </div>

                    {/* Total */}
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-primary">${totalPrice}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Tiempo total: {totalDuration} minutos</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-2">Servicios Seleccionados</p>
                    <div className="space-y-2">
                      {selectedServices.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Ninguno seleccionado</p>
                      ) : (
                        selectedServices.map((service) => (
                          <div key={service.id} className="text-sm">
                            <p className="font-medium">{service.name}</p>
                            <p className="text-xs text-muted-foreground">${service.price}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {selectedSpecialist && (
                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground uppercase mb-2">Especialista</p>
                      <p className="font-medium text-sm">{selectedSpecialist.name}</p>
                    </div>
                  )}

                  {selectedDateTime && (
                    <div className="border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground uppercase mb-2">Fecha y Hora</p>
                      <p className="font-medium text-sm">{selectedDateTime.time}</p>
                    </div>
                  )}

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">Total:</span>
                      <span className="text-xl font-bold text-primary">${totalPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleContinue}
                      disabled={
                        (step === "services" && selectedServices.length === 0) ||
                        (step === "datetime" && !selectedDateTime)
                      }
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {step === "summary" ? "Confirmar Cita" : "Continuar"}
                    </Button>
                    {step !== "services" && (
                      <Button variant="outline" onClick={handleBack} className="w-full bg-transparent">
                        Atrás
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
