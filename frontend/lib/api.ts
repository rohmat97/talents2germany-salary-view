export function getApiBaseUrl() {
  if (typeof process !== 'undefined') {
    const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (fromEnv && fromEnv.length > 0) return fromEnv;
  }
  return 'http://localhost:8000';
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}${path}`, {
    ...init,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...(init?.headers || {}),
    },
    // Next.js fetch caching options can be configured by callers
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${path} failed: ${res.status} ${res.statusText} - ${text}`);
  }
  return res.json() as Promise<T>;
}
