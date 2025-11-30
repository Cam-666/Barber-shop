"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingFlow } from "@/components/booking/booking-flow"

function BookingContent() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get("service")
  const specialistId = searchParams.get("specialist")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <BookingFlow
          initialServiceId={serviceId ? Number.parseInt(serviceId) : undefined}
          initialSpecialistId={specialistId ? Number.parseInt(specialistId) : undefined}
        />
      </main>
      <Footer />
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <BookingContent />
    </Suspense>
  )
}
