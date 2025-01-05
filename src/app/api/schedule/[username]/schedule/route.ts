/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type Params = {
  username: string
}

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime(),
})

export async function POST(req: NextRequest, context: { params: Params }) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  try {
    // const searchParams = req.nextUrl.searchParams
    // const date = searchParams.get('date')
    const username = z.string().parse(context.params.username)

    /* if (!date) {
      return NextResponse.json(
        { message: 'Date not provided.' },
        { status: 400 },
      )
    } */

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

    const body = await req.json()
    const { name, email, observations, date } = formSchema.parse(body)

    const schedulingDate = dayjs(date).startOf('hour')

    if (schedulingDate.isBefore(new Date())) {
      return NextResponse.json(
        { message: 'Date is in the past.' },
        { status: 400 },
      )
    }

    const conflictingScheduling = await prisma.scheduling.findFirst({
      where: {
        user_id: user.id,
        date: schedulingDate.toDate(),
      },
    })

    if (conflictingScheduling) {
      return NextResponse.json(
        { message: 'There is another scheduling at the same time' },
        { status: 400 },
      )
    }

    await prisma.scheduling.create({
      data: {
        name,
        email,
        observations,
        date: schedulingDate.toDate(),
        user_id: user.id,
      },
    })

    return NextResponse.json({ status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
