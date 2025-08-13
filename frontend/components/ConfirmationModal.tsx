interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({ 
  title, 
  message, 
  onConfirm, 
  onCancel 
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-lg max-w-md w-full">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          {message}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-white text-sm font-medium rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
