import Link from 'next/link';
import { profileLinks } from '@/lib/profile';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-profile">
        <Link href="/" className="footer-name">Mehedi Hasan</Link>
        <p>Software engineer building thoughtful web, mobile, and platform products from Dhaka, Bangladesh.</p>
        <Link href="/contact" className="footer-cta">Let’s work together <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="footer-groups">
        <nav aria-label="Explore">
          <p>Explore</p>
          <Link href="/projects">Work</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/blogs">Writing</Link>
        </nav>
        <nav aria-label="Connect">
          <p>Connect</p>
          <a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href={profileLinks.email}>Email <span aria-hidden="true">↗</span></a>
          <a href={profileLinks.resume} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mehedi Hasan</span>
        <span>Designed and built with care.</span>
      </div>
    </footer>
  );
}
