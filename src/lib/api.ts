import { NextRequest, NextResponse } from 'next/server'

type NextHandler = (req: NextRequest, route?: unknown) => Promise<NextResponse>

export const globalCatch =
  async (handler: NextHandler) => (req: NextRequest, route?: unknown) => {
    try {
      return handler(req, route)
    } catch (error) {
      return NextResponse.json(
        { error },
        {
          status: 400,
          statusText: error.toString(),
        }
      )
    }
  }
