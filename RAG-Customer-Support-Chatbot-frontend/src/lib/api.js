const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const TOKEN_KEY = 'replai_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (!token) throw new ApiError(401, 'Not authenticated')
    headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (e) {
    throw new ApiError(0, 'Network error — is the backend running on ' + API_BASE + '?')
  }

  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : await res.text()

  if (!res.ok) {
    const detail = (typeof data === 'object' && data?.detail) || res.statusText
    throw new ApiError(res.status, typeof detail === 'string' ? detail : JSON.stringify(detail))
  }
  return data
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export const api = {
  register: (username, email, password) =>
    request('/auth/register', { method: 'POST', body: { username, email, password } }),

  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: { email, password } }),

  logout: () =>
    request('/auth/logout', { method: 'POST', auth: true }),

  sendMessage: (userMessage, conversationId = null) =>
    request('/chat/', {
      method: 'POST',
      body: { user_message: userMessage, conversation_id: conversationId },
      auth: true,
    }),

  getHistory: () =>
    request('/history/all', { auth: true }),
}
