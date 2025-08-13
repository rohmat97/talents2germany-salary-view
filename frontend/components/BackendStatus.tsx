import { getApiBaseUrl } from "@/lib/api";

interface BackendStatusProps {
  health: any;
  loading: boolean;
  error: string | null;
}

export default function BackendStatus({ health, loading, error }: BackendStatusProps) {
  return (
    <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-800 shadow-sm">
      <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-3">
        Backend Status
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        API Base URL: <span className="font-mono">{getApiBaseUrl()}</span>
      </p>
      <div className="mt-3">
        {loading && (
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Checking backend…
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {!loading && !error && (
          <div className="text-sm">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
              {health?.status || "unknown"}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
