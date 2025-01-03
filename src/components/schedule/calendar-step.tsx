'use client'
import { useState } from 'react'
import { Calendar } from '../calendar'
import { ScheduleContainer } from './components/schedule-container'
import { TimePicker } from './components/time-picker'
import { TimePickerHeader } from './components/time-picker-header'
import { TimePickerItem } from './components/time-picker-item'
import { TimePickerList } from './components/time-picker-list'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate
  return (
    <ScheduleContainer isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            Terça-feira <span className="text-gray200">20 de setembro</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem>08:00</TimePickerItem>
            <TimePickerItem>09:00</TimePickerItem>
            <TimePickerItem>10:00</TimePickerItem>
            <TimePickerItem>11:00</TimePickerItem>
            <TimePickerItem>12:00</TimePickerItem>
            <TimePickerItem>13:00</TimePickerItem>
            <TimePickerItem>14:00</TimePickerItem>
            <TimePickerItem>15:00</TimePickerItem>
            <TimePickerItem>16:00</TimePickerItem>
            <TimePickerItem>17:00</TimePickerItem>
            <TimePickerItem>18:00</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </ScheduleContainer>
  )
}
