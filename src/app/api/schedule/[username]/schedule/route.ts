/* eslint-disable camelcase */
import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { google } from 'googleapis'
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

    const scheduling = await prisma.scheduling.create({
      data: {
        name,
        email,
        observations,
        date: schedulingDate.toDate(),
        user_id: user.id,
      },
    })

    const calendar = google.calendar({
      version: 'v3',
      auth: await getGoogleOAuthToken(user.id),
    })

    await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Ignite Call: ${name}`,
        description: observations,
        start: {
          dateTime: schedulingDate.format(),
        },
        end: {
          dateTime: schedulingDate.add(1, 'hour').format(),
        },
        attendees: [{ email, displayName: name }],
        conferenceData: {
          createRequest: {
            requestId: scheduling.id,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
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
