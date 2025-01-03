import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const timerPicker = tv({
  base: ['border border-solid border-gray600 pt-6 px-6 overflow-y-auto'],
})

type TimerPickerType = ComponentProps<'div'> & VariantProps<typeof timerPicker>

export const TimePicker = ({ className, ...props }: TimerPickerType) => {
  return (
    <div
      {...props}
      className={timerPicker({
        className,
      })}
    />
  )
}
