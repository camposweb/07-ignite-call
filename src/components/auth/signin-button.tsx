'use client'
import { signIn } from '@/lib/auth'
import { Button } from '@camposweb-ignite-ui/react'
import { ArrowRight } from 'lucide-react'

export default function SignIn() {
  return (
    <Button variant="secundary" size="sm" onClick={() => signIn('google')}>
      Conectar <ArrowRight />
    </Button>
  )
}
