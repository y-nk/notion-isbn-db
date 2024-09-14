import { z } from 'zod'

import { getClient } from './getClient'

const DB_SCHEMA = {
  title: { title: {} },
  isbn: { rich_text: {} },
}

const schema = z.object({
  title: z.string(),
})

export async function addShelf(payload: z.infer<typeof schema>) {
  const { title } = schema.parse(payload)

  const notionClient = getClient()

  const res1 = await notionClient.search({
    filter: {
      property: 'object',
      value: 'page',
    },
  })

  if (res1.results.length === 0) {
    throw new Error('no page access was granted')
  }

  const page = res1.results[0]

  const res2 = await notionClient.databases.create({
    parent: { page_id: page.id },
    title: [{ type: 'text', text: { content: title } }],
    icon: { type: 'emoji', emoji: '📚' },
    properties: DB_SCHEMA,
  })

  return { id: res2.id, title, books: [] }
}
