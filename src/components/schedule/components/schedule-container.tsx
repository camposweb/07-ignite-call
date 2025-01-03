import { Box } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const scheduleContainer = tv({
  base: ['relative m-auto mt-10 grid p-0 lg:max-w-[540px] font-roboto', ''],
  variants: {
    isTimePickerOpen: {
      true: 'lg:grid-cols-2 grid-rows-2 lg:grid-rows-subgrid lg:max-w-[820px]',
      false: '',
    },
  },
})

type ScheduleType = ComponentProps<typeof Box> &
  VariantProps<typeof scheduleContainer>

export const ScheduleContainer = ({
  className,
  isTimePickerOpen,
  ...props
}: ScheduleType) => {
  return (
    <Box
      {...props}
      className={scheduleContainer({ className, isTimePickerOpen })}
    />
  )
}
