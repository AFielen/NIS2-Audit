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
  {
    id: 11,
    slug: 'management-schulung-nis2',
    title: 'Management-Schulung zu NIS-2/BSIG',
    priority: 'hoch',
    owner: 'Geschäftsführung',
    whyItMatters:
      '§38 BSIG verpflichtet Geschäftsleitungen ausdrücklich zur regelmäßigen Teilnahme an Schulungen zu IT-Sicherheitsrisiken. Das ist keine Empfehlung, sondern Gesetzespflicht – und gehört damit zu den wenigen NIS-2-Pflichten, die direkt die Führungsebene treffen.',
    managementAction:
      'Buchen Sie für alle Mitglieder der Geschäftsleitung eine dokumentierte Schulung zu NIS-2 und IT-Sicherheitsmanagement. IHK-Angebote, BSI-Webinare und Verbandsschulungen (z.B. DRK-Landesverband) sind anrechenbar. Wichtig: Teilnahme und Inhalt müssen nachweisbar sein.',
    practicalSteps: [
      'Schulungsangebot auswählen (IHK, BSI-Webinar, DRK-internes Angebot).',
      'Alle Mitglieder der Geschäftsleitung verbindlich einplanen.',
      'Teilnahme schriftlich dokumentieren (Zertifikat, Einladung + Anwesenheitsliste).',
      'Jährliche Wiederholung im Kalender fixieren.',
    ],
    simpleImplementation:
      'Ein 2-stündiges BSI-Webinar mit Teilnahmebestätigung reicht als Einstieg. Wichtig ist der Nachweis, nicht die Stundenanzahl.',
    doneWhen:
      'Alle Geschäftsleitungsmitglieder haben eine dokumentierte Schulung absolviert und es gibt einen Folgetermin im Kalender.',
    evidence: [
      'Teilnahmebestätigung oder Zertifikat',
      'Schulungsdatum und -thema',
      'Einladungsnachweis für alle GL-Mitglieder',
    ],
    commonMistake:
      'Nur die IT oder der ISB wird geschult, die Geschäftsleitung nimmt nicht teil – obwohl §38 BSIG explizit die Leitungsebene adressiert.',
    managementEffort:
      'Ca. 2–4 Stunden je Teilnehmer pro Jahr.',
  },
  {
    id: 12,
    slug: 'risikoanalyse-kritische-dienste',
    title: 'Risikoanalyse für kritische Dienste und Systeme',
    priority: 'hoch',
    owner: 'IT-Leitung / ISB',
    whyItMatters:
      '§30 Nr.1 BSIG fordert ausdrücklich Konzepte zur Risikoanalyse. Ohne eine strukturierte Bewertung, welche Systeme bei einem Ausfall den Rettungsdienst-Betrieb gefährden, fehlt die Grundlage für alle weiteren Schutzmaßnahmen.',
    managementAction:
      'Beauftragen Sie die IT-Leitung oder den ISB, eine einfache Risikoübersicht für die kritischsten Systeme zu erstellen: Was passiert, wenn System X ausfällt? Wie lange verträgt der Betrieb den Ausfall? Welche Maßnahmen reduzieren das Risiko?',
    practicalSteps: [
      'Die 5–10 kritischsten Systeme identifizieren (Hausnotruf, Leitstellen-Anbindung, Dienstplanung, E-Mail, AD/Entra).',
      'Je System bewerten: Eintrittswahrscheinlichkeit eines Ausfalls, maximale tolerierbare Ausfallzeit, aktuelle Schutzmaßnahmen.',
      'Ergebnis in einer einfachen Matrix dokumentieren (Excel genügt).',
      'Mindestens jährlich aktualisieren.',
    ],
    simpleImplementation:
      'Eine einfache Excel-Tabelle mit den Spalten System, Ausfallrisiko (hoch/mittel/niedrig), maximale Ausfallzeit, aktuelle Maßnahmen, offene Lücken genügt als valider Einstieg.',
    doneWhen:
      'Eine dokumentierte Risikoübersicht für die kritischsten Systeme liegt vor und ist auffindbar abgelegt.',
    evidence: [
      'Risikoübersicht/-matrix',
      'Datum der Erstellung und letzten Aktualisierung',
      'Benennung des Erstellers',
    ],
    commonMistake:
      'Es wird auf eine spätere, "richtige" Risikoanalyse gewartet. Eine einfache strukturierte Übersicht ist besser als keine.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 1 Stunde Review der Erstversion.',
  },
  {
    id: 13,
    slug: 'berechtigungskonzept-admin-trennung',
    title: 'Berechtigungskonzept und Admin-Trennung',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Überprivilegierte Konten sind einer der häufigsten Einfallstore. Wenn jeder Mitarbeitende Admin-Rechte hat oder Admins ihr privilegiertes Konto auch für E-Mail nutzen, reicht ein einzelner Phishing-Angriff für eine vollständige Kompromittierung.',
    managementAction:
      'Fordern Sie von der IT eine kurze Übersicht: Wer hat welche Admin-Rechte? Gibt es separate Admin-Konten? Wer hat Zugriff auf Backup-Systeme? Diese Liste ist die Grundlage für das Berechtigungskonzept.',
    practicalSteps: [
      'Admin-Konten von normalen Benutzerkonten trennen (kein Admin-Konto für E-Mail und Surfen).',
      'Prinzip der minimalen Rechtevergabe (Least Privilege) anwenden.',
      'Regelmäßige Überprüfung: Wer ist noch im Unternehmen? Wer hat noch welche Rechte?',
      'Offboarding-Prozess dokumentieren: Konten sofort sperren beim Ausscheiden.',
    ],
    simpleImplementation:
      'Als Einstieg genügt eine Liste aller privilegierten Konten mit Begründung, warum diese Person Admin-Rechte benötigt, und ein einfacher Offboarding-Ablauf.',
    doneWhen:
      'Alle Admin-Konten sind separat, mit MFA gesichert und dokumentiert. Es gibt einen nachweisbaren Offboarding-Prozess.',
    evidence: [
      'Liste privilegierter Konten',
      'Nachweis getrennter Admin-Accounts',
      'Offboarding-Checkliste oder -Prozess',
    ],
    commonMistake:
      'Admin-Rechte werden einmal vergeben und nie wieder entzogen, auch wenn jemand die Stelle wechselt oder das Unternehmen verlässt.',
    managementEffort:
      'Ca. 20 Minuten Beauftragung und 20 Minuten Review der Liste.',
  },
  {
    id: 14,
    slug: 'logging-monitoring',
    title: 'Logging und Monitoring etablieren',
    priority: 'mittel',
    owner: 'IT-Administration',
    whyItMatters:
      'Ohne zentrale Logs merkt man einen Angriff oft erst Tage oder Wochen nach dem Einbruch. Für die BSI-Meldepflicht (24h-Frist) ist es entscheidend, wann Kenntnis von einem Vorfall erlangt wurde – und das lässt sich nur mit Logs belegen.',
    managementAction:
      'Fragen Sie die IT: Wo werden Logs gespeichert? Wie lange? Wer schaut sie an? Gibt es automatische Alarmierung bei auffälligen Ereignissen? Wenn niemand diese Fragen beantworten kann, ist Handlungsbedarf.',
    practicalSteps: [
      'Logging für kritische Systeme aktivieren (AD/Entra, Firewall, VPN, Server).',
      'Logs zentral sammeln (SIEM-Einstieg oder zumindest zentraler Log-Server).',
      'Aufbewahrungsdauer festlegen (Empfehlung: mindestens 3 Monate).',
      'Alarmierung für kritische Ereignisse einrichten (fehlgeschlagene Anmeldeversuche, ungewöhnliche Zugriffe).',
    ],
    simpleImplementation:
      'Für kleine Verbände reicht es zunächst, Windows-Event-Logs zentral zu sammeln und Firewall-Logs aufzubewahren. Microsoft Sentinel bietet einen kostengünstigen Einstieg für M365-Umgebungen.',
    doneWhen:
      'Logs für kritische Systeme werden gesammelt, mindestens 3 Monate aufbewahrt und es gibt eine dokumentierte Zuständigkeit für die Auswertung.',
    evidence: [
      'Log-Konfiguration der kritischen Systeme',
      'Aufbewahrungsnachweis',
      'Benennung der verantwortlichen Person',
    ],
    commonMistake:
      'Logs werden zwar erzeugt, aber nie ausgewertet und nach wenigen Tagen überschrieben.',
    managementEffort:
      'Ca. 15 Minuten Beauftragung und monatlich 15 Minuten Review des Monitoring-Status.',
  },
  {
    id: 15,
    slug: 'bcm-wiederanlauf',
    title: 'BCM und Notfallbetrieb planen (RTO/RPO)',
    priority: 'hoch',
    owner: 'Geschäftsführung / IT-Leitung',
    whyItMatters:
      '§30 Nr.3 BSIG fordert Backup-Management und Krisenmanagement als Einheit. Die entscheidende Frage ist nicht nur "Haben wir ein Backup?", sondern "Wie lange darf der Rettungsdienst ohne IT-Systeme funktionieren, und haben wir das geprobt?" Business Continuity Management (BCM) ist der strukturelle Rahmen dafür.',
    managementAction:
      'Beantworten Sie zwei Fragen schriftlich: (1) Wie lange darf welcher IT-Dienst maximal ausfallen, bevor der Betrieb kritisch wird (RTO)? (2) Wie viele Stunden/Tage an Daten dürfen im schlimmsten Fall verloren gehen (RPO)? Diese Antworten sind der Kern eines BCM.',
    practicalSteps: [
      'RTO und RPO für die 5 kritischsten Systeme definieren.',
      'Notfallbetrieb beschreiben: Was passiert, wenn das Dienstplanungssystem 24h ausfällt? Welche analogen Prozesse greifen?',
      'Notfall-Kontaktliste für alle Szenarien erstellen (intern + externe Dienstleister).',
      'Einmal jährlich einen Papier-Notfalltest (Tabletop-Exercise) durchführen.',
    ],
    simpleImplementation:
      'Ein 2-seitiges Dokument mit RTO/RPO-Tabelle und Notfallkontakten ist ein valider BCM-Einstieg. Kein ISO-22301-Projekt notwendig.',
    doneWhen:
      'RTO/RPO für kritische Systeme sind definiert, ein Notfallablauf ist dokumentiert und mindestens einmal besprochen worden.',
    evidence: [
      'RTO/RPO-Tabelle',
      'Notfallkontaktliste',
      'Protokoll eines Notfalltests oder -gesprächs',
    ],
    commonMistake:
      'BCM wird als großes Projekt aufgeschoben. Eine kurze, pragmatische Übersicht schafft bereits deutlich mehr Resilienz als gar nichts.',
    managementEffort:
      'Ca. 1 Stunde Erststellung, 30 Minuten jährlicher Review.',
  },
  {
    id: 16,
    slug: 'lieferkette-it-dienstleister',
    title: 'IT-Lieferkette bewerten und vertraglich absichern',
    priority: 'mittel',
    owner: 'IT-Leitung / Geschäftsführung',
    whyItMatters:
      '§30 Nr.4 BSIG fordert die Sicherheit der Lieferkette. Wenn ein Cloud-Anbieter oder IT-Dienstleister kompromittiert wird, kann das direkt den Rettungsdienst-Betrieb treffen. Besonders bei Software-as-a-Service (Hausnotruf-Systeme, Dienstplanung) muss die Verfügbarkeit vertraglich garantiert sein.',
    managementAction:
      'Erstellen Sie eine kurze Liste Ihrer wichtigsten IT-Dienstleister und Cloud-Dienste. Prüfen Sie je Dienstleister: Gibt es SLAs zur Verfügbarkeit? Gibt es Ausfallabsicherung (Redundanz)? Sind Datenschutz und Informationssicherheit vertraglich geregelt?',
    practicalSteps: [
      'Liste der kritischen IT-Dienstleister und Cloud-Dienste erstellen (Hausnotruf, Dienstplanung, M365, Backup-Cloud etc.).',
      'Je Dienstleister prüfen: SLA vorhanden? Welche garantierte Verfügbarkeit? Was passiert bei Ausfall?',
      'Für kritische Dienste: Vertraglich Ausfallszenario und Reaktionszeit festlegen.',
      'Redundante Alternativen oder Offline-Fallback für systemkritische Dienste definieren.',
    ],
    simpleImplementation:
      'Eine einfache Tabelle mit Dienstleister, Dienst, SLA-Status und offenem Handlungsbedarf genügt als Einstieg.',
    doneWhen:
      'Alle kritischen IT-Dienstleister sind dokumentiert, SLA-Status ist bekannt und für Dienste ohne SLA gibt es einen Plan.',
    evidence: [
      'Dienstleister-Übersicht',
      'SLA-Dokumente oder Vertragsnachweise',
      'Dokumentierter Fallback-Plan für kritische Dienste',
    ],
    commonMistake:
      'Der Dienstleister wird als "vertrauenswürdig" angesehen, ohne dass SLAs oder Ausfall-Szenarien je schriftlich definiert wurden.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 1 Stunde Erstprüfung der Verträge.',
  },
  {
    id: 17,
    slug: 'dokumentation-richtlinienpaket',
    title: 'Dokumentation und Richtlinienpaket aufbauen',
    priority: 'mittel',
    owner: 'ISB / IT-Leitung',
    whyItMatters:
      '§30 BSIG schreibt vor, dass die Einhaltung der Risikomanagementmaßnahmen von Einrichtungen dokumentiert werden muss. Ohne Nachweise kann im Schadensfall oder bei einer BSI-Prüfung nicht belegt werden, dass gehandelt wurde. Dokumentation ist kein Selbstzweck, sondern Haftungsschutz.',
    managementAction:
      'Legen Sie einen zentralen Ablageort für IT-Sicherheitsdokumente fest. Beginnen Sie mit den einfachsten Nachweisen: Wer ist ISB? Wann wurde das letzte Backup getestet? Welche Schulungen wurden durchgeführt? Diese drei Dokumente sind der Einstieg.',
    practicalSteps: [
      'Zentralen Ablageort für IT-Sicherheitsdokumente definieren (SharePoint, Netzlaufwerk, Confluence).',
      'Mindest-Dokumentenset anlegen: ISB-Benennung, Backup-Testprotokoll, Schulungsnachweise, Incident-Response-Kontakte.',
      'Dokumentenverantwortung benennen: Wer pflegt welche Unterlage?',
      'Jährliche Prüfung: Sind alle Dokumente aktuell?',
    ],
    simpleImplementation:
      'Ein freigegebener SharePoint-Ordner mit klar benannten Dateien und Datum im Dateinamen ist ein vollständig ausreichender Einstieg.',
    doneWhen:
      'Ein zentraler Ablageort existiert, das Mindest-Dokumentenset liegt vor und eine verantwortliche Person ist benannt.',
    evidence: [
      'Ablageort-Nachweis',
      'Liste der vorhandenen Dokumente mit Datum',
      'Benennung des Dokumenten-Verantwortlichen',
    ],
    commonMistake:
      'Maßnahmen werden umgesetzt, aber nicht dokumentiert. Im Prüfungsfall oder nach einem Vorfall kann nichts nachgewiesen werden.',
    managementEffort:
      'Ca. 30 Minuten Erstaufbau, 15 Minuten quartalsweise Pflege.',
  },
];

export function getGrundschutzDetail(index: number): GrundschutzDetail | undefined {
  return grundschutzDetails[index];
}
