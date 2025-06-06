import Providers from '@/src/app/providers/providers';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Filmlingo – Фильмы в оригинале с умными субтитрами',
  description:
    'Смотри фильмы на английском и других языках с интерактивными субтитрами и мгновенным переводом с помощью ChatGPT.',
  keywords: [
    'Filmlingo',
    'фильмы в оригинале',
    'умные субтитры',
    'перевод субтитров',
    'изучение английского',
    'ChatGPT для фильмов',
    'английский по фильмам',
    'интерактивные субтитры',
  ],
  metadataBase: new URL('https://filmlingo.ru'),
  openGraph: {
    title: 'Filmlingo – Смотри фильмы в оригинале с умными субтитрами',
    description:
      'Улучшай английский с помощью фильмов и интерактивных субтитров, переведённых с помощью ChatGPT.',
    url: 'https://filmlingo.ru',
    siteName: 'Filmlingo',
    images: [
      {
        url: 'https://filmlingo.ru/og-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'Filmlingo – фильмы с умными субтитрами',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Filmlingo – фильмы с умными субтитрами',
    description:
      'Смотри фильмы на английском языке и улучшай навыки с помощью ChatGPT.',
    images: ['https://filmlingo.ru/og-image.png?v=2'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={`${roboto.className} antialiased bg-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
