import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const timePickerItem = tv({
  base: [
    'border-0 bg-gray600 py-2 px-0 cursor-pointer text-gray100 rounded-sm text-sm leading-base last:mb-6',
    'disabled:bg-none disabled:cursor-default disabled:opacity-5',
    'hover:bg-gray500',
    'focus:shadow-inherit',
  ],
})

type TimePickerItemType = ComponentProps<'button'> &
  VariantProps<typeof timePickerItem>

export const TimePickerItem = ({ className, ...props }: TimePickerItemType) => {
  return <button {...props} className={timePickerItem({ className })} />
}
