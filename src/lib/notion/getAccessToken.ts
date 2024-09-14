import { clientId, clientSecret, redirectUri } from './oauth'

export async function getAccessToken(code: string) {
  const res = await fetch('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  })

  const { access_token } = await res.json()

  return typeof access_token === 'string' ? access_token : undefined
}
