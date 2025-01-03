import { ConfirmStep } from '@/components/schedule/confirm-step'
import { ScheduleForm } from '@/components/schedule/schedule-form'
import { UserHeader } from '@/components/user-header'
import { api } from '@/lib/axios'
import { env } from '@/lib/env'
import { Avatar, Heading, Text } from '@camposweb-ignite-ui/react'
import { Metadata } from 'next'

interface SchedulePageProps {
  params: {
    username: string
  }
}

interface ScheduleProps {
  name: string
  bio: string
  image: string
  username?: string
}

async function getUser(username: string): Promise<ScheduleProps> {
  const { data } = await api.get(`${env.BASE_URL}/schedule/${username}`)

  return data.user
}

/* export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
} */

export const metadata: Metadata = {
  title: 'Calendário',
}

export default async function PageSchedule({ params }: SchedulePageProps) {
  const user = await getUser(params.username)

  if (!user) {
    return (
      <div className="mb-4 mt-20 flex justify-center px-4 py-0">
        <UserHeader>
          <Heading className="mt-2 leading-base">
            Usuário não encontrado
          </Heading>
          <Text className="text-gray200">O usuário não existe</Text>
        </UserHeader>
      </div>
    )
  }

  return (
    <div className="mb-4 mt-20 px-4 py-0">
      <UserHeader>
        <Avatar src={`${user.image}`} />
        <Heading className="mt-2 leading-base">{user.name}</Heading>
        <Text className="text-gray200">{user.bio}</Text>
      </UserHeader>
      <ScheduleForm />
      {/* <ConfirmStep /> */}
    </div>
  )
}
