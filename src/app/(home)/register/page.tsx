import { RegisterUsers } from '@/components/users/register-users'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Registro de usuários',
}

export default async function RegisterPage() {
  return (
    <Suspense>
      <RegisterUsers />
    </Suspense>
  )
}
