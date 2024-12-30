import { TimeInterval } from '@/components/users/time-interval'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Conectando ao calendário Google',
}

export default async function PageTimeInterval() {
  return (
    <Suspense>
      <TimeInterval />
    </Suspense>
  )
}
