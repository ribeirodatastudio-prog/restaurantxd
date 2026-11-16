// Autenticação de usuário único por senha (APP_PASSWORD).
// O cookie guarda um HMAC derivado da senha: não dá para forjar sem saber a senha,
// e trocar a senha na Vercel desloga todas as sessões.
// Usa só Web Crypto, então roda tanto no middleware (edge) quanto no servidor.

export const SESSION_COOKIE = 'rxd_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 365 // 1 ano

const encoder = new TextEncoder()

async function hmacHex(key: string, message: string) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
  return Array.from(new Uint8Array(sig), b => b.toString(16).padStart(2, '0')).join('')
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

function appPassword() {
  const pw = process.env.APP_PASSWORD
  if (!pw) throw new Error('APP_PASSWORD não está definida')
  return pw
}

export function sessionToken() {
  return hmacHex(appPassword(), 'restaurantxd-session-v1')
}

export async function isValidSession(token: string | undefined) {
  if (!token) return false
  return safeEqual(token, await sessionToken())
}

export async function isCorrectPassword(input: string) {
  // Compara os HMACs (mesmo tamanho) em vez das senhas em texto
  const [a, b] = await Promise.all([
    hmacHex('restaurantxd-login', input),
    hmacHex('restaurantxd-login', appPassword()),
  ])
  return safeEqual(a, b)
}
