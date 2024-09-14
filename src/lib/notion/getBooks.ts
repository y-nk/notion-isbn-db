import type { Book } from '../types'

import { getClient } from './getClient'
import { parsePage } from './parsePage'

export async function getBooks(shelfId: string): Promise<Book[]> {
  const notionClient = getClient()

  const res = await notionClient.databases.query({
    database_id: shelfId,
  })

  return res.results.map(parsePage)
}
