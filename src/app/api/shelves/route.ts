import { NextResponse, type NextRequest } from 'next/server'

import { getShelves } from '~/lib/notion/getShelves'
import { addShelf } from '~/lib/notion/addShelf'

export async function GET() {
  const shelves = await getShelves()
  return NextResponse.json(shelves)
}

export async function POST(req: NextRequest) {
  const shelf = await addShelf(await req.json())

  return NextResponse.json(shelf, { status: 201 })
}
