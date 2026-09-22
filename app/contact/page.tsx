'use client';

import { FormEvent, useState } from 'react';
import PageIntro from '@/components/site/PageIntro';

export default function ContactPage() {
  const [status, setStatus] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
    window.location.href = `mailto:contact@mehedih.com?subject=${subject}&body=${body}`;
    setStatus(true);
  }
  return <main className="page-shell"><PageIntro eyebrow="Start a conversation" title="Let’s build something useful." description="Have a project in mind, an opportunity to share, or a question about my work? I’d love to hear from you." /><div className="contact-grid"><aside><h2>A direct line.</h2><p>Tell me what you’re working on and how I can help.</p><a className="text-link" href="mailto:contact@mehedih.com">contact@mehedih.com ↗</a><p className="contact-note">Prefer email? You can write to me directly, or use the form to prepare a draft.</p></aside><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><div><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="How should I address you?" required /></div><div><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div></div><div><label htmlFor="message">What do you have in mind?</label><textarea id="message" name="message" rows={6} placeholder="A little about your project, timeline, or question…" required /></div><div><button className="button-primary" type="submit">Prepare email <span aria-hidden="true">↗</span></button><p className="form-hint">Opens your email app. You can review the draft before sending.</p></div>{status && <p role="status" className="form-status">Your email app was requested. If it didn’t open, email contact@mehedih.com directly.</p>}</form></div></main>;
}
