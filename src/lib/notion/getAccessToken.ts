import { clientId, clientSecret, redirectUri } from './oauth'

export async function getAccessToken(code: string) {
  const body = new URLSearchParams()

  body.append('grant_type', 'authorization_code')
  body.append('code', code)
  body.append('redirect_uri', redirectUri)

  const res = await fetch('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  const data = await res.json()
  const { error, error_description, access_token } = data

  if (error) {
    throw new Error(`${error} (${error_description ?? 'unknown'})`)
  }

  if (!access_token) {
    throw new Error('could not retrieve access token')
  }

  return `${access_token}`
}
