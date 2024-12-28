'use client'
import { FormError } from '@/components/form-error'
import { Form } from '@/components/form-register'
import { Header } from '@/components/header'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@camposweb-ignite-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

export default function RegisterPage() {
  const searchParams = useSearchParams()

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
      setValue('username', searchParams.get('username')!)
    }
  }, [searchParams, setValue])

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
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
