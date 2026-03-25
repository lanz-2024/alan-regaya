'use client';
import { useState, useRef } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    formData.set('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '');
    formData.set('subject', 'New contact from alanregaya.dev');
    formData.set('from_name', 'Portfolio Contact Form');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        formRef.current?.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputClass = 'w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors';
  const labelClass = 'block text-sm text-[var(--color-text-muted)] mb-1.5';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {/* Honeypot — bots fill this, humans don't */}
      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} />

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
            className={inputClass}
          />
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
            className={inputClass}
          />
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
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="w-full sm:w-auto px-8 py-3 bg-[var(--color-accent)] text-white rounded font-medium hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent ✓' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="mt-4 text-sm text-green-400" role="status">
          Message sent — I&apos;ll get back to you within 1–2 business days.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          Something went wrong. Please try again or email me directly at{' '}
          <a href="mailto:nalayager@gmail.com" className="underline">nalayager@gmail.com</a>.
        </p>
      )}
    </form>
  );
}
