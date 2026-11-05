import Link from 'next/link';
import { PageHero } from '@/components/page-hero';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404 · No response" title="This page didn’t answer">
        Like a module that never replies: we looked, and there’s nothing at this address.
      </PageHero>
      <div className="container-x mb-32 mt-10 flex justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back to the home page
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Contact us
        </Link>
      </div>
    </>
  );
}
