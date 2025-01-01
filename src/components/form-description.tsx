import { Text } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const formDescription = tv({})

type FormDescriptionType = ComponentProps<typeof Text> &
  VariantProps<typeof formDescription>

export const FormDescription = ({
  className,
  ...props
}: FormDescriptionType) => {
  return <Text {...props} className={formDescription({ className })} />
}
