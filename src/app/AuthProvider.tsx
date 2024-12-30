'use client'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface AuthProviderProps {
	children: ReactNode
}

export default function Authprovider({ children }: AuthProviderProps) {
	return (
		<SessionProvider>
			{children}
		</SessionProvider>
	)
}