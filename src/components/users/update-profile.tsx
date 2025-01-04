'use client'

import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@camposweb-ignite-ui/react'
import { Header } from '../header'
import { ProfileBox } from '../profile-box'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { FormDescription } from '../form-description'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export function UpdateProfile() {
  const session = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/update-profile', {
      bio: data.bio,
    })

    router.push(`/schedule/${session.data?.user?.username}`)
  }

  return (
    <div className="m-auto mt-20 max-w-xl px-4 py-0">
      <Header className="">
        <Heading as="strong">Defina sua disponibilidade</Heading>
        <Text className="mb-6 text-gray200">
          Por último, uma breve descrição e uma foto de perfil.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label className="flex flex-col gap-2">
          <Text size="sm">Foto de perfil</Text>
          <div className="flex flex-row items-center gap-5">
            <Avatar
              src={`${session.data?.user?.image}`}
              alt={`${session.data?.user?.name}`}
            />
            <Button variant="secundary" type="button" size="sm">
              Selecionar foto
            </Button>
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormDescription size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormDescription>
        </label>
        <Button type="submit" className="mt-4" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </div>
  )
}
