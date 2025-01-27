'use client'
import { Button, Text, TextArea, TextInput } from '@camposweb-ignite-ui/react'
import { ConfirmForm } from './components/confirm-form'
import { FormHeader } from './components/form-header'
import { Calendar, Clock } from 'lucide-react'
import { FormActions } from './components/form-actions'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from '../form-error'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useParams } from 'next/navigation'

const confirmformSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmformSchema>

interface ConfirmStepProps {
  scheduleDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  scheduleDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const params = useParams<{ username: string }>()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmformSchema),
  })

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { email, name, observations } = data
    await api.post(`/schedule/${params.username}/schedule`, {
      name,
      email,
      observations,
      date: scheduleDate,
    })

    onCancelConfirmation()
  }

  const describeDate = dayjs(scheduleDate).format('DD [ de ] MMMM [ de ] YYYY')
  const describeTime = dayjs(scheduleDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <Calendar className="text-gray200" />
        </Text>
        <Text className="text-white">{describeDate}</Text>
        <Text>
          <Clock className="text-gray200" />
        </Text>
        <Text className="text-white">{describeTime}</Text>
      </FormHeader>
      <label className="flex flex-col gap-2 border-none">
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="seu nome" {...register('name')} />
        {errors && <FormError size="sm">{errors.name?.message}</FormError>}
      </label>

      <label className="flex flex-col gap-2">
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors && <FormError size="sm">{errors.email?.message}</FormError>}
      </label>
      <label className="flex flex-col gap-2">
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>
      <FormActions>
        <Button
          type="button"
          onClick={onCancelConfirmation}
          variant="tertiary"
          className="hover:border"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
