interface StatusDisplayProps {
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export default function StatusDisplay({ loading, error, onRetry }: StatusDisplayProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 dark:text-red-400 mb-4">
          Failed to load employee data
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-white text-sm font-medium rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return null;
}
