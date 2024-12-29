import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
})

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  try {
    const body = await req.json()
    const { name, username } = UserSchema.parse(body)

    const userExists = await prisma.user.findUnique({
      where: { username },
    })

    if (userExists) {
      return NextResponse.json(
        { message: 'Usuário com username informado já existe' },
        { status: 400 },
      )
    }

    const user = await prisma.user.create({
      data: { name, username },
    })

    cookies().set({
      name: '@ignitecall:userId',
      value: user.id,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 },
    )
  }
}
