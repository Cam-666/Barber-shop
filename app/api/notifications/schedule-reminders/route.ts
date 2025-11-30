import { scheduleReminderEmails } from "@/lib/email-service"

export async function POST(request: Request) {
  try {
    const { appointmentId, appointmentDate } = await request.json()

    const result = await scheduleReminderEmails(appointmentId, new Date(appointmentDate))

    return Response.json({
      success: true,
      result,
    })
  } catch (error) {
    console.error("Error scheduling reminders:", error)
    return Response.json({ success: false, error: "Error scheduling reminders" }, { status: 500 })
  }
}
