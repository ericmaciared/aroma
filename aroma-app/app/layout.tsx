import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Aroma — Descubrimiento de Fragancias',
  description: 'Recomendaciones de perfumes con IA adaptadas a ti',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased bg-bg text-fg`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
