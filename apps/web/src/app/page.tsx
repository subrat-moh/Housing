export default function HomePage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Property Maintenance (India)</h1>
      <p style={{ marginTop: 0, color: '#444' }}>
        Remote property inspections, upkeep, and service requests with monthly reporting.
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <a href="/register">Create account</a>
        <a href="/login">Login</a>
        <a href="/dashboard">Owner dashboard</a>
      </div>
    </main>
  );
}

