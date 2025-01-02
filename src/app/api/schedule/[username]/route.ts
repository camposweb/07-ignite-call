import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

type Params = {
  username: string
}

export async function GET(request: Request, context: { params: Params }) {
  try {
    const username = z.string().parse(context.params.username)

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        user: {
          name: user.name,
          bio: user.bio,
          image: user.image,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar usuário' + error },
      { status: 500 },
    )
  }
}
