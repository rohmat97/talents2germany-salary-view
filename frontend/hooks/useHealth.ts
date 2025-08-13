import { useState, useEffect, useCallback } from 'react';
import { apiGet } from '@/lib/api';

type Health = { status: string; app?: string };

export function useHealth() {
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    try {
      setLoading(true);
      const healthData = await apiGet<Health>('/api/health', {
        cache: 'no-store',
      });
      setHealth(healthData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch health status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  return { health, loading, error, refreshHealth: fetchHealth };
}
