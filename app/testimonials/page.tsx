import PageIntro from '@/components/site/PageIntro';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Testimonials',
    description:
        'Client testimonials and reviews about the work of Md Mehedi Hasan, a full-stack developer.',
    alternates: {
        canonical: '/testimonials',
    },
};

export default function TestimonialsPage() {
 return <main className="page-shell"><PageIntro eyebrow="People & collaboration" title="Professional references." description="Good work starts with good collaboration." /><section className="reference-panel"><p className="eyebrow">Available on request</p><h2>Hear from the people I’ve worked with.</h2><p>I only publish names and feedback with permission. Get in touch and I can provide a relevant professional reference.</p><a className="button-primary" href="mailto:contact@mehedih.com?subject=Professional%20reference%20request">Request a reference <span aria-hidden="true">↗</span></a></section></main>;
}
