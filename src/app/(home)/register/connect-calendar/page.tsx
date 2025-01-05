import { ConnectCalendar } from '@/components/users/connect-calendar'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Conecte sua agenda do Google',
  robots: {
    index: false,
  },
}

export default async function PageConnectCalendar() {
  return (
    <Suspense>
      <ConnectCalendar />
    </Suspense>
  )
}
