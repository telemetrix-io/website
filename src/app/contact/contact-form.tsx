'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, LoaderCircle, Mail, TriangleAlert } from 'lucide-react';
import { topics, type TopicValue } from '@/lib/content';

type State =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; email: string }
  | { kind: 'error'; mailto: string; reason: 'not_configured' | 'invalid' | 'rate_limited' | 'failed'; message?: string };

const field =
  'w-full rounded-lg border border-line bg-sunken px-3.5 py-2.5 text-[0.9375rem] text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-cyan/60 focus:ring-2 focus:ring-cyan/20';
const label = 'mb-1.5 block text-sm font-medium text-fg';

function mailtoFor(to: string, data: Record<string, string>) {
  const topic = topics.find((t) => t.value === data.topic)?.label ?? 'Telemetrix';
  const body = [data.message, '', data.car ? `Car: ${data.car}` : '', `From: ${data.name}`].filter(Boolean).join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(`[${topic}] ${data.name}`)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ initialTopic, email }: { initialTopic: TopicValue; email: string }) {
  const [state, setState] = useState<State>({ kind: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setState({ kind: 'sent', email: data.email });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
      const reason =
        body.error === 'not_configured' || body.error === 'invalid' || body.error === 'rate_limited' ? body.error : 'failed';
      setState({ kind: 'error', reason, message: body.message, mailto: mailtoFor(email, data) });
    } catch {
      setState({ kind: 'error', reason: 'failed', mailto: mailtoFor(email, data) });
    }
  }

  if (state.kind === 'sent') {
    return (
      <div className="flex flex-col items-center py-14 text-center" role="status">
        <span className="inline-flex size-14 items-center justify-center rounded-full border border-ok/40 bg-ok/10 text-ok">
          <Check size={26} aria-hidden />
        </span>
        <h2 className="mt-5 text-xl font-semibold">Message sent</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
          Thanks for getting in touch. We’ll reply to <span className="text-fg">{state.email}</span>.
        </p>
        <button type="button" className="btn btn-ghost mt-7" onClick={() => setState({ kind: 'idle' })}>
          Send another
        </button>
      </div>
    );
  }

  const sending = state.kind === 'sending';

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Send us a message</h2>
        <p className="mt-1 text-sm text-fg-muted">Fields marked * are required.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name *
          </label>
          <input id="name" name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={field}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="topic" className={label}>
            Topic
          </label>
          <select id="topic" name="topic" defaultValue={initialTopic} className={`${field} appearance-none bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-10`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237d8896' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="car" className={label}>
            Your car <span className="font-normal text-fg-subtle">(optional)</span>
          </label>
          <input id="car" name="car" maxLength={120} className={field} placeholder="e.g. BMW M2 G87, 2024" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={`${field} min-h-36 resize-y`}
          placeholder="How can we help?"
        />
      </div>

      {/* Spam trap: hidden from people, filled in by bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.kind === 'error' && (
        <div role="alert" className="flex gap-3 rounded-lg border border-warn/30 bg-warn/[0.06] p-4 text-sm">
          <TriangleAlert size={18} className="mt-0.5 shrink-0 text-warn" aria-hidden />
          <div className="leading-relaxed text-fg-muted">
            <p className="font-medium text-fg">
              {state.reason === 'invalid'
                ? state.message ?? 'Please check the form.'
                : state.reason === 'rate_limited'
                  ? 'Too many messages in a short time.'
                  : 'The form can’t send right now.'}
            </p>
            {state.reason !== 'invalid' && (
              <p className="mt-1">
                Your message is still here.{' '}
                <a href={state.mailto} className="inline-flex items-center gap-1 text-cyan underline-offset-4 hover:underline">
                  <Mail size={14} aria-hidden />
                  Send it by email instead
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-fg-subtle">We use your details only to reply to you.</p>
        <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-70">
          {sending ? (
            <>
              <LoaderCircle size={17} className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight size={17} aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
