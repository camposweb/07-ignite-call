import { Box } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const formHeader = tv({
  base: ['flex flex-row items-center gap-4 pb-6 mb-2 border-none'],
})

type FormHeaderType = ComponentProps<'div'> & VariantProps<typeof formHeader>

export const FormHeader = ({ className, ...props }: FormHeaderType) => {
  return <Box {...props} className={formHeader({ className })} />
}
