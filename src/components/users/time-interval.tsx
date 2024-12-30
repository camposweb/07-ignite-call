'use client'
import {
  Button,
  CheckBox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@camposweb-ignite-ui/react'
import { Header } from '../header'
import { IntervalBox } from '../interval-box'
import { IntervalContainer } from '../interval-container'
import { IntervalItem } from '../interval-item'
import { IntervalDay } from '../interval-day'
import { IntervalInputs } from '../interval-inputs'
import { ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getWeeksDays } from '@/utils/get-weeks-days'

const timeIntervalFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine(
      (intervals) => intervals.length > 0,
      'Você precisa selecionar pelo menos um dia da semana.',
    ),
  /* .transform((intervals) =>
      intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      }),
    ), */
})

type TimeIntervalFormData = z.infer<typeof timeIntervalFormSchema>

export function TimeInterval() {
  const { register, handleSubmit, control, watch } =
    useForm<TimeIntervalFormData>({
      resolver: zodResolver(timeIntervalFormSchema),
      defaultValues: {
        intervals: [
          { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
          { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
        ],
      },
    })

  const weeksDays = getWeeksDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  async function handleSetTimeInterval() {}

  return (
    <div className="m-auto mt-20 max-w-xl px-4 py-0">
      <Header className="">
        <Heading as="strong">Quase lá</Heading>
        <Text className="mb-6 text-gray200">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeInterval)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => (
                      <CheckBox
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        checked={field.value}
                      />
                    )}
                  />
                  <Text>{weeksDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>
        <Button type="submit" className="mt-4" /* disabled={isSubmitting} */>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </div>
  )
}