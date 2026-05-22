import { Resend } from 'resend';
import { siteConfig } from '@/data/site-config';

export const dynamic = 'force-dynamic';

const FROM = process.env.CONTACT_FROM_EMAIL ?? `Alan Regaya <contact@alanregaya.dev>`;
const TO = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
const exposeErrors = process.env.VERCEL_ENV !== 'production';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Email service not configured.' }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const { name, email, topic, message, botcheck, turnstileToken } = (body ?? {}) as Record<string, unknown>;

  if (botcheck) {
    return Response.json({ success: true });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = typeof turnstileToken === 'string' ? turnstileToken : '';
    if (!token) {
      return Response.json({ error: 'Verification required.' }, { status: 400 });
    }
    try {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: turnstileSecret, response: token }),
      });
      const verify = (await verifyRes.json()) as { success?: boolean; 'error-codes'?: string[] };
      if (!verify.success) {
        console.error('[contact] turnstile verify failed:', verify['error-codes']);
        return Response.json(
          {
            error: 'Verification failed.',
            ...(exposeErrors && { detail: verify['error-codes'] }),
          },
          { status: 400 },
        );
      }
    } catch (err) {
      console.error('[contact] turnstile verify error:', err);
      return Response.json({ error: 'Verification error.' }, { status: 502 });
    }
  }

  const n = typeof name === 'string' ? name.trim() : '';
  const e = typeof email === 'string' ? email.trim() : '';
  const t = (typeof topic === 'string' && topic.trim()) || 'General enquiry';
  const m = typeof message === 'string' ? message.trim() : '';

  if (!n || !e || !m) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return Response.json({ error: 'Invalid email.' }, { status: 400 });
  }
  if (n.length > 200 || e.length > 200 || t.length > 200 || m.length > 5000) {
    return Response.json({ error: 'Field too long.' }, { status: 400 });
  }

  const nameSafe = escapeHtml(n);
  const emailSafe = escapeHtml(e);
  const topicSafe = escapeHtml(t);
  const messageSafe = escapeHtml(m).replace(/\n/g, '<br>');

  try {
    const notify = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: e,
      subject: `[Portfolio] ${t} — ${n}`,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.6">
  <h2 style="margin:0 0 12px">New portfolio enquiry</h2>
  <p><strong>From:</strong> ${nameSafe} &lt;${emailSafe}&gt;<br>
  <strong>Topic:</strong> ${topicSafe}</p>
  <hr style="border:none;border-top:1px solid #ddd;margin:16px 0">
  <p>${messageSafe}</p>
</div>`,
      text: `New portfolio enquiry\n\nFrom: ${n} <${e}>\nTopic: ${t}\n\n${m}`,
    });

    if (notify.error) {
      console.error('[contact] notify send failed:', notify.error);
      return Response.json(
        {
          error: 'Failed to send notification.',
          ...(exposeErrors && { detail: notify.error.name, message: notify.error.message }),
        },
        { status: 502 },
      );
    }

    await resend.emails.send({
      from: FROM,
      to: e,
      replyTo: TO,
      subject: `Thanks for reaching out — I'll get back to you soon`,
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;max-width:560px">
  <p>Hi ${nameSafe},</p>
  <p>Thanks for your message about <strong>${topicSafe}</strong>. I've received it and will reply within 1–2 business days.</p>
  <p>For reference, here's what you sent:</p>
  <blockquote style="border-left:3px solid #ddd;margin:12px 0;padding:4px 12px;color:#555">${messageSafe}</blockquote>
  <p>— Alan</p>
  <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
  <p style="font-size:12px;color:#888">This is an automated confirmation. Replies to this email go to ${TO}.</p>
</div>`,
      text: `Hi ${n},\n\nThanks for your message about "${t}". I've received it and will reply within 1–2 business days.\n\nFor reference, here's what you sent:\n\n${m}\n\n— Alan`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('[contact] unexpected send error:', err);
    return Response.json(
      {
        error: 'Failed to send.',
        ...(exposeErrors && err instanceof Error && { detail: err.name, message: err.message }),
      },
      { status: 502 },
    );
  }
}
