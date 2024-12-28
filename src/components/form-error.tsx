import { Text } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const formError = tv({
  base: ['text-[#f75a68]'],
})

type FormErrorType = ComponentProps<typeof Text> &
  VariantProps<typeof formError>

export const FormError = ({ className, ...props }: FormErrorType) => {
  return <Text {...props} className={formError({ className })} />
}
