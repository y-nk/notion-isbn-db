import { Client } from '@notionhq/client'
import { cookies } from 'next/headers'

export function getClient() {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('unauthorized')
  }

  return new Client({ auth: token })
}
