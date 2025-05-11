import type { Metadata } from "next";
import { Quicksand, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { MainWindow } from "./components/main/MainWindow";
import { AppProvider } from "./components/provider/AppProvider";
import GridBackground from "./components/gridBackground";


const bebasNuen = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas'
})


const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
});


export const metadata: Metadata = {
  title: "NOTE",
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




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ru">
      <body
        className={`${quicksand.variable} ${bebasNuen.variable}`} 
        style={{fontFamily: 'var(--font-quicksand)'}}
      >  
        <GridBackground/>
        <AppProvider className="m-auto sm:p-3 overflow-hidden h-screen border">
          <div className={`container m-auto relative h-full border`}>
            <MainWindow>
              {children}
            </MainWindow>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
