'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api, setToken } from '../../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.register({ name, phone, email, password });
      setToken(res.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 520, margin: '0 auto' }}>
      <h1>Register</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%' }} />
        </label>
        <label>
          Phone (optional)
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%' }} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
        </label>
        <label>
          Password (min 8 chars)
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ width: '100%' }}
          />
        </label>
        <button type="submit">Create account</button>
        {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}
      </form>
      <p style={{ marginTop: 16 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </main>
  );
}

