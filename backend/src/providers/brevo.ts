import { requireEnv, runtimeConfig } from '../config';

export type EmailJob = {
  to: string;
  subject: string;
  html: string;
  notificationId?: string;
};

export async function sendBrevoEmail(job: EmailJob) {
  const apiKey = requireEnv(runtimeConfig.brevoApiKey, 'BREVO_API_KEY');
  const senderEmail = requireEnv(runtimeConfig.emailFrom, 'EMAIL_FROM');

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: 'ConnectSphere',
        email: senderEmail,
      },
      replyTo: runtimeConfig.emailReplyTo ? { email: runtimeConfig.emailReplyTo } : undefined,
      to: [{ email: job.to }],
      subject: job.subject,
      htmlContent: job.html,
      headers: {
        'X-ConnectSphere-Notification-ID': job.notificationId ?? '',
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo email failed: ${response.status} ${detail}`);
  }

  return response.json().catch(() => ({ accepted: true }));
}
