import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const message = tv({
  base: ['mt-2'],
})

type FormAnnotationProps = ComponentProps<'div'> & VariantProps<typeof message>

export const FormAnnotation = ({
  className,
  ...props
}: FormAnnotationProps) => {
  return <div {...props} className={message({ className })} />
}
