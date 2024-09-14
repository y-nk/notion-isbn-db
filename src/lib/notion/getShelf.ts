import { getClient } from './getClient'

export async function getShelf(shelfId: string) {
  const notionClient = getClient()

  const res = await notionClient.databases.retrieve({
    database_id: shelfId,
  })

  return {
    id: res.id,
    title: (res as any).title[0].plain_text,
  }
}
