import { NextResponse, type NextRequest } from 'next/server'

import { addBook } from '~/lib/notion/addBook'
import { getBooks } from '~/lib/notion/getBooks'

type Params = {
  shelfId: string
}

export async function GET(_, { params }: { params: Params }) {
  const books = await getBooks(params.shelfId)
  return NextResponse.json(books)
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const book = await addBook(params.shelfId, await req.json())

  return NextResponse.json(book, { status: 201 })
}
