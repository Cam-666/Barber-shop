export interface NotificationData {
  recipientEmail: string
  recipientName: string
  appointmentId: number
  appointmentDate: string
  appointmentTime: string
  service: string
  specialist: string
  totalPrice: number
}

type NotificationType =
  | "registration"
  | "appointment-confirmation"
  | "appointment-reminder-24h"
  | "appointment-reminder-2h"
  | "appointment-cancellation"
  | "appointment-rescheduled"
  | "password-reset"

export async function sendNotificationEmail(type: NotificationType, data: NotificationData) {
  // TODO: Implement with actual email service (SendGrid, Resend, etc.)

  const emailTemplates: Record<
    NotificationType,
    (data: NotificationData) => {
      subject: string
      body: string
    }
  > = {
    registration: () => ({
      subject: "Bienvenido a SalonPro",
      body: `
        <h2>¡Bienvenido, ${data.recipientName}!</h2>
        <p>Tu cuenta en SalonPro ha sido creada exitosamente.</p>
        <p>Ya puedes reservar tus citas en línea.</p>
      `,
    }),
    "appointment-confirmation": () => ({
      subject: "Confirmación de tu Cita - SalonPro",
      body: `
        <h2>¡Cita Confirmada!</h2>
        <p>Hola ${data.recipientName},</p>
        <p>Tu cita ha sido confirmada:</p>
        <ul>
          <li><strong>Servicio:</strong> ${data.service}</li>
          <li><strong>Especialista:</strong> ${data.specialist}</li>
          <li><strong>Fecha:</strong> ${data.appointmentDate}</li>
          <li><strong>Hora:</strong> ${data.appointmentTime}</li>
          <li><strong>Precio:</strong> $${data.totalPrice}</li>
        </ul>
        <p>Número de confirmación: #AP-${data.appointmentId}</p>
      `,
    }),
    "appointment-reminder-24h": () => ({
      subject: "Recordatorio: Tu cita es mañana",
      body: `
        <h2>Recordatorio de tu Cita</h2>
        <p>Hola ${data.recipientName},</p>
        <p>Te recordamos que tu cita es mañana:</p>
        <ul>
          <li><strong>Servicio:</strong> ${data.service}</li>
          <li><strong>Especialista:</strong> ${data.specialist}</li>
          <li><strong>Hora:</strong> ${data.appointmentTime}</li>
        </ul>
      `,
    }),
    "appointment-reminder-2h": () => ({
      subject: "Recordatorio: Tu cita es en 2 horas",
      body: `
        <h2>Recordatorio Urgente</h2>
        <p>Hola ${data.recipientName},</p>
        <p>Tu cita es en 2 horas:</p>
        <ul>
          <li><strong>Servicio:</strong> ${data.service}</li>
          <li><strong>Hora:</strong> ${data.appointmentTime}</li>
        </ul>
      `,
    }),
    "appointment-cancellation": () => ({
      subject: "Tu Cita ha sido Cancelada",
      body: `
        <h2>Cita Cancelada</h2>
        <p>Hola ${data.recipientName},</p>
        <p>Tu cita ha sido cancelada:</p>
        <p><strong>Fecha:</strong> ${data.appointmentDate} a las ${data.appointmentTime}</p>
        <p>Si deseas reservar otra cita, visita nuestra plataforma.</p>
      `,
    }),
    "appointment-rescheduled": () => ({
      subject: "Tu Cita ha sido Reprogramada",
      body: `
        <h2>Cita Reprogramada</h2>
        <p>Hola ${data.recipientName},</p>
        <p>Tu cita ha sido reprogramada para:</p>
        <ul>
          <li><strong>Fecha:</strong> ${data.appointmentDate}</li>
          <li><strong>Hora:</strong> ${data.appointmentTime}</li>
        </ul>
      `,
    }),
    "password-reset": () => ({
      subject: "Restablecer tu Contraseña",
      body: `
        <h2>Restablecer Contraseña</h2>
        <p>Hola ${data.recipientName},</p>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el enlace a continuación para continuar:</p>
        <a href="https://salonpro.example.com/reset-password">Restablecer Contraseña</a>
      `,
    }),
  }

  const template = emailTemplates[type]
  const { subject, body } = template(data)

  console.log(`[EMAIL] Sending ${type} to ${data.recipientEmail}`)
  console.log(`Subject: ${subject}`)
  console.log(`Body: ${body}`)

  // Integration point for actual email service
  // Example: await sendgrid.send({ to, subject, html: body })
  // Example: await resend.emails.send({ to, subject, html: body })

  return { success: true, messageId: `msg-${Date.now()}` }
}

export async function scheduleReminderEmails(appointmentId: number, appointmentDate: Date) {
  // TODO: Implement scheduled email sending (24h and 2h before appointment)
  // This would use a job queue like Bull, Agenda, or a CRON service

  const now = new Date()
  const timeTo24hReminder = appointmentDate.getTime() - now.getTime() - 24 * 60 * 60 * 1000
  const timeTo2hReminder = appointmentDate.getTime() - now.getTime() - 2 * 60 * 60 * 1000

  console.log(`[SCHEDULER] Scheduled 24h reminder for appointment ${appointmentId}`)
  console.log(`[SCHEDULER] Scheduled 2h reminder for appointment ${appointmentId}`)

  return { success: true }
}
