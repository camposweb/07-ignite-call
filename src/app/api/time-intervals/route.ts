import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const timeIntervalBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { intervals } = timeIntervalBodySchema.parse(body)

  /*  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id || '',
        },
      })
    }),
  )
 */
  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => ({
      week_day: interval.weekDay,
      time_start_in_minutes: interval.startTimeInMinutes,
      time_end_in_minutes: interval.endTimeInMinutes,
      user_id: session.user?.id || '',
    })),
  })

  return NextResponse.json({ status: 201 })
}
