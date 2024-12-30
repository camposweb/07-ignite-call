'use client'
import { ArrowRight, Check } from 'lucide-react'
import { Header } from '../header'
import { Button, Heading, MultiStep, Text } from '@camposweb-ignite-ui/react'
import { ConnectBox } from '../connect-box'
import { ConnectItem } from '../connect-item'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { AuthError } from '../auth/auth-error'

export function ConnectCalendar() {
  const session = useSession()
  const searhParams = useSearchParams()

  const hasAuthError = !!searhParams.get('error')
  const isSignedIn = session.status === 'authenticated'

  return (
    <div className="m-auto mt-20 max-w-xl px-4 py-0">
      <Header className="">
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text className="mb-6 text-gray200">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado <Check />
            </Button>
          ) : (
            <Button
              variant="secundary"
              size="sm"
              onClick={() => signIn('google')}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}
        <Button type="submit" className="mt-4" disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </div>
  )
}
