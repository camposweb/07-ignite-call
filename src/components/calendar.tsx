import { getWeekDays } from '@/utils/get-week-days'
import { Text } from '@camposweb-ignite-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const calendarContainer = tv({
  base: ['flex flex-col gap 6 p-6'],
})

type CalendarContainerType = ComponentProps<'div'> &
  VariantProps<typeof calendarContainer>

export const CalendarContainer = ({
  className,
  ...props
}: CalendarContainerType) => {
  return (
    <div
      {...props}
      className={calendarContainer({
        className,
      })}
    />
  )
}

const calendarHeader = tv({
  base: ['flex items-center justify-between'],
})

type CalendarHeaderType = ComponentProps<'div'> &
  VariantProps<typeof calendarHeader>

export const CalendarHeader = ({ className, ...props }: CalendarHeaderType) => {
  return (
    <div
      {...props}
      className={calendarHeader({
        className,
      })}
    />
  )
}

const calendarTitle = tv({
  base: ['font-medium'],
})

type CalendarTitleType = ComponentProps<typeof Text> &
  VariantProps<typeof calendarTitle>

export const CalendarTitle = ({ className, ...props }: CalendarTitleType) => {
  return (
    <Text
      {...props}
      className={calendarTitle({
        className,
      })}
    />
  )
}

const calendarActions = tv({
  base: ['flex gap-2 text-gray200'],
})

type CalendarActionsType = ComponentProps<'div'> &
  VariantProps<typeof calendarActions>

export const CalendarActions = ({
  className,
  ...props
}: CalendarActionsType) => {
  return (
    <div
      {...props}
      className={calendarActions({
        className,
      })}
    />
  )
}

const calendarBody = tv({
  base: ['w-full font-roboto border-spacing-1 table-fixed'],
})

type CalendarBodyType = ComponentProps<'table'> &
  VariantProps<typeof calendarBody>

export const CalendarBody = ({ className, ...props }: CalendarBodyType) => {
  return (
    <table
      {...props}
      className={calendarBody({
        className,
      })}
    />
  )
}

const calendarDay = tv({
  base: [
    'w-full aspect-square bg-gray600 text-center cursor-pointer rounded-sm text-white',
    'focus:shadow-none focus:shadow-gray100',
    'disabled:bg-none disabled:cursor-default disabled:opacity-5',
    'hover:bg-gray500',
  ],
})

type CalendarDayType = ComponentProps<'button'> &
  VariantProps<typeof calendarDay>

export const CalendarDay = ({ className, ...props }: CalendarDayType) => {
  return (
    <button
      {...props}
      className={calendarDay({
        className,
      })}
    />
  )
}

export const Calendar = () => {
  const shortWeekDays = getWeekDays({ short: true })
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Dezembro <span className="text-gray200">2022</span>
        </CalendarTitle>
        <CalendarActions>
          <button className="leading-0 cursor-pointer rounded-sm hover:text-gray100 focus:shadow-inner focus:shadow-gray100">
            <ChevronLeft />
          </button>
          <button>
            <ChevronRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((day) => (
              <th key={day} className="text-sm font-medium text-gray200">
                {day}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="leading-3 text-gray800 before:block before:content-['\\00A0']">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
              {/* <CalendarDay disabled>2</CalendarDay> */}
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
