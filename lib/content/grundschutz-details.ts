export interface GrundschutzDetail {
  id: number;
  slug: string;
  title: string;
  priority: 'hoch' | 'mittel' | 'niedrig';
  owner: string;
  whyItMatters: string;
  managementAction: string;
  practicalSteps: string[];
  simpleImplementation: string;
  doneWhen: string;
  evidence: string[];
  commonMistake: string;
  managementEffort: string;
}

export const grundschutzDetails: GrundschutzDetail[] = [
  {
    id: 1,
    slug: 'verantwortlichkeit-benennen',
    title: 'Verantwortlichkeit benennen (ISB/CISO)',
    priority: 'hoch',
    owner: 'Geschäftsführung',
    whyItMatters:
      'Ohne klar benannte Verantwortung bleibt IT-Sicherheit ein Diffusionsthema. Für die Geschäftsführung muss eindeutig feststehen, wer das Thema operativ steuert, berichtet und nachhält.',
    managementAction:
      'Benennen Sie innerhalb der nächsten 7 Tage eine konkrete Person als verantwortliche Stelle für IT-Sicherheit. Das kann intern die IT-Leitung sein oder extern ein Dienstleister/Berater in einer klar beschriebenen Rolle. Wichtig ist nicht Vollzeit, sondern eindeutige Zuständigkeit und Berichtslinie an die Geschäftsführung.',
    practicalSteps: [
      'Eine Person namentlich benennen.',
      'Die Aufgabe kurz schriftlich festhalten: Ansprechpartner für IT-Sicherheit, Koordination der Maßnahmen, Bericht an die Geschäftsführung, Pflege der Nachweise.',
      'Einen festen monatlichen 30-Minuten-Termin zur Statusmeldung einrichten.',
    ],
    simpleImplementation:
      'Eine kurze Benennung per Beschluss, E-Mail oder Aufgabenvermerk reicht zunächst aus, wenn Name, Aufgabe und Berichtspflicht klar dokumentiert sind.',
    doneWhen:
      'Es gibt eine benannte Person, eine kurze Aufgabenbeschreibung und einen festen Reporting-Termin an die Geschäftsführung.',
    evidence: [
      'Benennungsschreiben, Beschluss oder E-Mail',
      'Kurzbeschreibung der Rolle',
      'Kalendereintrag für den Status-Termin',
    ],
    commonMistake:
      'Alle gehen davon aus, dass „die IT das schon macht", aber niemand ist offiziell beauftragt.',
    managementEffort:
      'Ca. 30 Minuten für Benennung und 15 Minuten pro Monat für Statusgespräch.',
  },
  {
    id: 2,
    slug: 'asset-inventar-erstellen',
    title: 'Asset-Inventar erstellen',
    priority: 'hoch',
    owner: 'IT-Leitung',
    whyItMatters:
      'Man kann nur schützen, was man kennt. Ohne eine einfache Übersicht über Systeme, Dienste und Verantwortliche bleiben Lücken bei Updates, Backups und Notfallplanung unsichtbar.',
    managementAction:
      'Beauftragen Sie die IT-Leitung oder den IT-Dienstleister, innerhalb von 10 Arbeitstagen eine einfache Liste der wichtigsten Systeme zu erstellen. Kein Großprojekt, keine perfekte CMDB — nur eine belastbare Grundübersicht.',
    practicalSteps: [
      'Mit den wirklich kritischen Systemen starten: M365/Entra, Server, Firewall, Backup, Internetzugang, wichtige Fachanwendungen, NAS, zentrale Netzwerkkomponenten.',
      'Mindestens erfassen: Hostname/Systemname, Standort, Zweck, Verantwortlicher, Betriebsmodell (intern/extern/cloud).',
      'Die Liste zentral ablegen und festlegen, wer sie künftig aktualisiert.',
    ],
    simpleImplementation:
      'Eine Excel-, SharePoint- oder Tabellenliste genügt zunächst vollständig, wenn die wichtigsten Systeme enthalten sind.',
    doneWhen:
      'Die wichtigsten Systeme sind erfasst, ein Verantwortlicher ist je System erkennbar und die Liste liegt zentral auffindbar vor.',
    evidence: [
      'Asset-Liste',
      'Ablageort der Liste',
      'Benennung, wer Aktualisierungen pflegt',
    ],
    commonMistake:
      'Es wird versucht, sofort alle Geräte inklusive Drucker und Kleinteile perfekt zu inventarisieren. Das verzögert den Start unnötig.',
    managementEffort:
      'Ca. 20 Minuten Beauftragung und 15 Minuten Review der ersten Liste.',
  },
  {
    id: 3,
    slug: 'mfa-admin-konten',
    title: 'MFA für privilegierte Konten aktivieren',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Gestohlene Admin-Zugänge sind einer der häufigsten und folgenreichsten Wege für Angriffe. MFA für privilegierte Konten ist eine der wirksamsten Sofortmaßnahmen.',
    managementAction:
      'Geben Sie die verbindliche Anweisung, dass alle Admin-Konten und alle Remote-Zugänge bis zu einem festen Datum mit MFA abgesichert werden. Ausnahmen nur schriftlich, befristet und begründet.',
    practicalSteps: [
      'Liste aller privilegierten Konten und aller Remote-Zugänge vom Dienstleister oder der IT anfordern.',
      'Für alle Admin-Konten MFA aktivieren.',
      'Geteilte oder generische Admin-Konten beenden oder kurzfristig sauber dokumentieren und ablösen.',
    ],
    simpleImplementation:
      'Wenn Microsoft 365 / Entra oder ein VPN vorhanden ist, kann MFA in der Regel ohne große Projektlaufzeit eingeführt werden. Fokus zuerst auf Admins und Fernzugriffe.',
    doneWhen:
      'Alle privilegierten Konten und Remote-Zugänge sind mit MFA geschützt oder es gibt dokumentierte, befristete Ausnahmen.',
    evidence: [
      'Liste der Admin-Konten',
      'Screenshot oder Export der MFA-Aktivierung',
      'Liste dokumentierter Ausnahmen',
    ],
    commonMistake:
      'MFA wird nur für normale Benutzer aktiviert, aber nicht für Administratoren oder externe Fernwartungszugänge.',
    managementEffort:
      'Ca. 15 Minuten Entscheidung und 15 Minuten Abnahme mit Nachweis.',
  },
  {
    id: 4,
    slug: 'offline-backup',
    title: 'Offline-Backup einrichten (3-2-1-Regel)',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Ein Backup schützt nur dann, wenn es bei einem Angriff nicht gleich mitverschlüsselt oder gelöscht wird. Deshalb braucht es mindestens eine vom Netz getrennte oder unveränderbare Sicherung.',
    managementAction:
      'Lassen Sie sich kurzfristig schriftlich beantworten: Wo liegen die Backups? Welche Kopie ist offline oder immutable? Wie lange werden sie aufbewahrt? Wer hat Zugriff? Wenn das niemand klar beantworten kann, ist das Thema sofort priorisiert umzusetzen.',
    practicalSteps: [
      '3-2-1-Regel als Mindestziel festlegen: 3 Kopien, 2 Medien, 1 offline oder unveränderbar.',
      'Zugriff auf Backup-Systeme auf wenige berechtigte Personen beschränken.',
      'Eine kurze Backup-Übersicht erstellen: was wird gesichert, wohin, wie oft, wie lange.',
    ],
    simpleImplementation:
      'Auch bei kleinen Verbänden reicht zunächst ein pragmatisches Konzept, wenn mindestens eine Sicherung technisch vom Produktivnetz getrennt ist oder als immutable Backup betrieben wird.',
    doneWhen:
      'Es gibt mindestens eine getrennte oder unveränderbare Sicherung und ein kurzes, verständliches Backup-Konzept.',
    evidence: [
      'Backup-Kurzkonzept',
      'Nachweis der Offline-/Immutable-Komponente',
      'Benennung der Zugriffsberechtigten',
    ],
    commonMistake:
      'Es gibt zwar Backups, aber sie hängen dauerhaft am Netzwerk oder sind mit denselben Admin-Zugängen erreichbar wie die Produktivsysteme.',
    managementEffort:
      'Ca. 20 Minuten Anforderung und 20 Minuten Review des Konzepts.',
  },
  {
    id: 5,
    slug: 'restore-test',
    title: 'Restore-Test durchführen',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Ein Backup ist erst dann verlässlich, wenn die Wiederherstellung tatsächlich funktioniert. Viele Organisationen merken erst im Ernstfall, dass Sicherungen unvollständig oder unbrauchbar sind.',
    managementAction:
      'Legen Sie noch in diesem Monat einen ersten Restore-Test fest. Nicht theoretisch, sondern praktisch: Eine Datei, ein Ordner oder möglichst ein System wird aus dem Backup zurückgeholt. Das Ergebnis wird protokolliert.',
    practicalSteps: [
      'Einen konkreten Testgegenstand festlegen.',
      'Den Restore in einer sicheren Testumgebung oder geordneten Umgebung durchführen.',
      'Dauer, Ergebnis, Probleme und Folgemaßnahmen protokollieren.',
    ],
    simpleImplementation:
      'Für den ersten Schritt reicht ein sauber dokumentierter Test einer Datei- oder Systemwiederherstellung aus. Wichtig ist, dass wirklich getestet wird.',
    doneWhen:
      'Es liegt ein Restore-Protokoll mit Datum, Verantwortlichem, Ergebnis und ggf. Maßnahmen vor.',
    evidence: [
      'Restore-Testprotokoll',
      'Datum des Tests',
      'Liste offener Punkte aus dem Test',
    ],
    commonMistake:
      'Der Dienstleister bestätigt nur mündlich, dass das Backup „funktioniert", aber es wurde nie praktisch getestet.',
    managementEffort:
      'Ca. 10 Minuten Terminfreigabe und 15 Minuten Sichtung des Testprotokolls.',
  },
  {
    id: 6,
    slug: 'netzwerk-segmentierung',
    title: 'Netzwerk-Segmentierung prüfen',
    priority: 'mittel',
    owner: 'IT-Administration / Dienstleister',
    whyItMatters:
      'Wenn alle Systeme in einem gemeinsamen Netz hängen, kann sich ein Vorfall leichter ausbreiten. Eine einfache Trennung reduziert den Schaden und verbessert die Abgrenzung zwischen Rettungsdienst und übriger Verbands-IT.',
    managementAction:
      'Lassen Sie sich einen einfachen Netzplan geben und beantworten Sie drei Fragen: Sind Rettungsdienst und Verwaltung technisch getrennt? Gibt es getrennte WLANs oder VLANs? Sind Zugriffe zwischen Segmenten über Regeln steuerbar?',
    practicalSteps: [
      'Mindestens Rettungsdienst, Verwaltung, Server und Gästezugänge trennen.',
      'Zwischen Segmenten nur notwendige Verbindungen zulassen.',
      'Die wichtigsten Firewall-Regeln und Netzsegmente kurz dokumentieren.',
    ],
    simpleImplementation:
      'Für kleine und mittlere Verbände reicht zunächst oft eine saubere VLAN-Trennung mit dokumentierten Firewall-Regeln. Es braucht nicht sofort eine vollständige Neuarchitektur.',
    doneWhen:
      'Es gibt einen einfachen Netzplan und nachvollziehbare technische Trennungen zwischen kritischen Bereichen.',
    evidence: [
      'Netzplan oder Architektur-Skizze',
      'Kurzübersicht der Segmente',
      'Dokumentierte Übergänge/Firewall-Regeln',
    ],
    commonMistake:
      'Es gibt nur unterschiedliche IP-Bereiche, aber in Wahrheit kann trotzdem jedes Segment auf alles zugreifen.',
    managementEffort:
      'Ca. 20 Minuten Sichtung des Netzplans und 20 Minuten Abstimmung mit IT oder Dienstleister.',
  },
  {
    id: 7,
    slug: 'incident-response-kontakte',
    title: 'Incident-Response-Kontakte dokumentieren',
    priority: 'hoch',
    owner: 'IT-Leitung / Geschäftsführung',
    whyItMatters:
      'Im Sicherheitsvorfall scheitert vieles nicht an Technik, sondern an fehlender Erreichbarkeit und unklaren Zuständigkeiten. Wer informiert wen, wer entscheidet, wer meldet — das muss vorher feststehen.',
    managementAction:
      'Legen Sie eine kurze Vorfall-Kontaktliste an. Darin stehen mindestens: Geschäftsführung, IT-Verantwortliche, IT-Dienstleister, Datenschutz, Kommunikationsverantwortliche und wer eine Meldung an das BSI vorbereitet bzw. abgibt.',
    practicalSteps: [
      'Eine 1-seitige Kontaktliste mit Namen, Funktion, Telefonnummer und E-Mail erstellen.',
      'Eine einfache Reihenfolge festlegen: Wer wird zuerst angerufen, wer entscheidet über Eskalation, wer übernimmt externe Meldungen.',
      'Die Liste digital und ausgedruckt verfügbar machen.',
    ],
    simpleImplementation:
      'Eine einfache Notfallkarte oder ein PDF reicht aus, wenn alle wesentlichen Personen aktuell enthalten sind.',
    doneWhen:
      'Es gibt eine aktuelle Kontaktliste, eine grobe Eskalationsreihenfolge und die Verantwortlichkeit für externe Meldungen ist geklärt.',
    evidence: [
      'Vorfall-Kontaktliste',
      'Ablageort digital/physisch',
      'Benennung der Meldungsverantwortung',
    ],
    commonMistake:
      'Kontaktdaten liegen nur in E-Mail-Postfächern oder bei einer einzigen Person und sind im Störungsfall nicht zugänglich.',
    managementEffort:
      'Ca. 30 Minuten Abstimmung und Freigabe.',
  },
  {
    id: 8,
    slug: 'passwort-richtlinie',
    title: 'Passwort-Richtlinie umsetzen',
    priority: 'mittel',
    owner: 'IT-Administration',
    whyItMatters:
      'Schwache oder wiederverwendete Passwörter sind ein alltägliches Einfallstor. Eine einfache und verständliche Richtlinie schafft schnell ein Mindestniveau und lässt sich technisch teilweise erzwingen.',
    managementAction:
      'Geben Sie eine kurze, einfache Passwort-Richtlinie frei und lassen Sie diese technisch und organisatorisch umsetzen. Die Regel muss verständlich sein und an alle Mitarbeitenden kommuniziert werden.',
    practicalSteps: [
      'Mindeststandard festlegen: mindestens 12 Zeichen, keine Wiederverwendung, Kontosperre nach Fehlversuchen, keine Passwortweitergabe.',
      'Wenn möglich technische Vorgaben in AD/M365/VPN umsetzen.',
      'Die Regel kurz kommunizieren: E-Mail, Intranet oder Mitarbeitenden-Info.',
    ],
    simpleImplementation:
      'Es reicht zunächst eine kurze Richtlinie auf 1 Seite plus technische Mindestparameter in den zentralen Systemen.',
    doneWhen:
      'Die Richtlinie ist dokumentiert, kommuniziert und die wichtigsten technischen Systeme setzen sie durch.',
    evidence: [
      'Passwort-Richtlinie',
      'Kommunikationsnachweis an Mitarbeitende',
      'Screenshot oder Nachweis technischer Einstellungen',
    ],
    commonMistake:
      'Es gibt nur mündliche Erwartungen, aber keine dokumentierte und technisch nachvollziehbare Regel.',
    managementEffort:
      'Ca. 15 Minuten Freigabe und 15 Minuten Nachweisprüfung.',
  },
  {
    id: 9,
    slug: 'patch-management',
    title: 'Patch-Management etablieren',
    priority: 'mittel',
    owner: 'IT-Administration',
    whyItMatters:
      'Nicht eingespielte Sicherheitsupdates gehören zu den häufigsten Ursachen für vermeidbare Sicherheitsvorfälle. Ein einfacher Standard für Prioritäten und Intervalle bringt schnell Ordnung in das Thema.',
    managementAction:
      'Legen Sie gemeinsam mit IT oder Dienstleister eine einfache Patch-Regel fest: Kritische Sicherheitsupdates schnell, übrige Updates in einem geregelten Zyklus. Wichtig ist weniger Perfektion als Verlässlichkeit und Nachweisbarkeit.',
    practicalSteps: [
      'Kritische externe oder besonders gefährdete Systeme priorisieren.',
      'Kritische Sicherheitsupdates innerhalb von 72 Stunden als Ziel definieren.',
      'Monatlichen Patch-Review oder Dienstleisterbericht einführen.',
    ],
    simpleImplementation:
      'Ein kurzer Patch-Plan mit Verantwortlichem, Fristen und monatlichem Status reicht für den ersten Schritt aus.',
    doneWhen:
      'Es gibt einen dokumentierten Patch-Prozess, einen Verantwortlichen und einen aktuellen Statusbericht.',
    evidence: [
      'Patch-Plan oder Kurzprozess',
      'Monatlicher Statusbericht oder Dienstleister-Report',
      'Liste offener Ausnahmen',
    ],
    commonMistake:
      'Es wird gepatcht „wenn Zeit ist", aber ohne Priorisierung, Frist und Nachweis.',
    managementEffort:
      'Ca. 20 Minuten Festlegung der Grundregel und 10 Minuten monatliche Sichtung.',
  },
  {
    id: 10,
    slug: 'awareness-massnahme',
    title: 'Awareness-Maßnahme durchführen',
    priority: 'niedrig',
    owner: 'IT-Leitung / Personal',
    whyItMatters:
      'Viele Angriffe beginnen nicht mit Technik, sondern mit einer E-Mail, einem Anruf oder einer falschen Freigabe. Eine kurze Sensibilisierung senkt das Risiko spürbar und ist mit geringem Aufwand umsetzbar.',
    managementAction:
      'Veranlassen Sie innerhalb der nächsten 60 Tage mindestens eine kurze Sensibilisierungsmaßnahme für Mitarbeitende. Das kann ein kurzer Workshop, ein E-Learning oder eine kompakte Infoveranstaltung sein.',
    practicalSteps: [
      'Inhalt auf das Wesentliche beschränken: Phishing, Anhänge, verdächtige Anrufe, Meldeweg.',
      'Lieber kurz und verständlich als umfangreich und theoretisch.',
      'Teilnahme oder Durchführung dokumentieren.',
    ],
    simpleImplementation:
      'Ein 20- bis 30-minütiges Format oder ein kurzes E-Learning mit anschließender Teilnehmerliste reicht als erster Schritt aus.',
    doneWhen:
      'Mindestens eine Awareness-Maßnahme wurde durchgeführt und die Teilnahme ist dokumentiert.',
    evidence: [
      'Präsentation, E-Learning oder Schulungsunterlage',
      'Teilnehmerliste oder Versandnachweis',
      'Hinweis auf internen Meldeweg',
    ],
    commonMistake:
      'Das Thema wird für „später" geplant, obwohl es mit minimalem Aufwand sofort umsetzbar wäre.',
    managementEffort:
      'Ca. 15 Minuten Freigabe und 10 Minuten Sichtung des Nachweises.',
  },
];

export function getGrundschutzDetail(index: number): GrundschutzDetail | undefined {
  return grundschutzDetails[index];
}
