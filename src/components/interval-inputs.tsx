import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const intervalInputs = tv({
  base: ['flex items-center gap-2'],
})

type IntervalInputsType = ComponentProps<'div'> &
  VariantProps<typeof intervalInputs>

export const IntervalInputs = ({ className, ...props }: IntervalInputsType) => {
  return (
    <div
      {...props}
      className={intervalInputs({
        className,
      })}
    />
  )
}
