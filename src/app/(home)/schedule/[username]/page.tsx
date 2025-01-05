import { ScheduleForm } from '@/components/schedule/schedule-form'
import { UserHeader } from '@/components/user-header'
import { api } from '@/lib/axios'
import { env } from '@/lib/env'
import { Avatar, Heading, Text } from '@camposweb-ignite-ui/react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
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

export async function generateMetadata({
  params,
}: SchedulePageProps): Promise<Metadata> {
  const user = await getUser(params.username)

  return {
    title: `Agendar com ${user.name}`,
    robots: {
      index: false,
    },
  }
}

export default async function PageSchedule({ params }: SchedulePageProps) {
  const queryClient = new QueryClient()
  const user = await getUser(params.username)

  queryClient.prefetchQuery({
    queryKey: ['availability'],
  })

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mb-4 mt-20 px-4 py-0">
        <UserHeader>
          <Avatar src={`${user.image}`} />
          <Heading className="mt-2 leading-base">{user.name}</Heading>
          <Text className="text-gray200">{user.bio}</Text>
        </UserHeader>
        <ScheduleForm />
      </div>
    </HydrationBoundary>
  )
}
