import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const neueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/NeueMontreal-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/NeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/NeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/NeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-neue-montreal',
  display: 'swap',
})

const jhCaudemars = localFont({
  src: [
    {
      path: '../public/fonts/jhcaudemars-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/jhcaudemars-bolditalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-jh-caudemars',
  display: 'swap',
})

const nord = localFont({
  src: [
    {
      path: '../public/fonts/NORD-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/NORD-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
  ],
  variable: '--font-nord',
  display: 'swap',
})

const chreed = localFont({
  src: [
    {
      path: '../public/fonts/Chreed-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Chreed-Medium.otf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-chreed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Frederica Passos',
  description: 'Psiquiatria Contemporânea para Mentes que não Cabem em Rótulos.',
  icons: {
    icon: '/circleorange.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${neueMontreal.variable} ${jhCaudemars.variable} ${nord.variable} ${chreed.variable}`}>
        {children}
      </body>
    </html>
  )
}

