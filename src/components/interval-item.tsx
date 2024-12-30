import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const intervalItem = tv({
  base: ['flex items-center justify-between py-3 px-4'],
})

type IntervalItemType = ComponentProps<'div'> &
  VariantProps<typeof intervalItem>

export const IntervalItem = ({ className, ...props }: IntervalItemType) => {
  return (
    <div
      {...props}
      className={intervalItem({
        className,
      })}
    />
  )
}
