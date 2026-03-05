import type { LieferkettenFrage, LieferkettenAntworten, LieferkettenErgebnis, LieferkettenAnforderung } from '@/lib/types';

export const LIEFERKETTEN_FRAGEN: LieferkettenFrage[] = [
  {
    id: 'LK-01',
    frage: 'Nutzt euer Kreisverband einen IT-Dienstleister des DRK-Landesverbands oder eine geteilte IT-Infrastruktur mit anderen Verbänden?',
    erklaerung: 'Wenn dieser IT-Dienstleister NIS-2-pflichtig ist (z.B. weil er für andere KV Rettungsdienst-IT betreibt), gelten seine Sicherheitsvorgaben auch für euch.',
    relevanzWennJa: 'Euer IT-Dienstleister wird IT-Sicherheitsanforderungen vertraglich weitergeben (MFA, Meldepflichten, Passwortrichtlinien).',
  },
  {
    id: 'LK-02',
    frage: 'Erbringt euer Kreisverband digitale Leistungen für ein Krankenhaus oder eine Reha-Einrichtung (z.B. Wäscherei, Catering, Reinigung mit digitalem Auftragssystem)?',
    erklaerung: 'Krankenhäuser sind NIS-2-pflichtig und müssen nach §30 Abs. 2 Nr. 4 BSIG ihre Lieferkette sichern.',
    relevanzWennJa: 'Das Krankenhaus muss IT-Sicherheitsanforderungen vertraglich an euch weitergeben. Erwartet: Sicherheitsfragebögen, Audit-Rechte, Meldepflichten.',
  },
  {
    id: 'LK-03',
    frage: 'Ist euer Kreisverband Teil einer gemeinsamen IT-Infrastruktur mit einem anderen KV, der Rettungsdienst erbringt?',
    erklaerung: 'Gemeinsames Active Directory, gemeinsame Server oder gemeinsames Netz reichen aus – technische Trennung ist dann nicht gegeben.',
    relevanzWennJa: 'Durch die geteilte Infrastruktur erstreckt sich der NIS-2-Scope faktisch auf euch. Ein Angriff auf euer Netz könnte den Rettungsdienst-KV treffen.',
  },
  {
    id: 'LK-04',
    frage: 'Betreibt euer Kreisverband digitale Schnittstellen oder Datenaustausch mit NIS-2-pflichtigen Einrichtungen (z.B. Leitstellen, Krankenhäuser, Rettungsdienst-Träger)?',
    erklaerung: 'API-Verbindungen, Datenaustauschplattformen oder gemeinsame Software zählen.',
    relevanzWennJa: 'Die NIS-2-pflichtige Einrichtung wird Sicherheitsanforderungen für Schnittstellen vertraglich fordern.',
  },
  {
    id: 'LK-05',
    frage: 'Erbringt euer Kreisverband Pflegeleistungen (ambulant oder stationär) für Einrichtungen, die mit einem NIS-2-pflichtigen Träger verbunden sind?',
    erklaerung: 'Komplexträger-Strukturen: Wenn ein anderer Träger euren Kreisverband als Dienstleister nutzt und selbst NIS-2-pflichtig ist.',
    relevanzWennJa: 'Vertragliche IT-Sicherheitsanforderungen und möglicherweise Audit-Rechte.',
  },
  {
    id: 'LK-06',
    frage: 'Ist euer Kreisverband Kunde eines NIS-2-pflichtigen IT-Dienstleisters?',
    erklaerung: 'Im DRK-Kontext bieten häufig Landesverbände oder verbandseigene IT-Gesellschaften IT-Dienstleistungen für Kreisverbände an. Wenn diese als Managed Service Provider (MSP) unter NIS-2 fallen, müssen sie Sicherheitsvorgaben an ihre Kunden weitergeben. Das betrifft auch externe IT-Dienstleister, die Rettungsdienst-IT oder kritische Infrastruktur betreuen.',
    relevanzWennJa: 'Euer IT-Dienstleister wird Sicherheitsvorgaben einfordern: MFA, Passwortrichtlinien, Meldung von Vorfällen innerhalb definierter Fristen.',
  },
];

export function berechneLieferkettenErgebnis(
  antworten: LieferkettenAntworten
): LieferkettenErgebnis {
  const ausloesendeFragen = Object.entries(antworten)
    .filter(([, v]) => v === true)
    .map(([k]) => k);

  const indirektBetroffen = ausloesendeFragen.length > 0;

  const betroffeheitsgrad =
    ausloesendeFragen.length >= 3 ? 'hoch' :
    ausloesendeFragen.length === 2 ? 'mittel' :
    ausloesendeFragen.length === 1 ? 'gering' : 'keiner';

  const anforderungen: LieferkettenAnforderung[] = [];

  if (indirektBetroffen) {
    anforderungen.push(
      {
        kategorie: 'Multi-Faktor-Authentifizierung',
        beschreibung: 'MFA für alle Konten mit Zugang zu geteilten Systemen oder Schnittstellen',
        wahrscheinlichkeit: 'sehr hoch',
        rechtsgrundlage: '§30 Nr. 10 BSIG (über Lieferkette)',
        gfHinweis: 'IT beauftragen, MFA für alle relevanten Konten einzurichten (E-Mail, VPN, Admin-Zugänge, Cloud-Dienste). Budget: gering — oft in bestehenden Microsoft 365- oder Google-Lizenzen enthalten. Zeitrahmen: 1–2 Wochen.',
      },
      {
        kategorie: 'Sicherheitsfragebogen',
        beschreibung: 'Nachweis eurer IT-Sicherheitsmaßnahmen auf Anforderung des Partners',
        wahrscheinlichkeit: 'sehr hoch',
        rechtsgrundlage: '§30 Nr. 4 BSIG',
        gfHinweis: 'Einen Verantwortlichen benennen, der Sicherheitsfragebögen der Partner beantwortet. Vorab: IT-Dokumentation aktualisieren — Netzplan, Backup-Konzept, Zugriffsliste und Notfallplan sollten aktuell und auffindbar sein.',
      },
      {
        kategorie: 'Meldepflicht bei Vorfällen',
        beschreibung: 'Meldung von Sicherheitsvorfällen an den NIS-2-pflichtigen Partner (oft 24h)',
        wahrscheinlichkeit: 'hoch',
        rechtsgrundlage: '§30 Nr. 4 BSIG i.V.m. Vertragsrecht',
        gfHinweis: 'Internen Meldeprozess definieren: Wer meldet an wen innerhalb von 24 Stunden? Kontaktdaten des Partners für Sicherheitsmeldungen einholen und intern hinterlegen. Verantwortliche Person für Vorfallmeldungen benennen.',
      },
      {
        kategorie: 'Patch-Management',
        beschreibung: 'Nachweis zeitnaher Sicherheitsupdates aller verbundenen Systeme',
        wahrscheinlichkeit: 'hoch',
        rechtsgrundlage: '§30 Nr. 5 BSIG',
        gfHinweis: 'IT-Leitung beauftragen, einen Patch-Prozess zu dokumentieren: Kritische Sicherheitsupdates innerhalb von 72 Stunden einspielen, regelmäßige Prüfintervalle festlegen. Nachweis über durchgeführte Updates führen.',
      },
    );

    if (ausloesendeFragen.includes('LK-01') || ausloesendeFragen.includes('LK-06')) {
      anforderungen.push({
        kategorie: 'Passwortrichtlinien & Konten-Hygiene',
        beschreibung: 'Starke Passwörter, keine geteilten Accounts, regelmäßige Zugriffsreviews',
        wahrscheinlichkeit: 'sehr hoch',
        rechtsgrundlage: '§30 Nr. 9 BSIG (über IT-Dienstleister)',
        gfHinweis: 'Verbandweite Passwortrichtlinie einführen: Mindestens 12 Zeichen, keine geteilten Accounts, regelmäßige Zugriffsüberprüfung. Die IT kann das technisch über Active Directory oder Microsoft 365 erzwingen.',
      });
    }

    if (ausloesendeFragen.includes('LK-03')) {
      anforderungen.push({
        kategorie: 'Netztrennung / Segmentierung',
        beschreibung: 'Euer Netz darf keine Brücke zum Rettungsdienst-Netz bilden – aktive Segmentierung erforderlich',
        wahrscheinlichkeit: 'sehr hoch',
        rechtsgrundlage: '§30 Nr. 5 BSIG + technischer Scope',
        gfHinweis: 'IT-Leitung mit Netzwerk-Segmentierung beauftragen: Das RD-Netz muss physisch oder logisch vom restlichen Verbandsnetz getrennt sein. Ggf. externen Netzwerk-Dienstleister hinzuziehen. Budget und Zeitrahmen mit IT klären.',
      });
    }
  }

  const empfehlung = !indirektBetroffen
    ? 'Aktuell keine indirekte NIS-2-Betroffenheit erkennbar. IT-Sicherheit trotzdem auf angemessenem Niveau halten.'
    : betroffeheitsgrad === 'hoch'
    ? 'Erhebliche indirekte Betroffenheit. Proaktiv mit Partnern sprechen, bevor erste Sicherheitsanforderungen per Brief kommen. Basishygiene (MFA, Backup, Meldeprozess) jetzt umsetzen.'
    : 'Indirekte Betroffenheit über Lieferkette. Basishygiene-Maßnahmen umsetzen und auf erste Anforderungen der Partner vorbereiten.';

  return {
    indirektBetroffen,
    betroffeheitsgrad,
    ausloesendeFragen,
    anforderungen,
    empfehlung,
  };
}
