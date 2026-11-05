import { NextResponse } from 'next/server';
import { topics } from '@/lib/content';

/**
 * Contact form → email, through Resend's HTTP API (no SDK).
 *
 * Needs RESEND_API_KEY and CONTACT_TO_EMAIL (and optionally CONTACT_FROM_EMAIL, a sender on a domain verified in
 * Resend). Without them the route answers 503 `not_configured` and the form offers to send the message by email
 * instead, so nothing is ever silently dropped.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded on a long-running instance
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function invalid(message: string) {
  return NextResponse.json({ error: 'invalid', message }, { status: 400 });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return invalid('Please check the form.');
  }

  // Spam trap: pretend it worked.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const car = str(body.car);
  const message = str(body.message);
  const topic = topics.find((t) => t.value === str(body.topic)) ?? topics[topics.length - 1];

  if (!name || name.length > 100) return invalid('Please enter your name.');
  if (!EMAIL.test(email) || email.length > 200) return invalid('Please enter a valid email address.');
  if (car.length > 120) return invalid('Please shorten the car description.');
  if (message.length < 10) return invalid('Please write a little more in your message.');
  if (message.length > 5000) return invalid('Please keep your message under 5,000 characters.');

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const text = [
    `Topic: ${topic.label}`,
    `Name: ${name}`,
    `Email: ${email}`,
    car ? `Car: ${car}` : null,
    '',
    message,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Telemetrix website <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `[${topic.label}] ${name}`,
      text,
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error('contact: email provider rejected the message', res?.status);
    return NextResponse.json({ error: 'failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
