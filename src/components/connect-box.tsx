import { Box } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const connectBox = tv({
  base: ['mt-6 flex flex-col'],
})

type ConnectBoxType = ComponentProps<typeof Box> &
  VariantProps<typeof connectBox>

export const ConnectBox = ({ className, ...props }: ConnectBoxType) => {
  return <Box {...props} className={connectBox({ className })} />
}
