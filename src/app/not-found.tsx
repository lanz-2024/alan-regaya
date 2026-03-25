import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-xs font-mono text-[var(--color-accent-text)] uppercase tracking-widest mb-4">404</p>
        <h1 className="text-5xl font-bold mb-4">Page not found</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
