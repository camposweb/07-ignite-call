import { Text } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const timePickerHeader = tv({
  base: ['font-medium font-roboto capitalize'],
})

type TimePickerHeaderType = ComponentProps<typeof Text> &
  VariantProps<typeof timePickerHeader>

export const TimePickerHeader = ({
  className,
  ...props
}: TimePickerHeaderType) => {
  return <div {...props} className={timePickerHeader({ className })} />
}
