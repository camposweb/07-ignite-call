import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const timePickerList = tv({ base: ['mt-3 grid grid-cols-1 gap-2'] })

type TimePickerListType = ComponentProps<'div'> &
  VariantProps<typeof timePickerList>

export const TimePickerList = ({ className, ...props }: TimePickerListType) => {
  return <div {...props} className={timePickerList({ className })} />
}
