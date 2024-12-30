import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const connectItem = tv({
  base: [
    'flex items-center justify-between',
    'border border-solid border-gray600 py-4 px-6 rounded-md',
    'mb-2',
  ],
})

type ConnectItemType = ComponentProps<'div'> & VariantProps<typeof connectItem>

export const ConnectItem = ({ className, ...props }: ConnectItemType) => {
  return <div {...props} className={connectItem({ className })} />
}
