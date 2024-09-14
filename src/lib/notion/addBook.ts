import { z } from 'zod'

import type { Book } from '../types'
import { getClient } from './getClient'

const schema = z.object({
  isbn: z.string().regex(/[0-9]*/),
  title: z.string().optional(),
})

export async function addBook(
  shelfId: string,
  payload: z.infer<typeof schema>
): Promise<Book> {
  const { isbn, title } = schema.parse(payload)

  const notionClient = getClient()

  const properties: Record<string, any> = {}

  properties.isbn = [{ text: { content: isbn } }]

  if (title) {
    properties.title = [{ rich_text: { content: title } }]
  }

  const newBook = await notionClient.pages.create({
    parent: { database_id: shelfId },
    properties,
  })

  return {
    id: newBook.id,
    isbn,
    title,
  }
}
