import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const intervalContainer = tv({
  base: [
    'mb-4 border border-solid border-gray600 rounded-md divide-y divide-gray600',
  ],
})

type IntervalContainerType = ComponentProps<'div'> &
  VariantProps<typeof intervalContainer>

export const IntervalContainer = ({
  className,
  ...props
}: IntervalContainerType) => {
  return (
    <div
      {...props}
      className={intervalContainer({
        className,
      })}
    />
  )
}
