import { Box } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const formActions = tv({
  base: ['flex flex-row justify-end border-none gap-2 p-0'],
})

type FormActionsType = ComponentProps<'div'> & VariantProps<typeof formActions>

export const FormActions = ({ className, ...props }: FormActionsType) => {
  return <Box {...props} className={formActions({ className })} />
}
