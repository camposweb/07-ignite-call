import { Text } from "@camposweb-ignite-ui/react";
import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const authError = tv({
	base: [
		'text-[#f75a68] mb-2'
	]
})

type AuthErrorType = ComponentProps<typeof Text> & VariantProps<typeof authError>

export const AuthError = ({ className, ...props }: AuthErrorType) => {
	return (
		<Text className={authError({ className })} {...props} />
	)
}