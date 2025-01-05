import { RegisterUsers } from '@/components/users/register-users'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Crie uma conta',
}

export default async function RegisterPage() {
  return (
    <Suspense>
      <RegisterUsers />
    </Suspense>
  )
}
