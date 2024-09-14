import { clientId, redirectUri } from './oauth'

export const getOauthUrl = () =>
  `https://api.notion.com/v1/oauth/authorize?client_id=${clientId}&response_type=code&owner=user&redirect_uri=${encodeURI(redirectUri)}`
