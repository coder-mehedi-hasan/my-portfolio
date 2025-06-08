import Header from '@/components/home/Header';
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

export const metadata = {
  title: 'Md Mehedi Hasan | Portfolio | coder-mehedi-hasan',
  description: 'Full-stack developer portfolio',
  metadataBase: new URL('https://mehedi-info.vercel.app'),
  openGraph: {
    title: 'Md Mehedi Hasan | Portfolio',
    description: 'Full-stack developer portfolio',
    url: 'https://mehedi-info.vercel.app',
    siteName: 'Mehedi Portfolio',
    images: [
      {
        url: '/og-img.png',
        width: 1200,
        height: 630,
        alt: 'Md Mehedi Hasan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Mehedi Hasan | Portfolio',
    description: 'Full-stack developer portfolio',
    images: ['/og-img.png'],
    creator: '@yourTwitterHandle',
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${noto.variable}`}>
      <body>
        <div className="sticky top-0 z-50 bg-white">
          <Header />
        </div>
        {/* <Header></Header> */}
        {children}
      </body>
    </html>
  );
}
