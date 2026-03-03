import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-theme(spacing.16))] flex items-center justify-center px-4">
      <div className="drk-card text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Seite nicht gefunden</h2>
        <p className="text-gray-600 mb-6">
          Die angeforderte Seite existiert leider nicht.
        </p>
        <Link href="/" className="drk-btn-primary inline-block">
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
