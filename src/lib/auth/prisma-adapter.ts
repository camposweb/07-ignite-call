/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Adapter, AdapterUser } from '@auth/core/adapters'
import { prisma } from '../prisma'
import { cookies } from 'next/headers'

type User = AdapterUser & {
  username: string
}

export default function PrismaAdapter(): Adapter {
  return {
    async createUser(user: User) {
      const cookieStore = await cookies()
      if (!cookieStore.has('@ignitecall:userId')) {
        throw new Error('Usuário não encontrado com cookies')
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: cookieStore.get('@ignitecall:userId')?.value,
        },
        data: {
          name: user.name!,
          email: user.email,
          image: user.image,
        },
      })

      await cookieStore.delete('@ignitecall:userId')

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
        image: prismaUser.image!,
      } as any
    },
    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user?.id,
        name: user?.name,
        username: user?.username,
        email: user?.email,
        emailVerified: null,
        image: user?.image,
      } as any
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user?.id,
        name: user?.name,
        username: user?.username,
        email: user?.email,
        emailVerified: null,
        image: user?.image,
      } as any
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user?.id,
        name: user?.name,
        username: user?.username,
        email: user?.email,
        emailVerified: null,
        image: user.image!,
      } as any
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name!,
          email: user.email,
          image: user.image,
        },
      })
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
        image: prismaUser.image!,
      } as any
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state?.toString(),
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })

      return {
        userId,
        sessionToken,
        expires,
      } as any
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          emailVerified: null,
          image: user.image!,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })
      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      } as any
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
