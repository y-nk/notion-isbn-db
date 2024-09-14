import { getClient } from './getClient'

export async function deleteBook(bookId: string) {
  const notionClient = getClient()

  await notionClient.pages.update({
    page_id: bookId,
    in_trash: true,
  })
}
