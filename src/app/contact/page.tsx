import type { Metadata } from 'next';
import { BookOpen, Briefcase, Mail } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { topics, type TopicValue } from '@/lib/content';
import { docs, site } from '@/lib/site';
import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Licences, early access, workshops or a question about your car: send the Telemetrix team a note.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const initialTopic: TopicValue = topics.some((t) => t.value === topic) ? (topic as TopicValue) : 'licence';

  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us">
        Licences, early access, workshops, or a question about your car. Send a note and we’ll reply by email.
      </PageHero>

      <section className="container-x mb-24 mt-14 grid gap-4 sm:mb-32 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="panel p-6 sm:p-9">
          <ContactForm initialTopic={initialTopic} email={site.contactEmail} />
        </Reveal>

        <div className="grid content-start gap-4">
          <Reveal delay={60}>
            <a href={`mailto:${site.contactEmail}`} className="panel group flex items-center gap-4 p-5 transition-colors hover:border-line-strong">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan">
                <Mail size={19} aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-fg-subtle">Email</span>
                <span className="block font-medium text-fg">{site.contactEmail}</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <a href={docs()} className="panel group flex items-start gap-4 p-5 transition-colors hover:border-line-strong">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface-3 text-fg">
                <BookOpen size={19} aria-hidden />
              </span>
              <span>
                <span className="block font-medium text-fg">Already using Telemetrix?</span>
                <span className="mt-1 block text-sm leading-relaxed text-fg-muted">
                  The docs cover setup, every screen, and fixes for common errors.
                </span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={180} className="panel flex items-start gap-4 p-5">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface-3 text-fg">
              <Briefcase size={19} aria-hidden />
            </span>
            <span>
              <span className="block font-medium text-fg">Workshops and fleets</span>
              <span className="mt-1 block text-sm leading-relaxed text-fg-muted">
                Need Telemetrix on several computers? Pick “Workshops and fleets” in the form and tell us how many.
              </span>
            </span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
