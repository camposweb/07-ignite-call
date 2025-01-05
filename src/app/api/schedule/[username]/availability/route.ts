/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

dayjs.extend(utc)

type Params = {
  username: string
}

export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    const searchParams = req.nextUrl.searchParams
    const date = searchParams.get('date')
    const timezoneOffset = searchParams.get('timezoneOffset')
    const username = z.string().parse(context.params.username)

    if (!date || !timezoneOffset) {
      return NextResponse.json(
        { message: 'Date not provided.' },
        { status: 400 },
      )
    }

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

    const referenceDate = dayjs(String(date))
    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    const timezoneOffsetInHours =
      typeof timezoneOffset === 'string'
        ? Number(timezoneOffset) / 60
        : Number(timezoneOffset[0]) / 60

    const referenceDateTimeZoneOffsetInHours =
      referenceDate.toDate().getTimezoneOffset() / 60

    if (isPastDate) {
      return NextResponse.json({ possibleTimes: [], availableTimes: [] })
    }

    const userAvailability = await prisma.userTimeInterval.findFirst({
      where: {
        user_id: user.id,
        week_day: referenceDate.get('day'),
      },
    })

    if (!userAvailability) {
      return NextResponse.json({ possibleTimes: [], availableTimes: [] })
    }

    const { time_start_in_minutes, time_end_in_minutes } = userAvailability

    const startHour = time_start_in_minutes / 60
    const endHour = time_end_in_minutes / 60

    const possibleTimes = Array.from({ length: endHour - startHour }).map(
      (_, i) => {
        return startHour + i
      },
    )

    const blockedTimes = await prisma.scheduling.findMany({
      select: {
        date: true,
      },
      where: {
        user_id: user.id,
        date: {
          gte: referenceDate
            .set('hour', startHour)
            .add(timezoneOffsetInHours, 'hours')
            .toDate(),
          lte: referenceDate
            .set('hour', endHour)
            .add(timezoneOffsetInHours, 'hours')
            .toDate(),
        },
      },
    })

    const availableTimes = possibleTimes.filter((time) => {
      const isTimeBlocked = blockedTimes.some(
        (blockedTime) =>
          blockedTime.date.getUTCHours() - timezoneOffsetInHours === time,
      )

      const isTimeInPast = referenceDate
        .set('hour', time)
        .subtract(referenceDateTimeZoneOffsetInHours, 'hours')
        .isBefore(dayjs().utc().subtract(timezoneOffsetInHours, 'hours'))

      return !isTimeBlocked && !isTimeInPast
    })

    return NextResponse.json({ possibleTimes, availableTimes }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
