import { UpdateProfile } from '@/components/users/update-profile'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Atualize seu perfil',
  robots: {
    index: false,
  },
}

export default async function PageUpdateProfile() {
  return (
    <Suspense>
      <UpdateProfile />
    </Suspense>
  )
}
