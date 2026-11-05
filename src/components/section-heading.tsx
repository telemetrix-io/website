import type { ReactNode } from 'react';
import { Reveal } from './reveal';

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = 'center',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: 'center' | 'left';
}) {
  const centered = align === 'center';
  return (
    <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[2.75rem]">{title}</h2>
      {children && <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{children}</p>}
    </Reveal>
  );
}
