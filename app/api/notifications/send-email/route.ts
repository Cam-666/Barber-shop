import { sendNotificationEmail } from "@/lib/email-service"

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json()

    const result = await sendNotificationEmail(type, data)

    return Response.json({
      success: true,
      result,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return Response.json({ success: false, error: "Error sending email" }, { status: 500 })
  }
}
