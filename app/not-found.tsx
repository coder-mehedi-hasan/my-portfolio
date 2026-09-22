import Link from 'next/link';
import PageIntro from '@/components/site/PageIntro';

export default function NotFound() {
  return (
    <main className="page-shell">
      <PageIntro eyebrow="404 / Page not found" title="A little off the path." description="This page may have moved, or the link may be incorrect. Head back to explore my work." />
      <Link href="/" className="button-primary">Back to home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
