/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type Params = {
  username: string
}

export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    const searchParams = req.nextUrl.searchParams
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const username = z.string().parse(context.params.username)

    if (!year || !month) {
      return NextResponse.json(
        { message: 'Year or month not specified' },
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

    const availableWeeksDays = await prisma.userTimeInterval.findMany({
      select: {
        week_day: true,
      },
      where: {
        user_id: user.id,
      },
      orderBy: {
        week_day: 'asc',
      },
    })

    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
      return !availableWeeksDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      )
    })

    // const formatMonth = Number(String(month).length === 1 ? `0${month}` : month)

    const query = Prisma.sql`
       SELECT
    EXTRACT(DAY FROM S.DATE) AS date,
    COUNT(S.date),
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

  FROM schedulings S

  LEFT JOIN user_time_intervals UTI
    ON UTI.week_day = EXTRACT(DOW FROM S.date + INTERVAL '1 day')

  WHERE S.user_id = ${user.id}
    AND UTI.user_id = ${user.id}
    AND EXTRACT(YEAR FROM S.date) = ${year}::int
    AND EXTRACT(MONTH FROM S.date) = ${month}::int

  GROUP BY EXTRACT(DAY FROM S.DATE),
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

  HAVING
    COUNT(S.date) >= ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60);

   `

    const blockedWeeksRaw: Array<{ date: number }> =
      await prisma.$queryRaw(query)

    console.log(blockedWeeksRaw)

    const blockedDates = blockedWeeksRaw.map((item) => Number(item.date))
    // const dates = Number(blockedDates)

    return NextResponse.json({ blockedWeekDays, blockedDates }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Algum erro ocorreu' + error },
      { status: 500 },
    )
  }
}
