import type { Metadata } from 'next';
import { Tajawal, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Volaille & Feu - Concept Gastronomique Volaille au Feu de Bois',
  description:
    'Contemporary wood-fired poultry restaurant, takeaway, and direct-ordering experience concept in Salé, Morocco. Independent portfolio concept.',
  openGraph: {
    title: 'Volaille & Feu - Concept Gastronomique Volaille au Feu de Bois',
    description:
      'Contemporary wood-fired poultry restaurant, takeaway, and direct-ordering experience concept in Salé, Morocco. Independent portfolio concept.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Volaille & Feu - Concept Gastronomique Volaille au Feu de Bois',
    description:
      'Contemporary wood-fired poultry restaurant, takeaway, and direct-ordering experience concept in Salé, Morocco. Independent portfolio concept.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`dark ${tajawal.variable} ${plusJakarta.variable}`}>
      <body suppressHydrationWarning className="bg-[#0d0d10] text-zinc-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
