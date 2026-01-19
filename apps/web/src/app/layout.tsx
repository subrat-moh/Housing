import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Maintenance',
  description: 'Property maintenance subscriptions for owners in India',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>{children}</body>
    </html>
  );
}

