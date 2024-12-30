import { Box } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const intervalBox = tv({
  base: ['mt-6 flex flex-col'],
})

type IntervalNoxType = ComponentProps<typeof Box> &
  VariantProps<typeof intervalBox>

export const IntervalBox = ({ className, ...props }: IntervalNoxType) => {
  return (
    <Box
      {...props}
      className={intervalBox({
        className,
      })}
    />
  )
}
