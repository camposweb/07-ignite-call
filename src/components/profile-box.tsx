import { Box } from '@camposweb-ignite-ui/react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const profileBox = tv({
  base: ['mt-6 flex flex-col gap-4'],
})

type ProfileBoxType = ComponentProps<typeof Box> &
  VariantProps<typeof profileBox>

export const ProfileBox = ({ className, ...props }: ProfileBoxType) => {
  return <Box {...props} className={profileBox({ className })} />
}
