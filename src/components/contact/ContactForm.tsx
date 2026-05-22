'use client';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/data/site-config';

type Status = 'idle' | 'sending' | 'success' | 'error';

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? siteConfig.email;

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve) => existing.addEventListener('load', () => resolve(), { once: true }));
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = TURNSTILE_SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load Turnstile'));
    document.head.appendChild(s);
  });
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

  useEffect(() => {
    if (!siteKey || !widgetContainerRef.current) return;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile || !widgetContainerRef.current) return;
        widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
          sitekey: siteKey,
          theme: 'dark',
          callback: (token) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          'error-callback': () => setTurnstileToken(''),
        });
      })
      .catch(() => {
        /* swallow — form will surface "verification required" on submit */
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  function validate(formData: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = (formData.get('name') as string ?? '').trim();
    const email = (formData.get('email') as string ?? '').trim();
    const message = (formData.get('message') as string ?? '').trim();

    if (!name) errs.name = 'Name is required.';
    if (!email) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!message) errs.message = 'Message is required.';
    if (siteKey && !turnstileToken) errs.captcha = 'Please complete the verification.';

    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('sending');

    const payload = {
      name: (formData.get('name') as string ?? '').trim(),
      email: (formData.get('email') as string ?? '').trim(),
      topic: (formData.get('topic') as string ?? '').trim() || 'General enquiry',
      message: (formData.get('message') as string ?? '').trim(),
      botcheck: formData.get('botcheck') ? true : false,
      turnstileToken,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        formRef.current?.reset();
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
        setTurnstileToken('');
      } else {
        setStatus('error');
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
        setTurnstileToken('');
      }
    } catch {
      setStatus('error');
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setTurnstileToken('');
    }
  }

  const inputClass = 'w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors';
  const labelClass = 'block text-sm text-[var(--color-text-muted)] mb-1.5';

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* Honeypot — bots fill this, humans don't */}
      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} aria-label="Do not fill" />

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1 text-xs text-red-400" role="alert">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="your@email.com"
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1 text-xs text-red-400" role="alert">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="contact-topic" className={labelClass}>Topic</label>
        <select
          id="contact-topic"
          name="topic"
          className={inputClass}
        >
          <option value="Job opportunity">Job opportunity</option>
          <option value="Freelance project">Freelance project</option>
          <option value="Open source collaboration">Open source collaboration</option>
          <option value="General enquiry">General enquiry</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about the project or opportunity…"
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-xs text-red-400" role="alert">{errors.message}</p>
        )}
      </div>

      {siteKey && (
        <div className="mb-6">
          <div ref={widgetContainerRef} aria-label="Cloudflare Turnstile verification" />
          {errors.captcha && (
            <p className="mt-2 text-xs text-red-400" role="alert">{errors.captcha}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="w-full sm:w-auto px-8 py-3 bg-[var(--color-accent)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent ✓' : 'Send Message'}
      </button>

      <p className="mt-4 text-xs text-[var(--color-text-muted)]">
        Your message is delivered directly to my inbox. You&apos;ll receive an automated confirmation. No data is stored.
      </p>

      {status === 'success' && (
        <p className="mt-4 text-sm text-green-400" role="status">
          Message sent — I&apos;ll get back to you within 1–2 business days.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          Something went wrong. Please try again or email me directly at{' '}
          <a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a>.
        </p>
      )}
    </form>
  );
}
