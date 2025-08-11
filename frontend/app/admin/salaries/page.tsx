"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet, getApiBaseUrl } from "@/lib/api";

type Health = { status: string; app?: string };

export default function AdminSalariesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await apiGet<Health>("/api/health", { cache: "no-store" });
        if (mounted) setHealth(data);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Admin • Salaries</h1>
        <Link href="/" className="text-sm text-blue-600 hover:underline">Home</Link>
      </div>

      <div className="mt-6 grid gap-6">
        <section className="rounded-xl border border-black/10 dark:border-white/15 p-5 bg-white dark:bg-zinc-900">
          <h2 className="text-lg font-medium mb-3">Backend status</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">API Base URL: <span className="font-mono">{getApiBaseUrl()}</span></p>
          <div className="mt-3">
            {loading && <p className="text-sm">Checking backend…</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!loading && !error && (
              <div className="text-sm">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                  {health?.status || "unknown"}
                </span>
                {health?.app && <span className="ml-2 text-zinc-600 dark:text-zinc-300">{health.app}</span>}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-black/10 dark:border-white/15 p-5 bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Salary records</h2>
            <button className="inline-flex items-center gap-2 rounded-md bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 text-sm hover:opacity-90">
              + New Salary
            </button>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/15 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300">
                <tr>
                  <th className="text-left p-3">Employee</th>
                  <th className="text-left p-3">Role</th>
                  <th className="text-right p-3">Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-black/10 dark:border-white/15">
                  <td className="p-3">—</td>
                  <td className="p-3">—</td>
                  <td className="p-3 text-right">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500 mt-3">This is a placeholder UI. We’ll wire to real endpoints next.</p>
        </section>
      </div>
    </div>
  );
}
