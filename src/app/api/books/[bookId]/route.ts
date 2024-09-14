import { NextResponse, type NextRequest } from 'next/server'

import { deleteBook } from '~/lib/notion/deleteBook'
import { patchBook } from '~/lib/notion/patchBook'

type Params = {
  shelfId: string
  bookId: string
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const book = await patchBook(params.bookId, await req.json())

  return NextResponse.json(book, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  await deleteBook(params.bookId)

  return NextResponse.json({}, { status: 200 })
}
