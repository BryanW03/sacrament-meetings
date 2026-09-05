import { headers } from 'next/headers';

// Server Components need an absolute URL to call our own API routes with
// fetch(). This builds one from the incoming request headers so it works
// the same way locally and once deployed on Vercel.
export function getBaseUrl(): string {
  const headerList = headers();
  const host = headerList.get('host') ?? 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}
