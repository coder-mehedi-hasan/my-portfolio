import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with Md Mehedi Hasan, a full-stack developer available for freelance work and new opportunities.',
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
