'use client'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@camposweb-ignite-ui/react'
import { Header } from '../header'
import { Form } from '../form-register'
import { FormError } from '../form-error'
import { ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O suário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/, {
      message: 'O usuário pode ter apenas letras minúsculas e hífens',
    }),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function RegisterUsers() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  useEffect(() => {
    if (searchParams.has('username')) {
      setValue('username', searchParams.get('username') || '')
    }
  }, [searchParams, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/register-users', {
        name: data.name,
        username: data.username,
      })
      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }

      console.error(err)
    }
  }
  return (
    <div className="m-auto mt-20 max-w-xl px-4 py-0">
      <Header className="">
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text className="mb-6 text-gray200">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form onSubmit={handleSubmit(handleRegister)}>
        <label className="flex flex-col gap-2">
          <Text size="sm">Nome do usuário</Text>
          <TextInput
            prefix="iginite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>
        <Button type="submit" className="mt-4" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </div>
  )
}
