'use client';

import { useEffect, useState } from 'react';
import { api, clearToken } from '../../lib/api';

type Property = Awaited<ReturnType<typeof api.properties>>[number];

export default function DashboardPage() {
  const [me, setMe] = useState<{ userId: string; email: string; role: string } | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [label, setLabel] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const [meRes, propsRes] = await Promise.all([api.me(), api.properties()]);
      setMe(meRes);
      setProperties(propsRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addProperty(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api.createProperty({ label, addressLine1, city, state, pincode });
      setLabel('');
      setAddressLine1('');
      setCity('');
      setState('');
      setPincode('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create property');
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 style={{ marginBottom: 4 }}>Owner dashboard</h1>
          <p style={{ margin: 0, color: '#444' }}>{me ? `${me.email} (${me.role})` : 'Loading...'}</p>
        </div>
        <button
          onClick={() => {
            clearToken();
            window.location.href = '/';
          }}
        >
          Logout
        </button>
      </div>

      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

      <section style={{ marginTop: 24 }}>
        <h2>Your properties</h2>
        {properties.length === 0 ? <p>No properties yet.</p> : null}
        <ul style={{ paddingLeft: 16 }}>
          {properties.map((p) => (
            <li key={p.id}>
              <strong>{p.label}</strong> — {p.addressLine1}, {p.city}, {p.state} {p.pincode}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Add a property</h2>
        <form onSubmit={addProperty} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label style={{ gridColumn: '1 / -1' }}>
            Label (e.g., “Bangalore Apartment”)
            <input value={label} onChange={(e) => setLabel(e.target.value)} style={{ width: '100%' }} />
          </label>
          <label style={{ gridColumn: '1 / -1' }}>
            Address line 1
            <input
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              style={{ width: '100%' }}
            />
          </label>
          <label>
            City
            <input value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%' }} />
          </label>
          <label>
            State
            <input value={state} onChange={(e) => setState(e.target.value)} style={{ width: '100%' }} />
          </label>
          <label style={{ gridColumn: '1 / -1' }}>
            Pincode
            <input value={pincode} onChange={(e) => setPincode(e.target.value)} style={{ width: '100%' }} />
          </label>
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit">Create property</button>
          </div>
        </form>
      </section>
    </main>
  );
}

