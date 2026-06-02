import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({ region: 'us-east-1' })

export async function sendEmail({
  from,
  to,
  subject,
  html,
}: {
  from: string
  to: string | string[]
  subject: string
  html: string
}) {
  const toAddresses = Array.isArray(to) ? to : [to]
  await ses.send(
    new SendEmailCommand({
      Source: from,
      Destination: { ToAddresses: toAddresses },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: { Html: { Data: html, Charset: 'UTF-8' } },
      },
    }),
  )
}
