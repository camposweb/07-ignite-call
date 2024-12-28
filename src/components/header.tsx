import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const header = tv({
  base: ['py-0 px-6'],
})

type HeaderType = ComponentProps<'div'> & VariantProps<typeof header>

export const Header = ({ className, ...props }: HeaderType) => {
  return <div {...props} className={header({ className })} />
}
