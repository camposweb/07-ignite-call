import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const userHeader = tv({
  base: ['flex flex-col items-center'],
})

type UserHeaderType = ComponentProps<'div'> & VariantProps<typeof userHeader>

export const UserHeader = ({ className, ...props }: UserHeaderType) => {
  return <div {...props} className={userHeader({ className })} />
}
