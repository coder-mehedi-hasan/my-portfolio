import Footer from '@/components/site/Footer';
import Header from '@/components/home/Header';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter, Noto_Sans } from 'next/font/google';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const noto = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
});

const SITE_URL = 'https://mehedi-info.vercel.app';
const SITE_NAME = 'Md Mehedi Hasan Portfolio';
const DEFAULT_TITLE = 'Md Mehedi Hasan | Full-Stack Developer';
const DEFAULT_DESCRIPTION =
  'I am Md Mehedi Hasan, a full-stack developer building fast, scalable and user-friendly web applications with React, Node.js, Next.js and more. Explore my projects, experience and blogs.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'Md Mehedi Hasan',
    'Mehedi Hasan',
    'full-stack developer',
    'full stack developer',
    'web developer',
    'frontend developer',
    'backend developer',
    'React developer',
    'Node.js developer',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'portfolio',
    'software engineer',
  ],
  authors: [{ name: 'Md Mehedi Hasan' }],
  creator: 'Md Mehedi Hasan',
  publisher: 'Md Mehedi Hasan',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/md-mehedi-hasan-portfolio.jpg',
        width: 1599,
        height: 1599,
        alt: 'Md Mehedi Hasan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/md-mehedi-hasan-portfolio.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#111211',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Md Mehedi Hasan',
  url: SITE_URL,
  image: `${SITE_URL}/md-mehedi-hasan-portfolio.jpg`,
  jobTitle: 'Full-Stack Developer',
  sameAs: [],
  worksFor: {
    '@type': 'Organization',
    name: 'Self-Employed',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${noto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>
        <a href="#page-content" className="skip-link">Skip to content</a>
        <div id="page-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
