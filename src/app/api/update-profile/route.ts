import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const updateProfileSchema = z.object({
  bio: z.string(),
})

export async function PUT(req: NextRequest) {
  if (req.method !== 'PUT') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { bio } = updateProfileSchema.parse(body)

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      bio,
    },
  })

  return NextResponse.json({ status: 204 })
}
