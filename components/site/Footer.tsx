import Link from 'next/link';

export default function Footer() {
  return <footer className="site-footer"><Link href="/" className="font-medium">© {new Date().getFullYear()} Mehedi Hasan</Link><nav aria-label="Footer navigation"><Link href="/experience">Experience</Link><Link href="/skills">Skills</Link><Link href="/testimonials">References</Link><a href="mailto:contact@mehedih.com">Email ↗</a></nav></footer>;
}
