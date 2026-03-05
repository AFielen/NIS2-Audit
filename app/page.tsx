import Link from 'next/link';

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CheckListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ScopeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function RoadmapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-[calc(100vh-theme(spacing.16))] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero */}
        <div className="drk-card drk-fade-in">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl shrink-0" style={{ background: 'var(--drk-bg)', color: 'var(--drk)' }}>
              <ShieldIcon />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                NIS-2 Self-Check für DRK-Verbände
              </h2>
              <p style={{ color: 'var(--text-light)' }}>
                Prüfen Sie in 10–15 Minuten die wahrscheinliche NIS-2-Betroffenheit Ihres Verbands.
                Juristischer Scope, technischer Scope und eine priorisierte 90-Tage-Roadmap – alles in einem Tool.
              </p>
              <div className="mt-4">
                <Link href="/check" className="drk-btn-primary">
                  Self-Check starten
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Check – aktiv */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 drk-slide-up">
          <Link href="/check" className="drk-card text-center hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-3" style={{ color: 'var(--drk)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>Self-Check</h3>
            <p className="text-xs" style={{ color: 'var(--text-light)' }}>
              Bin ich betroffen?<br />10–15 min
            </p>
          </Link>
        </div>

        {/* Module-Feature-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 drk-slide-up">
          <Link href="/kosten" className="drk-card text-center hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-3" style={{ color: 'var(--drk)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>Kostenrechner</h3>
            <p className="text-xs" style={{ color: 'var(--text-light)' }}>
              Was kostet NIS-2 meinen KV?<br />Bundesland-spezifisch
            </p>
          </Link>

          <Link href="/lieferkette" className="drk-card text-center hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-3" style={{ color: 'var(--drk)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>Indirekte Betroffenheit</h3>
            <p className="text-xs" style={{ color: 'var(--text-light)' }}>
              Auch ohne Rettungsdienst<br />betroffen?
            </p>
          </Link>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 drk-slide-up">
          <div className="drk-card text-center">
            <div className="flex justify-center mb-3" style={{ color: 'var(--drk)' }}>
              <CheckListIcon />
            </div>
            <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>Betroffenheit prüfen</h3>
            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
              Juristische Einordnung anhand von Organisationsstruktur, Leistungen und Schwellenwerten.
            </p>
          </div>

          <div className="drk-card text-center">
            <div className="flex justify-center mb-3" style={{ color: 'var(--drk)' }}>
              <ScopeIcon />
            </div>
            <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>Scope bewerten</h3>
            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
              Juristischen und technischen Scope getrennt ausweisen – inkl. Shared-IT-Analyse.
            </p>
          </div>

          <div className="drk-card text-center">
            <div className="flex justify-center mb-3" style={{ color: 'var(--drk)' }}>
              <RoadmapIcon />
            </div>
            <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>Roadmap erhalten</h3>
            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
              Priorisierte 90-Tage-Maßnahmen, passend zu Ihrem Ergebnis und Reifegrad.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="drk-card border-l-4" style={{ borderLeftColor: 'var(--info)', background: 'var(--info-bg)' }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
              <ClockIcon />
              Dauer ca. 10–15 Minuten
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-light)' }}>
              <LockIcon />
              Alle Daten verbleiben in Ihrem Browser. Kein Server, keine Cookies, keine externen Dienste.
            </div>
            <p className="text-sm" style={{ color: 'var(--text-light)' }}>
              Regelwerk: <strong>DRK Standard Pack v1.0</strong> — Rettungsdienst wird als potenziell NIS-2-relevante Einrichtungsart behandelt.
            </p>
          </div>
        </div>

        {/* Grundschutz-10 Schnelleinstieg */}
        <div className="drk-card drk-fade-in">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl shrink-0" style={{ background: '#eff6ff', color: 'var(--info)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
                Grundschutz-10
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
                Die 10 wichtigsten Sicherheits-Basismaßnahmen für DRK-Verbände — unabhängig von NIS-2.
                Konkrete Handlungsempfehlungen mit Schritt-für-Schritt-Anleitungen für die Geschäftsführung.
              </p>
              <Link href="/grundschutz" className="drk-btn-secondary">
                Grundschutz-10 ansehen
              </Link>
            </div>
          </div>
        </div>

        {/* Weitere Angebote */}
        <div className="drk-card">
          <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>
            Was wir sonst noch entwickeln
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
            Datensparsame, Open-Source-Werkzeuge für die Vereins- und Verbandsarbeit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="https://abstimmung.henryagi.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg border transition-colors hover:border-gray-300"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
                   style={{ background: '#fce4ec', color: 'var(--drk)' }}>
                🗳️
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  DRK Vereinsabstimmung
                  <span className="ml-2 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                        style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                    Live
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>
                  Digitales Abstimmungssystem für Mitgliederversammlungen — live, anonym und DSGVO-konform.
                </p>
              </div>
            </a>

            <a
              href="https://selbstauskunft.henryagi.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg border transition-colors hover:border-gray-300"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
                   style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                📝
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  DRK Selbstauskunft
                  <span className="ml-2 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                        style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                    Live
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>
                  Digitale Selbstauskunft für Ehrenamtliche — serverlos, datenschutzkonform, direkt im Browser.
                </p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-start gap-3 p-3 rounded-lg border transition-colors hover:border-gray-300"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
                   style={{ background: '#e3f2fd', color: '#1976d2' }}>
                🤖
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  HenryGPT
                  <span className="ml-2 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                        style={{ background: '#fff3e0', color: '#e65100' }}>
                    In Entwicklung
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>
                  Intelligenter KI-Assistent speziell für das DRK — DSGVO-konform in eigener Umgebung.
                </p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-start gap-3 p-3 rounded-lg border transition-colors hover:border-gray-300"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
                   style={{ background: '#f3e5f5', color: '#7b1fa2' }}>
                📋
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  Digitale Gremienarbeit
                  <span className="ml-2 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                        style={{ background: '#fff3e0', color: '#e65100' }}>
                    In Entwicklung
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>
                  Sitzungsmanagement, Beschlussdokumentation und Protokollführung — datenschutzkonform.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
