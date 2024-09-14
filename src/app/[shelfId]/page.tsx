import IsbnEditor from '~/components/app/isbn-editor'

import { getBooks } from '~/lib/notion/getBooks'
import { getShelf } from '~/lib/notion/getShelf'

type Params = {
  shelfId: string
}

export default async function Shelf({ params }: { params: Params }) {
  const shelf = await getShelf(params.shelfId)
  const books = await getBooks(params.shelfId)

  return <IsbnEditor {...shelf} books={books} />
}
