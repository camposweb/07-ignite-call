'use client'
import { Avatar, Heading, Text } from '@camposweb-ignite-ui/react'
import { UserHeader } from '../user-header'
import { api } from '@/lib/axios'
import { useParams } from 'next/navigation'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    image: string
  }
}

async function getUser(username: string): Promise<ScheduleProps> {
  const { data } = await api.get(`/schedule/${username}`)

  return data
}

export function Schedule() {
  const params = useParams<{ username: string }>()
  const user = getUser(params.username)
  const name = user.then((user) => user.user.name)
  return (
    <div className="mb-4 mt-20 flex justify-center px-4 py-0">
      <UserHeader>
        <Avatar
          src={`https://lh3.googleusercontent.com/a/ACg8ocIc9pkUfGjGXA_c_jXJrgNPuVh2lJEkixl6NfhtqwyfWAMcqz4k=s96-c`}
        />
        <Heading className="mt-2 leading-base">Leandro Campos</Heading>
        <Text className="text-gray200">Desenvolverdor</Text>
        <Text>{name}</Text>
      </UserHeader>
    </div>
  )
}
