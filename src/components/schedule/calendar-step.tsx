'use client'
import { useState } from 'react'
import { Calendar } from '../calendar'
import { ScheduleContainer } from './components/schedule-container'
import { TimePicker } from './components/time-picker'
import { TimePickerHeader } from './components/time-picker-header'
import { TimePickerItem } from './components/time-picker-item'
import { TimePickerList } from './components/time-picker-list'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { env } from '@/lib/env'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

interface Availability {
  possibleTimes: number[]
  blockedDates: Date[]
  availableTimes: number[]
}

export function CalendarStep() {
  const params = useParams<{ username: string }>()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  /* const [availability, setAvailability] = useState<Availability | null>(null) */
  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describeDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(
        `${env.NEXT_PUBLIC_BASE_URL}/schedule/${params.username}/availability`,
        {
          params: {
            date: selectedDateWithoutTime,
          },
        },
      )
      return response.data
    },
    enabled: !!selectedDate,
  })

  return (
    <ScheduleContainer isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span className="text-gray200">{describeDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </ScheduleContainer>
  )
}
