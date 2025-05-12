import type { Viewport, Metadata } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000', // Для PWA
};
export const metadata: Metadata = {
  title: "Cube",
  description: "NOTE web-app",
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  icons: {
    icon: '/icon512_maskable.png',
    apple: '/icon512_rounded.png',
  },
  appleWebApp:{
    title: 'apple-mobile-web-app-status-bar-style',
    statusBarStyle: 'black-translucent',

  }
};
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className='w-full h-full relative'>{children}</div>
  );
}