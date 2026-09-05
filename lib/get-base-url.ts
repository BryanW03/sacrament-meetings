mport { headers } from 'next/headers';
 
// Server Components need an absolute URL to call our own API routes with
// fetch(). This builds one from the incoming request headers so it works
// the same way locally and once deployed on Vercel.
// Note: headers() is async as of Next.js 15+, so this function must be awaited.
export async function getBaseUrl(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get('host') ?? 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}
 