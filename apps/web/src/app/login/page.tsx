'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api, setToken } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.login({ email, password });
      setToken(res.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 520, margin: '0 auto' }}>
      <h1>Login</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ width: '100%' }}
          />
        </label>
        <button type="submit">Login</button>
        {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      </form>
      <p style={{ marginTop: 16 }}>
        No account? <a href="/register">Register</a>
      </p>
    </main>
  );
}

