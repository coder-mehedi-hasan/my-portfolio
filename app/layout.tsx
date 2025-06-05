// src/app/layout.tsx
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
  title: 'Your Name | Portfolio',
  description: 'Full-stack developer portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${noto.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
