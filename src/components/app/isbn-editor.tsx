'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

import BookRow from '~/components/app/book-row'
import NewBookDialog from '~/components/app/new-book-dialog'
import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import type { Book } from '~/lib/types'
import { useParams } from 'next/navigation'
import { useAsyncFn } from '~/hooks/use-async-fn'

type Props = {
  id: string
  title: string
  books: Book[]
}

export default function IsbnEditor(props: Props) {
  const { shelfId } = useParams()
  const [books, setBooks] = useState(props.books)

  const [handleLoad, loadState] = useAsyncFn(async () => {
    const res = await fetch(`/api/shelves/${shelfId}/books`)
    if (res.ok) setBooks(await res.json())
  })

  const onAdded = async (book: Book) => {
    setBooks([book, ...books])
  }

  const onEdited = async (updated: Book) => {
    setBooks((books) =>
      books.map((book) => (book.id === updated.id ? updated : book))
    )
  }

  const onDeleted = async (bookId: string) => {
    setBooks(books.filter((book) => book.id !== bookId))
  }

  return (
    <main className="container mx-auto p-4">
      <header className="flex align-center justify-between">
        <h1 className="text-2xl font-bold">{props.title}</h1>

        <aside className="flex align-center justify-end gap-4">
          <NewBookDialog onAdded={onAdded} />
          <Button
            variant="secondary"
            onClick={handleLoad}
            disabled={loadState.type === 'loading'}
          >
            <RefreshCw className={`h-4 w-4 ${loadState.loading ? 'animate-spin' : ''}`} />
          </Button>
        </aside>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ISBN</TableHead>
            <TableHead>Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <BookRow
              key={book.id}
              book={book}
              onEdited={onEdited}
              onDeleted={onDeleted}
            />
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
