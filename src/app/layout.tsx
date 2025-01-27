import '../lib/dayjs'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import '@camposweb-ignite-ui/react/dist/index.css'
import Authprovider from './AuthProvider'
import ReactQueryProvider from './ReactQueryProvider'
import { Analytics } from '@vercel/analytics/next'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: ' %s | Ignite Call',
    default: 'Ignite Call | Sistema de agendamento',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} bg-gray900 text-gray100 antialiased`}
      >
        <ReactQueryProvider>
          <Authprovider>{children}</Authprovider>
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
