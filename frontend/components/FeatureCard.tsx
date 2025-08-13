export default function FeatureCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">{title}</h2>
      <p className="text-zinc-600 dark:text-zinc-300">{children}</p>
    </div>
  );
}
