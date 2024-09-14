import { z } from 'zod'

import { getClient } from './getClient'
import { parsePage } from './parsePage'

const schema = z.object({
  title: z.string(),
})

export async function patchBook(bookId: string, patch: z.infer<typeof schema>) {
  const { title } = schema.parse(patch)

  const notionClient = getClient()

  const res = await notionClient.pages.update({
    page_id: bookId,
    properties: {
      title: {
        type: 'title',
        title: [{ text: { content: title } }],
      },
    },
  })

  return parsePage(res)
}
