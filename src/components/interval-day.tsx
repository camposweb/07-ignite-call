import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const intervalDay = tv({
  base: ['flex items-center gap-3'],
})

type IntervalDayType = ComponentProps<'div'> & VariantProps<typeof intervalDay>

export const IntervalDay = ({ className, ...props }: IntervalDayType) => {
  return (
    <div
      {...props}
      className={intervalDay({
        className,
      })}
    />
  )
}
