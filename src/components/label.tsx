import { ComponentProps, forwardRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const label = tv({
  base: ['flex flex-col gap-2'],
})

type LabelType = ComponentProps<'label'> & VariantProps<typeof label>

export const Label = forwardRef<HTMLLabelElement, LabelType>(
  ({ className, ...props }: LabelType) => {
    return <label {...props} className={label({ className })} />
  },
)

Label.displayName = 'Label'
