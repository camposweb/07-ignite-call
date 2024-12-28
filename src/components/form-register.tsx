import { Box } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const formRegister = tv({
  base: ['mt-6 flex flex-col gap-4'],
})

type FormRegisterType = ComponentProps<typeof Box> &
  VariantProps<typeof formRegister>

export const Form = ({ className, ...props }: FormRegisterType) => {
  return <Box as="form" className={formRegister({ className })} {...props} />
}
