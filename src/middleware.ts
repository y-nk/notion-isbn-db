import { NextRequest, NextResponse } from 'next/server'

import { getOauthUrl } from './lib/notion/getOAuthUrl'
import { getAccessToken } from './lib/notion/getAccessToken'

export default async function middleware(req: NextRequest) {
  if (req.cookies.has('token')) return NextResponse.next()

  const code = req.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(getOauthUrl())
  } else {
    try {
      const res = NextResponse.next()
      res.cookies.set('token', await getAccessToken(code))

      return res
    } catch (err) {
      return new Response(`${err}`, {
        status: 400,
        statusText: `${err}`,
      })
    }
  }
}

export const config = {
  matcher: [`/`],
}
