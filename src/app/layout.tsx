import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '900'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Raio-X do Instagram — Troppa Digital',
  description:
    'Faça uma análise minuciosa do seu perfil, identifique os pontos fracos, crie um plano de ação e saiba exatamente o que fazer para ter um Instagram que vende.',
  openGraph: {
    title: 'Raio-X do Instagram — Troppa Digital',
    description: 'Diagnóstico gratuito do seu perfil em menos de 5 minutos.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-brand-black text-brand-cream font-body antialiased">
        {children}
      </body>
    </html>
  )
}
