'use client'
import { Box, Button, Text, TextInput } from '@camposweb-ignite-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormAnnotation } from './form-annotation'
import { useRouter } from 'next/navigation'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O suário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/, {
      message: 'O usuário pode ter apenas letras minúsculas e hífens',
    }),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handlePreRegister(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Box
        as={'form'}
        onSubmit={handleSubmit(handlePreRegister)}
        className="mt-4 grid grid-cols-1 grid-rows-2 items-center gap-2 p-4 md:grid-cols-2 md:grid-rows-none"
      >
        <TextInput
          prefix="ignite.com/"
          placeholder="seu-usuario"
          id="username"
          {...register('username')}
          className=""
        />
        <Button size="md" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Box>
      <FormAnnotation>
        <Text size="sm" className="text-gray400">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário'}
        </Text>
      </FormAnnotation>
    </>
  )
}
