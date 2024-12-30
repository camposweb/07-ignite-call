import { ConnectCalendar } from '@/components/users/connect-calendar'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Conectando ao calendário Google',
}

export default async function PageConnectCalendar() {
  return (
    <Suspense>
      <ConnectCalendar />
    </Suspense>
  )
}
