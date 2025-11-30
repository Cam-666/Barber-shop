"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SelectedDateTime } from "./booking-flow"

// Mock time slots (every 30 minutes from 9:00 to 17:00)
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour < 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

interface DateTimeSelectorProps {
  onSelect: (dateTime: SelectedDateTime) => void
  selectedDateTime: SelectedDateTime | null
  serviceDuration: number
}

export function DateTimeSelector({ onSelect, selectedDateTime, serviceDuration }: DateTimeSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onSelect({
      date: selectedDate,
      time: selectedDateTime?.time || timeSlots[0],
    })
  }

  const handleTimeSelect = (time: string) => {
    onSelect({
      date: selectedDateTime?.date || new Date(),
      time,
    })
  }

  const isDateSelected = (day: number) => {
    return (
      selectedDateTime?.date.getDate() === day &&
      selectedDateTime?.date.getMonth() === currentMonth.getMonth() &&
      selectedDateTime?.date.getFullYear() === currentMonth.getFullYear()
    )
  }

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Selecciona una Fecha</h3>
        </CardHeader>
        <CardContent>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <h4 className="font-semibold">
              {currentMonth.toLocaleDateString("es-ES", {
                month: "long",
                year: "numeric",
              })}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"].map((day) => (
              <div key={day} className="text-center font-semibold text-xs text-muted-foreground">
                {day}
              </div>
            ))}
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Days */}
            {days.map((day) => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
              const isPast = date < new Date()
              const isSelected = isDateSelected(day)

              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  disabled={isPast}
                  className={`aspect-square rounded-lg font-medium text-sm transition ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isPast
                        ? "text-muted-foreground opacity-50 cursor-not-allowed"
                        : "hover:bg-muted border border-border"
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Picker */}
      {selectedDateTime?.date && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Selecciona una Hora
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Tiempo requerido: {serviceDuration} minutos</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                    selectedDateTime.time === time
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
