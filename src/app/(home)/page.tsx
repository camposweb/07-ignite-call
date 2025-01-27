import { Heading, Text } from '@camposweb-ignite-ui/react'
import Image from 'next/image'
import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from '@/components/claim-username-form'
import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Descomplique sua agenda',
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.',
}

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    redirect(`/schedule/${session.user.username}/`)
  }

  return (
    <div className="flex h-screen items-center justify-center gap-20">
      <div className="px-10 md:max-w-[485px]">
        <Heading as="h1" className="font-roboto text-4xl font-bold">
          Agendamento descomplicado
        </Heading>
        <Text size="lg" className="mt-2 font-roboto text-lg text-gray200">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </div>
      <div className="hidden overflow-hidden pr-8 md:block">
        <Image
          src={previewImage}
          alt="Calendário simbolizando aplicação em funcionamento"
          height={400}
          quality={100}
          priority
        />
      </div>
    </div>
  )
}
