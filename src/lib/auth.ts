import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import PrismaAdapter from './auth/prisma-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(),
  providers: [
    Google({
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
      ) {
        return '/register/connect-calendar/?error=permissions'
      }
      return true
    },
  },
})
