// src/lib/api.ts — Typed API client for WorkHub frontend

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

// ── AUTH HELPERS ──────────────────────────────────────────────────────────────
function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('wh_access_token')
}

function setTokens(access: string, refresh: string) {
  localStorage.setItem('wh_access_token', access)
  localStorage.setItem('wh_refresh_token', refresh)
}

function clearTokens() {
  localStorage.removeItem('wh_access_token')
  localStorage.removeItem('wh_refresh_token')
}

// ── BASE FETCH ────────────────────────────────────────────────────────────────
async function req<T = any>(
  method: string,
  path: string,
  body?: any,
  isFormData = false,
): Promise<T> {
  const headers: Record<string, string> = {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isFormData && body) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  })

  // Auto-refresh token
  if (res.status === 401) {
    const refreshToken = localStorage.getItem('wh_refresh_token')
    if (refreshToken) {
      const refresh = await fetch(`${BASE}/api/auth/refresh`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })
      if (refresh.ok) {
        const { accessToken } = await refresh.json()
        localStorage.setItem('wh_access_token', accessToken)
        headers['Authorization'] = `Bearer ${accessToken}`
        const retry = await fetch(`${BASE}${path}`, {
          method, headers, body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        })
        if (retry.ok) return retry.json()
      }
    }
    clearTokens()
    window.location.href = '/login'
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error ?? 'Request failed')
  }

  return res.json()
}

const get  = <T>(path: string)              => req<T>('GET',    path)
const post = <T>(path: string, body?: any)  => req<T>('POST',   path, body)
const patch = <T>(path: string, body?: any) => req<T>('PATCH',  path, body)
const del  = <T>(path: string)              => req<T>('DELETE', path)

// ══════════════════════════════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════════════════════════════
export const auth = {
  register: async (data: { email: string; password: string; firstName: string; lastName: string; role: string; companyName?: string }) => {
    const res = await post<any>('/api/auth/register', data)
    if (res.accessToken) setTokens(res.accessToken, res.refreshToken)
    return res
  },
  login: async (email: string, password: string) => {
    const res = await post<any>('/api/auth/login', { email, password })
    if (res.accessToken) setTokens(res.accessToken, res.refreshToken)
    return res
  },
  logout: () => { clearTokens(); window.location.href = '/' },
  me:     () => get('/api/auth/me'),
  forgotPassword: (email: string) => post('/api/auth/forgot-password', { email }),
  resetPassword:  (token: string, newPassword: string) => post('/api/auth/reset-password', { token, newPassword }),
  verifyEmail:    (token: string) => get(`/api/auth/verify-email/${token}`),
}

// ══════════════════════════════════════════════════════════════════════════════
// FREELANCERS
// ══════════════════════════════════════════════════════════════════════════════
export const freelancers = {
  list:   (params?: Record<string, any>) => get(`/api/freelancers?${new URLSearchParams(params).toString()}`),
  get:    (id: string)                   => get(`/api/freelancers/${id}`),
  update: (data: any)                    => patch('/api/freelancers/me', data),
}

// ══════════════════════════════════════════════════════════════════════════════
// ONSITE WORKERS
// ══════════════════════════════════════════════════════════════════════════════
export const workers = {
  list:     (params?: Record<string, any>) => get(`/api/workers?${new URLSearchParams(params).toString()}`),
  getPhoto: (id: string)                   => get(`/api/workers/${id}/photo`),
  update:   (data: any)                    => patch('/api/workers/me', data),
}

// ══════════════════════════════════════════════════════════════════════════════
// JOBS
// ══════════════════════════════════════════════════════════════════════════════
export const jobs = {
  list:     (params?: Record<string, any>) => get(`/api/jobs?${new URLSearchParams(params).toString()}`),
  get:      (id: string)                   => get(`/api/jobs/${id}`),
  create:   (data: any)                    => post('/api/jobs', data),
  update:   (id: string, data: any)        => patch(`/api/jobs/${id}`, data),
  complete: (id: string)                   => post(`/api/jobs/${id}/complete`),
}

// ══════════════════════════════════════════════════════════════════════════════
// PROPOSALS
// ══════════════════════════════════════════════════════════════════════════════
export const proposals = {
  list:   (jobId: string) => get(`/api/proposals/job/${jobId}`),
  submit: (data: { jobId: string; coverLetter: string; rate: number; deliveryDays?: number }) => post('/api/proposals', data),
  accept: (id: string)    => patch(`/api/proposals/${id}/accept`),
}

// ══════════════════════════════════════════════════════════════════════════════
// PAYMENTS
// ══════════════════════════════════════════════════════════════════════════════
export const payments = {
  createEscrow:    (jobId: string, amountUSD: number) => post('/api/payments/escrow', { jobId, amountUSD }),
  revealWorker:    (jobId: string, amountUSD: number) => post('/api/payments/reveal-worker', { jobId, amountUSD }),
  wallet:          ()                                 => get('/api/payments/wallet'),
  withdraw:        (amountUSD: number)                => post('/api/payments/withdraw', { amountUSD }),
  razorpayOrder:   (jobId: string, amountINR: number) => post('/api/payments/razorpay/order', { jobId, amountINR }),
}

// ══════════════════════════════════════════════════════════════════════════════
// MESSAGES
// ══════════════════════════════════════════════════════════════════════════════
export const messages = {
  list: (jobId: string) => get(`/api/messages/job/${jobId}`),
}

// ══════════════════════════════════════════════════════════════════════════════
// REVIEWS
// ══════════════════════════════════════════════════════════════════════════════
export const reviews = {
  create: (data: { jobId: string; subjectId: string; rating: number; comment: string }) => post('/api/reviews', data),
}

// ══════════════════════════════════════════════════════════════════════════════
// ENTERPRISE
// ══════════════════════════════════════════════════════════════════════════════
export const enterprise = {
  me:              ()           => get('/api/enterprise/me'),
  updateSettings:  (data: any)  => patch('/api/enterprise/settings', data),
  employees:       (params?: any) => get(`/api/enterprise/employees?${new URLSearchParams(params).toString()}`),
  addEmployee:     (data: any)  => post('/api/enterprise/employees', data),
  bulkUpload:      (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    return req('/api/enterprise/employees/bulk', 'POST', fd, true)
  },
  uploadProgress:  (jobId: string) => get(`/api/enterprise/employees/bulk/${jobId}/progress`),
  clockIn:         (empId: string, lat: number, lng: number) => post(`/api/enterprise/employees/${empId}/clock-in`, { lat, lng }),
  clockOut:        (empId: string) => post(`/api/enterprise/employees/${empId}/clock-out`),
  generatePayslip: (empId: string, data: any) => post(`/api/enterprise/employees/${empId}/payslip`, data),
}

// ══════════════════════════════════════════════════════════════════════════════
// SHIFTS
// ══════════════════════════════════════════════════════════════════════════════
export const shifts = {
  list:   ()                                       => get('/api/shifts'),
  create: (data: any)                              => post('/api/shifts', data),
  assign: (shiftId: string, employeeIds: string[]) => post(`/api/shifts/${shiftId}/assign`, { employeeIds }),
}

// ══════════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ══════════════════════════════════════════════════════════════════════════════
export const notifications = {
  list:    () => get('/api/notifications'),
  read:    (id: string) => patch(`/api/notifications/${id}/read`),
  readAll: () => patch('/api/notifications/read-all'),
}

// ══════════════════════════════════════════════════════════════════════════════
// UPLOAD
// ══════════════════════════════════════════════════════════════════════════════
export const upload = {
  avatar: (file: File) => {
    const fd = new FormData(); fd.append('file', file)
    return req('POST', '/api/upload/avatar', fd, true)
  },
  portfolio: (files: File[]) => {
    const fd = new FormData(); files.forEach(f => fd.append('files', f))
    return req('POST', '/api/upload/portfolio', fd, true)
  },
  workerPhoto: (file: File) => {
    const fd = new FormData(); fd.append('file', file)
    return req('POST', '/api/upload/worker-photo', fd, true)
  },
  idDocument: (file: File) => {
    const fd = new FormData(); fd.append('file', file)
    return req('POST', '/api/upload/id-document', fd, true)
  },
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN
// ══════════════════════════════════════════════════════════════════════════════
export const admin = {
  stats:          () => get('/api/admin/stats'),
  users:          (params?: any) => get(`/api/admin/users?${new URLSearchParams(params).toString()}`),
  suspendUser:    (id: string)   => patch(`/api/admin/users/${id}/suspend`),
  approveKyc:     (id: string)   => patch(`/api/admin/users/${id}/kyc-approve`),
  disputes:       ()             => get('/api/admin/disputes'),
  resolveDispute: (id: string, data: any) => patch(`/api/admin/disputes/${id}/resolve`, data),
}

// ══════════════════════════════════════════════════════════════════════════════
// SOCKET.IO CLIENT HELPER
// ══════════════════════════════════════════════════════════════════════════════
export function createSocketClient() {
  if (typeof window === 'undefined') return null
  // Dynamic import to avoid SSR issues
  return import('socket.io-client').then(({ io }) =>
    io(BASE, {
      auth:               { token: getToken() },
      transports:         ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay:  1000,
    })
  )
}

const api = { auth, freelancers, workers, jobs, proposals, payments, messages, reviews, enterprise, shifts, notifications, upload, admin }
export default api
