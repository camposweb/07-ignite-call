import { Box } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const confirmForm = tv({
  base: ['flex flex-col gap-4 max-w-[540px] m-auto mt-6'],
})

type ConfirmFormType = ComponentProps<typeof Box> &
  VariantProps<typeof confirmForm>

export const ConfirmForm = ({ className, ...props }: ConfirmFormType) => {
  return <Box {...props} className={confirmForm({ className })} />
}
