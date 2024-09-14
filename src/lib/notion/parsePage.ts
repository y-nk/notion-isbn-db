import type { Book } from '../types'

export function parsePage(page: any) {
  return {
    id: page.id,
    title: page.properties.title.title[0]?.plain_text,
    isbn: page.properties.isbn.rich_text[0]?.plain_text,
  } as Book
}
