import { Text } from '@camposweb-ignite-ui/react'
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
  base: ['font-medium capitalize'],
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
  base: ['w-full font-roboto border-spacing-1 table-fixed mt-6'],
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
    'focus:shadow-inherit',
    'disabled:bg-none disabled:cursor-default disabled:opacity-5 disabled:text-white',
    'hover:bg-gray500 transition',
    'data-[active=true]:bg-gray500',
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
