import type { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getClient } from './getClient'

export async function getShelves() {
  const notionClient = getClient()

  const res = await notionClient.search({
    filter: {
      property: 'object',
      value: 'database',
    },
  })

  const databases = res.results as DatabaseObjectResponse[]

  return databases.map((db) => ({
    id: db.id,
    title: db.title[0].plain_text,
  }))
}
