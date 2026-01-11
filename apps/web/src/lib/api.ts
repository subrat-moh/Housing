const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1';

export type AuthResponse = {
  user: { id: string; email: string; role: string };
  token: string;
};

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? getToken() : null;
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const api = {
  register: (body: { email: string; password: string; name?: string; phone?: string }) =>
    request<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request<{ userId: string; email: string; role: string }>('/auth/me'),
  plans: () =>
    request<Array<{ id: string; name: string; setupFeeInr: number; monthlyFeeInr: number }>>('/plans'),
  properties: () =>
    request<
      Array<{
        id: string;
        label: string;
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
      }>
    >('/properties'),
  createProperty: (body: {
    label: string;
    addressLine1: string;
    addressLine2?: string;
    locality?: string;
    city: string;
    state: string;
    pincode: string;
    propertyType?: string;
  }) => request('/properties', { method: 'POST', body: JSON.stringify(body) }),
};

