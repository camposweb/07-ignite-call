import { Heading, Text } from '@camposweb-ignite-ui/react'
import Image from 'next/image'
import previewImage from '../../assets/app-preview.png'

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center gap-20">
      <div className="px-10 md:max-w-[480px]">
        <Heading as="h1" className="font-roboto text-7xl font-bold">
          Agendamento descomplicado
        </Heading>
        <Text size="lg" className="mt-2 font-roboto text-lg text-gray200">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
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
