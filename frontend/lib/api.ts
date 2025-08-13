export function getApiBaseUrl() {
  if (typeof process !== 'undefined') {
    const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (fromEnv && fromEnv.length > 0) return fromEnv;
  }
  return 'http://localhost:8000';
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  // Add bypass_auth for testing purposes
  const separator = path.includes('?') ? '&' : '?';
  const url = `${base}${path}${separator}bypass_auth=1`;
  
  const res = await fetch(url, {
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

export async function apiPost<T>(path: string, data: any, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  // Add bypass_auth for testing purposes
  const separator = path.includes('?') ? '&' : '?';
  const url = `${base}${path}${separator}bypass_auth=1`;
  
  const res = await fetch(url, {
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(init?.headers || {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${path} failed: ${res.status} ${res.statusText} - ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function apiPut<T>(path: string, data: any, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  // Add bypass_auth for testing purposes
  const separator = path.includes('?') ? '&' : '?';
  const url = `${base}${path}${separator}bypass_auth=1`;
  
  const res = await fetch(url, {
    ...init,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(init?.headers || {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${path} failed: ${res.status} ${res.statusText} - ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function apiDelete<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  // Add bypass_auth for testing purposes
  const separator = path.includes('?') ? '&' : '?';
  const url = `${base}${path}${separator}bypass_auth=1`;
  
  const res = await fetch(url, {
    ...init,
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DELETE ${path} failed: ${res.status} ${res.statusText} - ${text}`);
  }
  
  // Handle 204 No Content response
  if (res.status === 204) {
    return null as T;
  }
  
  return res.json() as Promise<T>;
}
