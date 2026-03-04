import type { GrundschutzDetail } from './grundschutz-details';

// ── Klein (S) — 9 Items ──

export const roadmap90DetailsS: GrundschutzDetail[] = [
  {
    id: 101,
    slug: 's-isb-projektauftrag',
    title: 'Tag 1–10: ISB benennen + Projektauftrag',
    priority: 'hoch',
    owner: 'Geschäftsführung',
    whyItMatters:
      'Ohne eine benannte, verantwortliche Person bleibt NIS-2-Compliance ein unkoordiniertes Sammelsurium aus Einzelaktionen. Der ISB ist die zentrale Drehscheibe für alle weiteren Maßnahmen und direkter Ansprechpartner für die Geschäftsführung.',
    managementAction:
      'Benennen Sie innerhalb von 10 Tagen eine Person als ISB (auch nebenamtlich möglich) und erteilen Sie einen schriftlichen Projektauftrag für die NIS-2-Umsetzung. Der Auftrag muss Ziel, Zeitrahmen und Budget-Rahmen enthalten.',
    practicalSteps: [
      'Person auswählen: IT-Leitung, technikaffine Führungskraft oder externer Berater.',
      'ISB-Benennung schriftlich dokumentieren (Name, Aufgaben, Berichtspflicht an GF).',
      'Projektauftrag erstellen: Ziel „NIS-2-Compliance in 90 Tagen", Meilensteine, geschätztes Budget.',
      'Ersten Statustermin innerhalb von 14 Tagen im Kalender fixieren.',
    ],
    simpleImplementation:
      'Ein einseitiger Projektauftrag mit Benennung, Zielen und Zeitplan reicht. Kein Projektmanagement-Tool nötig.',
    doneWhen:
      'ISB ist benannt, Projektauftrag ist von der Geschäftsführung unterschrieben und ein erster Statustermin steht.',
    evidence: [
      'ISB-Benennungsschreiben',
      'Projektauftrag mit GF-Unterschrift',
      'Kalendereintrag für Statustermin',
    ],
    commonMistake:
      'Die Benennung erfolgt mündlich oder „informell" — im Prüfungsfall fehlt der Nachweis.',
    managementEffort:
      'Ca. 1 Stunde für Benennung und Projektauftrag.',
  },
  {
    id: 102,
    slug: 's-mfa-admins',
    title: 'Tag 1–15: MFA für alle Admins + Remote',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Kompromittierte Admin-Zugänge sind der häufigste Angriffsvektor bei Ransomware-Attacken. Ein einzelnes ungesichertes Admin-Konto kann den gesamten Verband kompromittieren. MFA ist die wirksamste Sofortmaßnahme.',
    managementAction:
      'Geben Sie die verbindliche Anweisung: Bis Tag 15 müssen alle Admin-Konten und Remote-Zugänge mit MFA gesichert sein. Keine Ausnahmen ohne schriftliche Begründung und Befristung.',
    practicalSteps: [
      'Liste aller Admin-Konten und Remote-Zugänge (VPN, RDP) von IT/Dienstleister anfordern.',
      'MFA in Entra ID / M365 für alle Global Admins, Exchange Admins, Intune Admins aktivieren.',
      'VPN-Zugänge mit MFA absichern (TOTP oder Push-Authentifizierung).',
      'Geteilte Admin-Konten identifizieren und personalisieren oder befristet dokumentieren.',
    ],
    simpleImplementation:
      'Microsoft Authenticator App für M365-Konten, TOTP-App für VPN. Beides ist kostenlos und innerhalb eines Tages einrichtbar.',
    doneWhen:
      'Alle Admin-Konten und Remote-Zugänge sind MFA-geschützt. Ausnahmen sind dokumentiert und befristet.',
    evidence: [
      'Liste der Admin-Konten mit MFA-Status',
      'Screenshot Conditional-Access-Policy oder MFA-Konfiguration',
      'Liste dokumentierter Ausnahmen mit Ablaufdatum',
    ],
    commonMistake:
      'MFA wird nur für normale User aktiviert, aber Admins und Dienstleister-Fernwartungszugänge werden vergessen.',
    managementEffort:
      'Ca. 15 Minuten Anweisung, 15 Minuten Abnahme der Nachweise.',
  },
  {
    id: 103,
    slug: 's-backup-offline',
    title: 'Tag 1–20: Backup prüfen und Offline-Kopie einrichten',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Bei einem Ransomware-Angriff werden alle erreichbaren Backups mitverschlüsselt. Ohne eine physisch oder logisch getrennte Sicherung steht der Verband vor einem Totalverlust. Der Restore-Test beweist, dass die Wiederherstellung tatsächlich funktioniert.',
    managementAction:
      'Fordern Sie von der IT bis Tag 20 eine schriftliche Antwort auf drei Fragen: (1) Wo liegen unsere Backups? (2) Welche Kopie ist offline oder unveränderbar? (3) Wurde jemals ein Restore getestet? Wenn Frage 2 oder 3 mit „Nein" beantwortet wird, sofort handeln.',
    practicalSteps: [
      'Aktuellen Backup-Stand inventarisieren: Was wird gesichert, wohin, wie oft?',
      'Offline-Medium beschaffen und einrichten (USB-HDD mit Rotation, Tape oder Cloud-Immutable-Storage).',
      'Ersten Restore-Test durchführen: Mindestens eine Dateiwiederherstellung, besser ein ganzes System.',
      'Restore-Test mit Datum, Dauer, Ergebnis und Problemen protokollieren.',
    ],
    simpleImplementation:
      'Eine rotierende USB-Festplatte, die nach dem Backup physisch getrennt aufbewahrt wird, reicht als Einstieg. Wichtig: Wöchentlich wechseln.',
    doneWhen:
      'Es gibt mindestens eine Offline-/Immutable-Sicherung, ein dokumentiertes Backup-Konzept und ein erstes Restore-Testprotokoll.',
    evidence: [
      'Backup-Konzept (Was, wohin, wie oft, Aufbewahrung)',
      'Nachweis der Offline-/Immutable-Komponente',
      'Restore-Testprotokoll mit Datum und Ergebnis',
    ],
    commonMistake:
      'Der Dienstleister versichert, „Backups laufen", aber niemand hat je einen Restore getestet oder weiß, ob die Sicherung offline liegt.',
    managementEffort:
      'Ca. 20 Minuten Beauftragung, 20 Minuten Sichtung der Ergebnisse.',
  },
  {
    id: 104,
    slug: 's-asset-netzplan',
    title: 'Tag 15–30: Asset-Liste und Netzplan erstellen',
    priority: 'hoch',
    owner: 'IT-Leitung',
    whyItMatters:
      'Ohne eine Übersicht über alle IT-Systeme können weder Risiken bewertet noch Schutzmaßnahmen priorisiert werden. Der Netzplan zeigt, wo Verbindungen bestehen und wo Segmentierung fehlt — beides Kernthemen bei einer BSI-Prüfung.',
    managementAction:
      'Beauftragen Sie die IT, innerhalb von zwei Wochen eine einfache Asset-Liste und einen groben Netzplan zu erstellen. Kein perfektes CMDB-Projekt, sondern eine belastbare Erstaufnahme.',
    practicalSteps: [
      'Alle Server, Clients, Netzwerkkomponenten, Drucker und Cloud-Dienste erfassen.',
      'Pro System mindestens: Name, Standort, Zweck, Verantwortlicher, Betriebsmodell (intern/extern/cloud).',
      'Einfachen Netzplan mit Segmenten zeichnen (Verwaltung, RD, Server, Gäste-WLAN).',
      'Liste und Plan zentral ablegen und Pflegeverantwortung zuweisen.',
    ],
    simpleImplementation:
      'Eine Excel-Tabelle und eine PowerPoint-Folie mit Netzwerk-Skizze reichen vollkommen aus.',
    doneWhen:
      'Eine Asset-Liste mit den wichtigsten Systemen und ein Netzplan mit erkennbaren Segmenten liegen vor.',
    evidence: [
      'Asset-Inventarliste',
      'Netzplan / Netzwerkdiagramm',
      'Benennung des Pflegeverantwortlichen',
    ],
    commonMistake:
      'Es wird monatelang an einer perfekten CMDB gearbeitet, statt schnell eine pragmatische Übersicht zu erstellen.',
    managementEffort:
      'Ca. 15 Minuten Beauftragung, 30 Minuten Review der Ergebnisse.',
  },
  {
    id: 105,
    slug: 's-ir-kontaktkette',
    title: 'Tag 15–30: Incident-Response-Kontaktkette',
    priority: 'hoch',
    owner: 'IT-Leitung',
    whyItMatters:
      'NIS-2 fordert eine Erstmeldung an das BSI innerhalb von 24 Stunden. Im Ernstfall zählt jede Minute. Wenn erst während eines Vorfalls geklärt wird, wer wen anruft und wer die BSI-Meldung macht, geht wertvolle Zeit verloren.',
    managementAction:
      'Lassen Sie eine einseitige Notfall-Kontaktliste erstellen und verteilen. Klären Sie vorab: Wer meldet an das BSI? Wer entscheidet über Systemabschaltungen? Wer informiert die Geschäftsführung?',
    practicalSteps: [
      'Kontaktliste erstellen: GF, IT-Leitung, ISB, IT-Dienstleister, Datenschutz, Kommunikation.',
      'Eskalationsreihenfolge festlegen: Wer wird zuerst informiert, wer entscheidet, wer meldet extern.',
      'BSI-Meldeformular (https://www.bsi.bund.de) herunterladen und vorausfüllen, soweit möglich.',
      'Liste digital und als Ausdruck im IT-Raum und bei der GF hinterlegen.',
    ],
    simpleImplementation:
      'Ein DIN-A4-Blatt mit Kontaktdaten, Eskalationsreihenfolge und BSI-Meldehinweis reicht als erster Schritt.',
    doneWhen:
      'Die Kontaktliste existiert, ist verteilt und die Zuständigkeit für BSI-Meldungen ist geklärt.',
    evidence: [
      'Notfall-Kontaktliste (digital + Ausdruck)',
      'Benannte BSI-Meldeverantwortung',
      'Ablageorte dokumentiert',
    ],
    commonMistake:
      'Die Kontaktdaten liegen nur im E-Mail-Postfach — das im Angriffsfall möglicherweise nicht erreichbar ist.',
    managementEffort:
      'Ca. 30 Minuten Abstimmung und Freigabe.',
  },
  {
    id: 106,
    slug: 's-risikoanalyse-light',
    title: 'Tag 30–50: Risikoanalyse Light',
    priority: 'mittel',
    owner: 'IT-Leitung / ISB',
    whyItMatters:
      '§30 Nr.1 BSIG fordert Konzepte zur Risikoanalyse. Eine pragmatische Risikobewertung der wichtigsten Systeme zeigt, wo der größte Handlungsbedarf besteht, und ist die Grundlage für alle weiteren Investitions- und Priorisierungsentscheidungen.',
    managementAction:
      'Beauftragen Sie ISB/IT, die Top-10-Systeme mit einer einfachen Risikobewertung zu versehen: Was passiert bei Ausfall? Wie wahrscheinlich ist das? Was tun wir dagegen? Ergebnis als Tabelle.',
    practicalSteps: [
      'Top-10-Systeme aus der Asset-Liste auswählen (die mit der höchsten Geschäftsrelevanz).',
      'Je System drei Fragen beantworten: Eintrittswahrscheinlichkeit, Auswirkung, bestehende Gegenmaßnahmen.',
      'Ergebnis in einer einfachen Risikomatrix (Excel) dokumentieren.',
      'Maßnahmen für die Top-3-Risiken ableiten und priorisieren.',
    ],
    simpleImplementation:
      'Eine Excel-Tabelle mit Spalten: System, Risiko (hoch/mittel/niedrig), Auswirkung, Maßnahme, Status. Kein ISO-27005-Projekt nötig.',
    doneWhen:
      'Eine dokumentierte Risikoübersicht für die kritischsten Systeme liegt vor und Maßnahmen sind abgeleitet.',
    evidence: [
      'Risikomatrix / Risikoübersicht',
      'Maßnahmenplan für Top-Risiken',
      'Datum der Erstellung',
    ],
    commonMistake:
      'Es wird auf eine „richtige" Risikoanalyse gewartet, die dann nie kommt. Eine einfache Tabelle ist besser als keine.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 45 Minuten Review der Ergebnisse.',
  },
  {
    id: 107,
    slug: 's-richtlinien-paket',
    title: 'Tag 30–60: Richtlinien-Paket erstellen',
    priority: 'mittel',
    owner: 'ISB',
    whyItMatters:
      '§30 BSIG verlangt dokumentierte Risikomanagementmaßnahmen. Ohne schriftliche Richtlinien kann nicht nachgewiesen werden, dass Standards existieren. Bei einer BSI-Prüfung oder nach einem Vorfall sind Richtlinien der erste Nachweis, der angefordert wird.',
    managementAction:
      'Geben Sie dem ISB den Auftrag, vier Mindest-Richtlinien zu erstellen: IT-Sicherheitsrichtlinie, Passwort-Policy, Backup-Konzept, Incident-Response-Plan. Vorlagen von BSI, DRK-LV oder IHK nutzen.',
    practicalSteps: [
      'Vorlagen beschaffen (BSI IT-Grundschutz-Kompendium, DRK-Landesverband, IHK-Mustervorlagen).',
      'Vier Dokumente erstellen und auf den eigenen Verband anpassen.',
      'Geschäftsführung zur Freigabe vorlegen.',
      'Zentral ablegen und Mitarbeitende informieren.',
    ],
    simpleImplementation:
      'Jede Richtlinie kann 2–5 Seiten lang sein. Vorlagen anpassen geht schneller als Neuerstellung. Qualität vor Umfang.',
    doneWhen:
      'Mindestens vier Richtlinien sind erstellt, von der GF freigegeben und zentral abgelegt.',
    evidence: [
      'Vier freigegebene Richtlinien-Dokumente',
      'GF-Freigabevermerk oder Unterschrift',
      'Ablageort dokumentiert',
    ],
    commonMistake:
      'Es werden umfangreiche, generische Richtlinien kopiert, die niemand liest und die nicht zur Organisation passen.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 1 Stunde Review und Freigabe.',
  },
  {
    id: 108,
    slug: 's-dienstleister-pruefung',
    title: 'Tag 50–70: Dienstleister-Übersicht + Verträge prüfen',
    priority: 'mittel',
    owner: 'IT-Leitung / Verwaltung',
    whyItMatters:
      '§30 Nr.4 BSIG fordert Sicherheit der Lieferkette. Viele Kreisverbände lagern IT an Dienstleister aus. Wenn der Dienstleister kompromittiert wird, trifft es den Verband direkt. Die Verantwortung bleibt immer beim Verband.',
    managementAction:
      'Erstellen Sie eine Übersicht aller IT-Dienstleister und Cloud-Anbieter. Prüfen Sie je Anbieter: Gibt es einen AVV? Gibt es SLAs? Sind Sicherheitsanforderungen vertraglich geregelt?',
    practicalSteps: [
      'Alle IT-Dienstleister und Cloud-Dienste auflisten (Managed Service, Hosting, SaaS, Backup-Cloud).',
      'AVV-Status prüfen: Liegt ein aktueller Auftragsverarbeitungsvertrag vor?',
      'SLA-Status prüfen: Welche Verfügbarkeit ist garantiert? Was passiert bei Ausfall?',
      'Sicherheitsanforderungen nachdokumentieren, wo sie fehlen.',
    ],
    simpleImplementation:
      'Eine einfache Tabelle: Dienstleister, Dienst, AVV (ja/nein), SLA (ja/nein), offener Handlungsbedarf.',
    doneWhen:
      'Alle IT-Dienstleister sind erfasst, AVV- und SLA-Status sind dokumentiert und offene Punkte sind identifiziert.',
    evidence: [
      'Dienstleister-Übersicht mit AVV/SLA-Status',
      'Kopien der AVVs und SLAs',
      'Liste offener Handlungsbedarfe',
    ],
    commonMistake:
      'Der Dienstleister gilt als „vertrauenswürdig", ohne dass SLAs oder Sicherheitsanforderungen je schriftlich vereinbart wurden.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 1 Stunde Review der Vertragsübersicht.',
  },
  {
    id: 109,
    slug: 's-mock-audit',
    title: 'Tag 70–90: Mock-Audit und Nachweise sammeln',
    priority: 'niedrig',
    owner: 'ISB',
    whyItMatters:
      'Alle Maßnahmen der letzten 70 Tage müssen nachweisbar dokumentiert sein. Ein Mock-Audit deckt Lücken auf, bevor das BSI es tut. Gleichzeitig wird die zentrale Nachweisablage aufgebaut, die bei einer Prüfung oder nach einem Vorfall sofort vorzeigbar ist.',
    managementAction:
      'Beauftragen Sie den ISB, alle bisherigen Nachweise an einem zentralen Ort zu sammeln und gegen die NIS-2-Kernanforderungen abzugleichen. Lücken werden als Folgemaßnahmen erfasst.',
    practicalSteps: [
      'Zentralen Nachweisordner einrichten (SharePoint, Netzlaufwerk).',
      'Alle bisherigen Nachweise sammeln: ISB-Benennung, Backup-Test, MFA-Nachweis, Richtlinien, Asset-Liste etc.',
      'Gegen NIS-2/BSIG-Anforderungen abgleichen (Checkliste nutzen).',
      'Lücken als priorisierte Folgemaßnahmen dokumentieren.',
    ],
    simpleImplementation:
      'Ein strukturierter SharePoint-Ordner mit Unterordnern je Thema (Organisation, Technik, Richtlinien, Nachweise) genügt vollständig.',
    doneWhen:
      'Alle Nachweise liegen zentral vor, ein Abgleich gegen NIS-2-Anforderungen ist dokumentiert und Lücken sind als Folgemaßnahmen erfasst.',
    evidence: [
      'Zentraler Nachweisordner mit Inhaltsverzeichnis',
      'NIS-2-Abgleich / Gap-Analyse',
      'Priorisierte Maßnahmenliste für die Folgeperiode',
    ],
    commonMistake:
      'Maßnahmen wurden umgesetzt, aber die Nachweise liegen verstreut in E-Mails, Chats und lokalen Ordnern.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 1 Stunde Review der Gap-Analyse.',
  },
];

// ── Mittel (M) — 10 Items ──

export const roadmap90DetailsM: GrundschutzDetail[] = [
  {
    id: 201,
    slug: 'm-isb-steuerungsgruppe',
    title: 'Tag 1–10: ISB benennen + Steuerungsgruppe NIS-2',
    priority: 'hoch',
    owner: 'Geschäftsführung',
    whyItMatters:
      'Bei einem mittelgroßen Verband reicht ein nebenamtlicher ISB nicht aus. Es braucht eine Person mit mindestens 50% Stellenanteil und eine Steuerungsgruppe, die bereichsübergreifend entscheidet. Ohne dieses Gremium blockieren Silos die Umsetzung.',
    managementAction:
      'Benennen Sie einen ISB mit mindestens 50% Stellenanteil und richten Sie eine NIS-2-Steuerungsgruppe ein (GF, IT-Leitung, ISB, Bereichsleitungen). Erstes Meeting innerhalb von 14 Tagen.',
    practicalSteps: [
      'ISB mit ausreichend Zeitbudget benennen (intern oder extern, mind. 50% Stellenanteil).',
      'Steuerungsgruppe zusammensetzen: GF, IT-Leitung, ISB und relevante Bereichsleitungen.',
      'Regelmäßigen Meeting-Rhythmus festlegen (z.B. alle 2 Wochen).',
      'Projektplan mit Meilensteinen für 90 Tage erstellen und im ersten Meeting abstimmen.',
    ],
    simpleImplementation:
      'ISB-Benennung + Einladung zur Steuerungsgruppe per E-Mail. Projektplan als einfache Timeline in PowerPoint oder Excel.',
    doneWhen:
      'ISB ist benannt, Steuerungsgruppe hat getagt und ein 90-Tage-Projektplan liegt vor.',
    evidence: [
      'ISB-Benennungsschreiben mit Stellenanteil',
      'Teilnehmerliste und Protokoll erstes Steuerungsgruppen-Meeting',
      '90-Tage-Projektplan',
    ],
    commonMistake:
      'Der ISB wird benannt, aber ohne ausreichend Zeit und ohne Rückendeckung durch ein Entscheidungsgremium.',
    managementEffort:
      'Ca. 1–2 Stunden für Benennung und erstes Meeting.',
  },
  {
    id: 202,
    slug: 'm-mfa-flaechendeckend',
    title: 'Tag 1–15: MFA flächendeckend ausrollen',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Bei einem mittleren Verband sind nicht nur Admin-Konten, sondern auch normale Benutzerkonten ein relevanter Angriffsvektor — insbesondere wenn Mitarbeitende von außen auf E-Mail und Dateien zugreifen. MFA für alle Benutzer ist der Standard.',
    managementAction:
      'Geben Sie die Anweisung: MFA für alle privilegierten Konten sofort, für alle Benutzer innerhalb von 15 Tagen. Conditional Access Policies müssen dokumentiert sein.',
    practicalSteps: [
      'MFA für alle Admin-Konten und Remote-Zugänge sofort aktivieren.',
      'MFA-Rollout für alle Benutzer planen (Kommunikation, Schulung, Helpdesk-Kapazität).',
      'Conditional Access Policies dokumentieren (Geräte-Compliance, Standort-basiert etc.).',
      'Ausnahmen nur schriftlich, befristet und mit Risikobewertung.',
    ],
    simpleImplementation:
      'Microsoft Authenticator für M365, TOTP für VPN. Rollout in Wellen (erst IT, dann Verwaltung, dann Außenstellen).',
    doneWhen:
      'Alle Benutzer sind MFA-geschützt, Conditional Access Policies sind dokumentiert, Ausnahmen sind befristet.',
    evidence: [
      'MFA-Statusbericht aus Entra ID / M365',
      'Dokumentation der Conditional Access Policies',
      'Ausnahmen-Register mit Ablaufdatum',
    ],
    commonMistake:
      'MFA wird nur für Admins aktiviert, aber normale Benutzer arbeiten weiterhin ohne zweiten Faktor von extern.',
    managementEffort:
      'Ca. 20 Minuten Anweisung, 30 Minuten Abnahme und Review.',
  },
  {
    id: 203,
    slug: 'm-backup-strategie',
    title: 'Tag 1–20: Backup-Strategie überarbeiten',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Bei einem mittleren Verband mit vielen Systemen reicht ein einfaches Backup nicht. RTO/RPO müssen je System definiert sein, damit im Ernstfall klar ist, wie schnell welches System wieder laufen muss und wie viel Datenverlust tolerierbar ist.',
    managementAction:
      'Fordern Sie eine schriftliche Backup-Strategie, die für jedes kritische System RTO und RPO enthält. Lassen Sie mindestens für die Top-5-Systeme einen Restore-Test durchführen.',
    practicalSteps: [
      '3-2-1-Regel validieren: 3 Kopien, 2 Medien, 1 offline/immutable.',
      'RTO/RPO je kritischem System definieren (gemeinsam mit Fachbereichen).',
      'Restore-Tests für Top-5-Systeme durchführen und protokollieren.',
      'Backup-Monitoring einrichten: Automatische Benachrichtigung bei fehlgeschlagenen Sicherungen.',
    ],
    simpleImplementation:
      'Backup-Konzept als 3–5-seitiges Dokument mit RTO/RPO-Tabelle und Restore-Testplan. Monitoring über vorhandene Backup-Software.',
    doneWhen:
      'Backup-Konzept mit RTO/RPO liegt vor, Offline-Komponente ist eingerichtet und Restore-Tests sind protokolliert.',
    evidence: [
      'Backup-Konzept mit RTO/RPO-Tabelle',
      'Restore-Testprotokolle für Top-5-Systeme',
      'Monitoring-Konfiguration / Alarmierungsnachweise',
    ],
    commonMistake:
      'Es werden alle Systeme gleich behandelt, ohne zwischen kritischen und unkritischen Systemen zu differenzieren.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 45 Minuten Review der Strategie und Testergebnisse.',
  },
  {
    id: 204,
    slug: 'm-asset-cmdb',
    title: 'Tag 10–25: Asset-Inventar + CMDB aufbauen',
    priority: 'hoch',
    owner: 'IT-Leitung',
    whyItMatters:
      'Bei über 100 Mitarbeitenden wächst die IT-Landschaft schnell. Ohne ein vollständiges Inventar mit Kritikalitätsbewertung werden Schwachstellen übersehen, Updates vergessen und im Notfall fehlt der Überblick, welche Systeme zuerst wiederhergestellt werden müssen.',
    managementAction:
      'Beauftragen Sie ein vollständiges IT-Asset-Inventar inklusive Kritikalitätsbewertung. Das muss keine teure CMDB-Software sein, aber alle Systeme müssen erfasst und priorisiert sein.',
    practicalSteps: [
      'Alle IT-Assets erfassen: Server, Clients, Netzwerk, Cloud-Dienste, Mobilgeräte, IoT.',
      'Pro Asset: Name, Standort, Zweck, Verantwortlicher, Betriebsmodell, Kritikalität.',
      'Kritikalität in 3 Stufen bewerten: Geschäftskritisch, Wichtig, Standard.',
      'Regelmäßige Aktualisierung festlegen (z.B. quartalsweise).',
    ],
    simpleImplementation:
      'Excel oder SharePoint-Liste mit strukturierten Spalten. Netzwerk-Scanner (z.B. Lansweeper Free) für die Ersterfassung nutzen.',
    doneWhen:
      'Vollständiges Asset-Inventar mit Kritikalitätsbewertung liegt vor und Pflegeprozess ist definiert.',
    evidence: [
      'Asset-Inventar / CMDB-Export',
      'Kritikalitätsbewertung je System',
      'Dokumentierter Pflegeprozess',
    ],
    commonMistake:
      'Nur Server werden erfasst, aber Cloud-Dienste, Mobilgeräte und IoT-Geräte (z.B. Hausnotruf-Technik) fehlen.',
    managementEffort:
      'Ca. 20 Minuten Beauftragung, 1 Stunde Review der Erstversion.',
  },
  {
    id: 205,
    slug: 'm-netzwerk-segmentierung',
    title: 'Tag 15–30: Netzwerk-Segmentierung RD vs. Verband',
    priority: 'hoch',
    owner: 'IT-Administration / Dienstleister',
    whyItMatters:
      'Rettungsdienst-Systeme (Leitstellen-Anbindung, Einsatzdokumentation) müssen vom allgemeinen Verbandsnetz getrennt sein. Ein Ransomware-Befall der Verwaltung darf den RD-Betrieb nicht direkt beeinträchtigen.',
    managementAction:
      'Beauftragen Sie die technische Trennung von RD- und Verbandsnetz. Wenn bereits VLANs existieren, lassen Sie prüfen, ob die Firewall-Regeln tatsächlich den Verkehr zwischen den Segmenten kontrollieren.',
    practicalSteps: [
      'Netzplan erstellen/aktualisieren mit allen Segmenten (RD, Verwaltung, Server, Gäste).',
      'RD-Netz mindestens auf VLAN-Ebene mit Firewall-Regeln trennen.',
      'Übergangspunkte dokumentieren: Welche Systeme dürfen zwischen Segmenten kommunizieren?',
      'Firewall-Regeln nach Deny-by-Default-Prinzip konfigurieren.',
    ],
    simpleImplementation:
      'VLAN-Trennung über vorhandene Switches + Firewall-Regeln. Kein Hardware-Neukauf nötig, wenn managed Switches vorhanden sind.',
    doneWhen:
      'RD- und Verbandsnetz sind mindestens logisch getrennt, Firewall-Regeln sind dokumentiert und Übergangspunkte sind definiert.',
    evidence: [
      'Aktueller Netzplan mit Segmenten',
      'Firewall-Regelwerk (Export oder Dokumentation)',
      'Dokumentation der erlaubten Übergänge',
    ],
    commonMistake:
      'Es gibt zwar verschiedene VLANs, aber die Firewall erlaubt trotzdem allen Traffic zwischen den Segmenten.',
    managementEffort:
      'Ca. 20 Minuten Beauftragung, 30 Minuten Abstimmung mit IT/Dienstleister.',
  },
  {
    id: 206,
    slug: 'm-risikoanalyse-bsi',
    title: 'Tag 20–40: Risikoanalyse nach BSI-Standard',
    priority: 'hoch',
    owner: 'ISB / IT-Leitung',
    whyItMatters:
      '§30 Nr.1 BSIG fordert Konzepte zur Risikoanalyse. Bei einem mittleren Verband wird eine strukturierte Analyse erwartet, die über eine „Light"-Variante hinausgeht. Die Risikomatrix ist die Grundlage für Priorisierung, Budget und Maßnahmenplanung.',
    managementAction:
      'Beauftragen Sie eine strukturierte Risikoanalyse nach BSI-Standard für alle kritischen Prozesse und Systeme. Ergebnis: Risikomatrix mit Bewertung und Maßnahmenplan.',
    practicalSteps: [
      'Alle kritischen Geschäftsprozesse identifizieren (RD-Einsatzsteuerung, Abrechnung, Dienstplanung etc.).',
      'Je Prozess: Unterstützende IT-Systeme, Bedrohungen, Schwachstellen bewerten.',
      'Risikomatrix erstellen: Eintrittswahrscheinlichkeit × Auswirkung.',
      'Risikobehandlungsplan ableiten: Maßnahmen, Verantwortliche, Fristen.',
    ],
    simpleImplementation:
      'BSI-Grundschutz-Checks oder BSI-Standard 200-3 als Vorlage nutzen. Excel-basierte Risikomatrix reicht.',
    doneWhen:
      'Eine dokumentierte Risikoanalyse mit Matrix und Behandlungsplan liegt vor und ist der Steuerungsgruppe vorgestellt worden.',
    evidence: [
      'Risikoanalyse-Dokument',
      'Risikomatrix mit Bewertungen',
      'Risikobehandlungsplan mit Verantwortlichen und Fristen',
    ],
    commonMistake:
      'Die Risikoanalyse wird rein technisch durchgeführt, ohne die Geschäftsprozesse und deren Kritikalität zu berücksichtigen.',
    managementEffort:
      'Ca. 2 Stunden Beteiligung an Workshops, 1 Stunde Review.',
  },
  {
    id: 207,
    slug: 'm-ir-plan-meldekette',
    title: 'Tag 30–50: Incident-Response-Plan + Meldekette',
    priority: 'hoch',
    owner: 'ISB / IT-Leitung',
    whyItMatters:
      'NIS-2 schreibt vor: 24h Erstmeldung, 72h Folgemeldung an das BSI. Ohne vorbereiteten IR-Plan und geübte Meldekette wird im Ernstfall improvisiert — mit dem Risiko, Fristen zu versäumen und den Schaden durch Fehlentscheidungen zu vergrößern.',
    managementAction:
      'Geben Sie den Auftrag für ein IR-Playbook inklusive BSI-Meldekette. Planen Sie eine Tabletop-Übung (Planspiel) innerhalb der 90 Tage.',
    practicalSteps: [
      'IR-Playbook erstellen: Erkennung → Erstbewertung → Eindämmung → Meldung → Forensik → Wiederherstellung.',
      'BSI-Meldekette definieren: Wer füllt das Meldeformular aus, wer gibt frei, wer sendet.',
      'Eskalationswege für verschiedene Szenarien festlegen (Ransomware, Datenleck, Insider).',
      'Tabletop-Übung planen: 2-stündiges Szenario mit Steuerungsgruppe durchspielen.',
    ],
    simpleImplementation:
      'IR-Playbook als 5–10-seitiges Dokument. Tabletop-Übung als moderiertes Meeting mit einem konkreten Szenario.',
    doneWhen:
      'IR-Playbook und BSI-Meldekette sind dokumentiert, Verantwortlichkeiten sind zugewiesen und eine Tabletop-Übung ist terminiert.',
    evidence: [
      'IR-Playbook',
      'BSI-Meldekette mit Verantwortlichen',
      'Einladung/Termin für Tabletop-Übung',
    ],
    commonMistake:
      'Der IR-Plan existiert, wird aber nie geübt. Beim ersten realen Vorfall stellt sich heraus, dass niemand die Abläufe kennt.',
    managementEffort:
      'Ca. 30 Minuten Auftragserteilung, 2 Stunden Tabletop-Übung.',
  },
  {
    id: 208,
    slug: 'm-richtlinien-paket',
    title: 'Tag 40–60: Richtlinien-Paket erstellen und freigeben',
    priority: 'mittel',
    owner: 'ISB',
    whyItMatters:
      '§30 BSIG fordert dokumentierte Maßnahmen. Bei einem mittleren Verband werden mindestens fünf Kern-Richtlinien erwartet. Diese sind nicht nur Nachweis für Prüfungen, sondern setzen verbindliche Standards für alle Mitarbeitenden.',
    managementAction:
      'Geben Sie dem ISB den Auftrag, fünf Richtlinien zu erstellen und zur GF-Freigabe vorzulegen: IT-Sicherheitsrichtlinie, Passwort-Policy, Backup-Konzept, BCM-Konzept, Berechtigungskonzept.',
    practicalSteps: [
      'Vorlagen nutzen (BSI, DRK-LV, ISO 27001 Annex A als Orientierung).',
      'Fünf Kern-Richtlinien erstellen und auf den Verband anpassen.',
      'Von der Geschäftsführung freigeben lassen.',
      'An alle Mitarbeitenden kommunizieren (Intranet, E-Mail, Aushang).',
    ],
    simpleImplementation:
      'Jede Richtlinie 3–8 Seiten. Vorlagen-Anpassung statt Neuerstellung. Fokus auf Praxistauglichkeit.',
    doneWhen:
      'Fünf Richtlinien sind erstellt, freigegeben, zentral abgelegt und kommuniziert.',
    evidence: [
      'Fünf freigegebene Richtlinien-Dokumente',
      'GF-Freigabe (Unterschrift oder E-Mail)',
      'Kommunikationsnachweis an Mitarbeitende',
    ],
    commonMistake:
      'Richtlinien werden erstellt, aber nicht freigegeben und nicht kommuniziert — sie existieren nur auf dem Papier.',
    managementEffort:
      'Ca. 2 Stunden Review und Freigabe aller Dokumente.',
  },
  {
    id: 209,
    slug: 'm-lieferketten-bewertung',
    title: 'Tag 50–75: Lieferketten-Bewertung',
    priority: 'mittel',
    owner: 'IT-Leitung / Verwaltung',
    whyItMatters:
      '§30 Nr.4 BSIG fordert Lieferketten-Sicherheit. Ein mittlerer Verband hat typischerweise 5–15 IT-Dienstleister und Cloud-Dienste. Wenn einer davon kompromittiert wird, kann das den Betrieb direkt treffen.',
    managementAction:
      'Beauftragen Sie eine systematische Bewertung aller IT-Dienstleister und Cloud-Anbieter. Prüfen Sie Verträge auf SLAs, Sicherheitsanforderungen und Ausfallszenarien.',
    practicalSteps: [
      'Vollständige Dienstleister-Liste erstellen (inkl. SaaS, IaaS, Managed Services).',
      'Je Dienstleister bewerten: Kritikalität, AVV-Status, SLA, Sicherheitsniveau.',
      'Sicherheitsanforderungen in Verträge aufnehmen (Patch-Fristen, Meldepflichten, Audit-Rechte).',
      'Für kritische Dienste: Ausfall-/Wechselszenarien dokumentieren.',
    ],
    simpleImplementation:
      'Bewertungstabelle mit Spalten: Dienstleister, Dienst, Kritikalität, AVV, SLA, Sicherheitsniveau, Handlungsbedarf.',
    doneWhen:
      'Alle IT-Dienstleister sind bewertet, vertragliche Lücken sind identifiziert und Maßnahmen sind geplant.',
    evidence: [
      'Dienstleister-Bewertungstabelle',
      'Vertragsprüfungs-Ergebnisse',
      'Maßnahmenplan für vertragliche Nachbesserungen',
    ],
    commonMistake:
      'Nur der Haupt-IT-Dienstleister wird bewertet, aber SaaS-Dienste (Dienstplanung, Abrechnung, Hausnotruf-Cloud) werden übersehen.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 1–2 Stunden Review der Ergebnisse.',
  },
  {
    id: 210,
    slug: 'm-mock-audit-gap',
    title: 'Tag 75–90: Mock-Audit + Gap-Analyse',
    priority: 'mittel',
    owner: 'ISB',
    whyItMatters:
      'Nach 75 Tagen intensiver Arbeit muss geprüft werden: Was haben wir erreicht, was fehlt noch? Ein internes Mock-Audit simuliert eine BSI-Prüfung und zeigt systematisch die verbleibenden Lücken auf.',
    managementAction:
      'Beauftragen Sie ein internes Mock-Audit gegen die NIS-2/BSIG-Anforderungen. Ergebnis: Gap-Analyse mit priorisierten Folgemaßnahmen für die nächste Periode.',
    practicalSteps: [
      'NIS-2/BSIG-Anforderungskatalog als Checkliste aufbereiten.',
      'Alle Nachweise der letzten 90 Tage sammeln und gegen die Anforderungen abgleichen.',
      'Lücken systematisch dokumentieren und priorisieren.',
      'Folgemaßnahmen mit Verantwortlichen und Fristen planen.',
    ],
    simpleImplementation:
      'Excel-basierte Checkliste mit Spalten: Anforderung, Status (erfüllt/teilweise/offen), Nachweis, Maßnahme.',
    doneWhen:
      'Mock-Audit ist durchgeführt, Gap-Analyse dokumentiert und Folgemaßnahmen sind der Steuerungsgruppe vorgestellt.',
    evidence: [
      'Mock-Audit-Bericht / Gap-Analyse',
      'Nachweisübersicht mit Status je Anforderung',
      'Priorisierter Maßnahmenplan für Folgeperiode',
    ],
    commonMistake:
      'Das Mock-Audit wird verschoben, weil „noch nicht alles fertig" ist. Gerade deshalb ist es wichtig: Es zeigt, was noch fehlt.',
    managementEffort:
      'Ca. 1 Stunde Review der Gap-Analyse, 30 Minuten Steuerungsgruppen-Meeting.',
  },
];

// ── Groß (L) — 10 Items ──

export const roadmap90DetailsL: GrundschutzDetail[] = [
  {
    id: 301,
    slug: 'l-projektorganisation',
    title: 'Tag 1–7: NIS-2-Projektorganisation aufsetzen',
    priority: 'hoch',
    owner: 'Geschäftsführung',
    whyItMatters:
      'Ein großer Verband mit 500+ Mitarbeitenden, mehreren Standorten und ggf. Tochtergesellschaften braucht eine professionelle Projektstruktur. Ohne dedizierten ISB und Steuerungsgruppe mit Entscheidungskompetenz scheitern NIS-2-Projekte an Komplexität und Silodenken.',
    managementAction:
      'Setzen Sie innerhalb einer Woche eine Projektorganisation auf: Dedizierter ISB (mind. 75% Stellenanteil), Steuerungsgruppe mit Entscheidungskompetenz, wöchentliche Statusmeetings.',
    practicalSteps: [
      'Dedizierten ISB benennen (mind. 75% Stellenanteil, ggf. mit externem Co-ISB).',
      'Steuerungsgruppe einrichten: GF, IT-Leitung, ISB, Recht, Bereichsleitungen, ggf. Tochtergesellschaften.',
      'Wöchentliches Status-Meeting etablieren mit strukturierter Agenda.',
      'Projektplan mit Meilensteinen, Budgetrahmen und Eskalationswegen erstellen.',
    ],
    simpleImplementation:
      'Projekt-Kickoff als 2-stündiges Meeting mit allen Stakeholdern. Projektplan in MS Project oder Excel mit Gantt-Ansicht.',
    doneWhen:
      'ISB ist benannt, Steuerungsgruppe hat getagt, Projektplan mit Budget liegt vor und wöchentliche Meetings sind terminiert.',
    evidence: [
      'ISB-Benennung mit Stellenanteil und Berichtslinie',
      'Steuerungsgruppen-Auftrag mit Teilnehmern',
      'Projektplan mit Meilensteinen und Budget',
      'Protokoll Kickoff-Meeting',
    ],
    commonMistake:
      'Die Projektorganisation wird zu flach aufgesetzt — ohne Entscheidungskompetenz der Steuerungsgruppe versanden Maßnahmen.',
    managementEffort:
      'Ca. 2–3 Stunden für Kickoff und Erstaufstellung.',
  },
  {
    id: 302,
    slug: 'l-mfa-conditional-access',
    title: 'Tag 1–15: MFA + Conditional Access gruppenübergreifend',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Bei 500+ Benutzern ist die Angriffsfläche groß. Conditional Access geht über einfaches MFA hinaus: Zugriff wird abhängig von Gerätestatus, Standort und Risikoniveau gesteuert. Das ist der Standard für große Organisationen.',
    managementAction:
      'Geben Sie die Anweisung: MFA für alle Benutzer (nicht nur Admins), Conditional Access Policies für Geräte-Compliance und risikobasierte Zugriffskontrolle. Gruppenweit, inklusive Tochtergesellschaften.',
    practicalSteps: [
      'MFA für alle Benutzer und alle Zugangswege aktivieren (M365, VPN, Cloud-Apps).',
      'Conditional Access Policies definieren: Geräte-Compliance, Standort-basiert, Risiko-Level.',
      'Rollout in Wellen planen (IT → Zentrale → Außenstellen → Tochtergesellschaften).',
      'Ausnahmen-Register mit Genehmigungsprozess und automatischem Ablauf einrichten.',
    ],
    simpleImplementation:
      'Entra ID P1/P2 für Conditional Access nutzen. Rollout-Kommunikation mit IT-Helpdesk abstimmen. Pilotgruppe zuerst.',
    doneWhen:
      'MFA und Conditional Access sind für alle Benutzer aktiv, Policies sind dokumentiert und Ausnahmen sind registriert.',
    evidence: [
      'Conditional Access Policy-Dokumentation',
      'MFA-Enrollment-Status (>95% aller Benutzer)',
      'Ausnahmen-Register mit Genehmigung und Ablaufdatum',
    ],
    commonMistake:
      'MFA wird aktiviert, aber Conditional Access fehlt — so können kompromittierte Geräte oder ungewöhnliche Standorte nicht erkannt werden.',
    managementEffort:
      'Ca. 30 Minuten Anweisung, 1 Stunde Review der Rollout-Ergebnisse.',
  },
  {
    id: 303,
    slug: 'l-backup-architektur',
    title: 'Tag 1–20: Backup-Architektur reviewen',
    priority: 'hoch',
    owner: 'IT-Administration',
    whyItMatters:
      'Bei einem großen Verband mit vielen Systemen, Standorten und Abhängigkeiten muss die Backup-Architektur professionell aufgestellt sein. Immutable Backups, RPO/RTO je System und regelmäßige Restore-Tests für Kernprozesse sind Pflicht.',
    managementAction:
      'Beauftragen Sie einen vollständigen Review der Backup-Architektur mit Fokus auf: 3-2-1-Regel, Immutable Backups, RPO/RTO je kritischem System, Restore-Tests für Kernprozesse.',
    practicalSteps: [
      '3-2-1-Regel für alle kritischen Systeme validieren.',
      'Immutable Backups für Kernsysteme einrichten (WORM-Storage, Cloud-Immutable-Tier).',
      'RPO/RTO je System in Abstimmung mit Fachbereichen definieren.',
      'Restore-Tests für Kernprozesse (RD-Leitstelle, ERP, E-Mail, AD) durchführen und protokollieren.',
    ],
    simpleImplementation:
      'Backup-Architektur-Dokument mit Systemübersicht, RPO/RTO-Matrix und Testplan. Veeam/Commvault-Reports als Nachweis.',
    doneWhen:
      'Backup-Architektur ist reviewed, RPO/RTO sind definiert, Immutable Backups sind eingerichtet und Restore-Tests sind protokolliert.',
    evidence: [
      'Backup-Architektur-Dokument mit RPO/RTO-Matrix',
      'Nachweis Immutable-Backup-Konfiguration',
      'Restore-Testprotokolle für Kernprozesse',
    ],
    commonMistake:
      'Backup läuft technisch, aber RPO/RTO sind nicht mit den Fachbereichen abgestimmt — im Ernstfall sind die Erwartungen nicht erfüllbar.',
    managementEffort:
      'Ca. 30 Minuten Beauftragung, 1 Stunde Review mit IT und Fachbereichen.',
  },
  {
    id: 304,
    slug: 'l-cmdb-kritikalitaet',
    title: 'Tag 7–20: CMDB + Kritikalitätsbewertung',
    priority: 'hoch',
    owner: 'IT-Leitung / ISB',
    whyItMatters:
      'Bei 500+ Mitarbeitenden und dutzenden Systemen ist eine einfache Excel-Liste nicht mehr ausreichend. Eine strukturierte CMDB mit Business-Impact-Analyse ist die Grundlage für Risikomanagement, Incident Response und Notfallplanung.',
    managementAction:
      'Beauftragen Sie den Aufbau oder die Aktualisierung einer vollständigen CMDB mit Business-Impact-Analyse für die Top-30-Systeme und Kritikalitätsstufen-Zuweisung.',
    practicalSteps: [
      'CMDB aufbauen/aktualisieren: Alle Server, Dienste, Netzwerk, Cloud, Mobilgeräte, IoT.',
      'Business-Impact-Analyse für Top-30-Systeme durchführen.',
      'Kritikalitätsstufen zuweisen: Geschäftskritisch, Wichtig, Standard, Nice-to-have.',
      'Abhängigkeiten zwischen Systemen dokumentieren (Dependency Mapping).',
    ],
    simpleImplementation:
      'CMDB-Tool wie i-doit, Lansweeper oder GLPI. Business-Impact-Analyse als Workshop mit IT und Fachbereichen.',
    doneWhen:
      'CMDB ist vollständig, BIA für Top-30 liegt vor, Kritikalitätsstufen sind zugewiesen und Pflegeprozess ist definiert.',
    evidence: [
      'CMDB-Export mit allen Assets',
      'Business-Impact-Analyse-Ergebnis',
      'Kritikalitätsstufen-Dokumentation',
      'Abhängigkeits-/Dependency-Map',
    ],
    commonMistake:
      'Die CMDB wird rein technisch gepflegt, ohne Business-Impact. Im Notfall weiß niemand, welches System zuerst wiederhergestellt werden muss.',
    managementEffort:
      'Ca. 2 Stunden Beteiligung an BIA-Workshops, 1 Stunde Review.',
  },
  {
    id: 305,
    slug: 'l-netzwerk-mikrosegmentierung',
    title: 'Tag 10–30: Netzwerk-Segmentierung + Mikrosegmentierung',
    priority: 'hoch',
    owner: 'IT-Administration / Dienstleister',
    whyItMatters:
      'Bei einer großen Organisation mit RD-Leitstelle, Domain Controllern und vielen Standorten ist einfache VLAN-Trennung nicht ausreichend. Mikrosegmentierung schützt kritische Server individuell und ein Zero-Trust-Ansatz minimiert die Angriffsfläche.',
    managementAction:
      'Beauftragen Sie eine professionelle Netzwerk-Segmentierung: RD-Netz hart vom Verbandsnetz trennen, Mikrosegmentierung für kritische Server, Zero-Trust-Bewertung durchführen.',
    practicalSteps: [
      'RD-Netz physisch oder logisch hart vom Verbandsnetz trennen.',
      'Mikrosegmentierung für kritische Server (Leitstelle, Domain Controller, Backup-Server).',
      'Zero-Trust-Ansatz bewerten: Netzwerkzugang nur nach Authentifizierung und Autorisierung.',
      'Alle Firewall-Regeln dokumentieren und nach Deny-by-Default-Prinzip konfigurieren.',
    ],
    simpleImplementation:
      'Next-Generation Firewalls mit Application-Level-Filtering. Managed Switch-Infrastruktur für VLAN/Mikrosegmentierung.',
    doneWhen:
      'RD-Netz ist hart getrennt, kritische Server sind mikrosegmentiert, Firewall-Regelwerk ist dokumentiert und Zero-Trust-Bewertung liegt vor.',
    evidence: [
      'Netzwerk-Architekturplan mit Segmenten',
      'Firewall-Regelwerk-Dokumentation',
      'Mikrosegmentierungs-Konfiguration',
      'Zero-Trust-Bewertungsergebnis',
    ],
    commonMistake:
      'Segmentierung wird nur auf VLAN-Ebene gemacht, aber die Firewall-Regeln erlauben weitgehend freien Verkehr zwischen den Segmenten.',
    managementEffort:
      'Ca. 1 Stunde Beauftragung und Abstimmung, 1 Stunde Review des Netzwerkplans.',
  },
  {
    id: 306,
    slug: 'l-enterprise-risk-assessment',
    title: 'Tag 15–35: Enterprise Risk Assessment',
    priority: 'hoch',
    owner: 'ISB / externe Beratung',
    whyItMatters:
      '§30 Nr.1 BSIG fordert Risikoanalyse — bei einem großen Verband wird eine vollständige Enterprise Risk Assessment nach BSI IT-Grundschutz oder ISO 27005 erwartet. Diese bildet die Grundlage für das gesamte ISMS und alle Investitionsentscheidungen.',
    managementAction:
      'Beauftragen Sie eine vollständige Risikoanalyse nach BSI IT-Grundschutz oder ISO 27005. Bei Bedarf externe Unterstützung hinzuziehen. Budget und Zeitrahmen freigeben.',
    practicalSteps: [
      'Scope definieren: Alle Geschäftsprozesse, Systeme und Schnittstellen.',
      'Risikoanalyse-Methodik festlegen (BSI IT-Grundschutz 200-3 oder ISO 27005).',
      'Workshops mit allen Fachbereichen und IT durchführen.',
      'Risikobehandlungsplan mit Maßnahmen, Verantwortlichen, Fristen und Budget erstellen.',
    ],
    simpleImplementation:
      'BSI IT-Grundschutz-Check als strukturiertes Assessment. Externe Beratung für Methodik, interne Workshops für Inhalte.',
    doneWhen:
      'Vollständige Risikoanalyse ist dokumentiert, Steuerungsgruppe hat den Risikobehandlungsplan genehmigt.',
    evidence: [
      'Risikoanalyse-Dokument nach gewähltem Standard',
      'Risikomatrix mit Bewertungen',
      'Genehmigter Risikobehandlungsplan',
      'Workshop-Protokolle',
    ],
    commonMistake:
      'Externe Berater erstellen die Analyse isoliert, ohne die internen Stakeholder einzubeziehen. Das Ergebnis ist dann nicht praxistauglich.',
    managementEffort:
      'Ca. 4–6 Stunden Beteiligung an Workshops, 2 Stunden Genehmigung.',
  },
  {
    id: 307,
    slug: 'l-ir-playbooks-siem',
    title: 'Tag 25–45: IR-Playbooks + SIEM-Integration',
    priority: 'hoch',
    owner: 'ISB / IT-Security',
    whyItMatters:
      'Ein großer Verband braucht szenario-spezifische IR-Playbooks, nicht nur einen generischen IR-Plan. Die Integration mit SIEM (Security Information and Event Management) stellt sicher, dass Vorfälle frühzeitig erkannt und die 24h-BSI-Meldefrist eingehalten werden kann.',
    managementAction:
      'Beauftragen Sie IR-Playbooks für die Top-5-Szenarien und die Integration der Alarmierung mit dem SIEM-System. Budget für SIEM-Lösung freigeben, falls noch nicht vorhanden.',
    practicalSteps: [
      'IR-Playbooks für Top-5-Szenarien erstellen: Ransomware, Datenleck, Insider-Bedrohung, Lieferketten-Kompromittierung, DDoS.',
      '24h/72h-BSI-Meldekette in jedes Playbook integrieren.',
      'SIEM-Alarmierung für kritische Indikatoren konfigurieren (Use Cases definieren).',
      'Tabletop-Übung mit realem Szenario-Durchlauf planen und durchführen.',
    ],
    simpleImplementation:
      'Microsoft Sentinel als SIEM-Einstieg für M365-Umgebungen. IR-Playbooks als 5-seitige Runbooks pro Szenario.',
    doneWhen:
      'Fünf IR-Playbooks sind erstellt, SIEM-Alarmierung ist konfiguriert und eine Tabletop-Übung wurde durchgeführt.',
    evidence: [
      'Fünf szenario-spezifische IR-Playbooks',
      'SIEM-Use-Case-Dokumentation',
      'Protokoll der Tabletop-Übung',
      'BSI-Meldekette je Szenario',
    ],
    commonMistake:
      'SIEM wird eingerichtet, aber niemand schaut auf die Alerts. Ohne Prozess für Alert-Triage ist ein SIEM wertlos.',
    managementEffort:
      'Ca. 1 Stunde Budget-Freigabe, 3 Stunden Tabletop-Übung.',
  },
  {
    id: 308,
    slug: 'l-isms-rahmenwerk',
    title: 'Tag 30–55: ISMS-Rahmenwerk + Richtlinien-Paket',
    priority: 'mittel',
    owner: 'ISB',
    whyItMatters:
      'Ein großer Verband braucht ein strukturiertes Information Security Management System (ISMS). Ohne ISMS-Rahmenwerk fehlt die systematische Steuerung, Überwachung und kontinuierliche Verbesserung der Informationssicherheit.',
    managementAction:
      'Beauftragen Sie den Aufbau eines ISMS-Rahmenwerks nach ISO 27001 oder BSI IT-Grundschutz. Mindestens 8 Richtlinien müssen erstellt, freigegeben und kommuniziert werden.',
    practicalSteps: [
      'ISMS-Scope und -Erklärung (Statement of Applicability) definieren.',
      'ISMS-Handbuch erstellen (Governance-Struktur, Rollen, Prozesse).',
      'Mindestens 8 Richtlinien erstellen: IS-Leitlinie, Zugang, Kryptografie, Backup, BCM, IR, Lieferkette, Personal.',
      'Alle Richtlinien von GF freigeben und an Mitarbeitende kommunizieren.',
    ],
    simpleImplementation:
      'ISO-27001-Vorlage oder BSI-Grundschutz-Profil als Basis. Richtlinien schrittweise erstellen und freigeben.',
    doneWhen:
      'ISMS-Handbuch liegt vor, 8 Richtlinien sind freigegeben und kommuniziert, Governance-Struktur ist dokumentiert.',
    evidence: [
      'ISMS-Handbuch',
      '8 freigegebene Richtlinien',
      'GF-Freigabedokumentation',
      'Kommunikationsnachweis an Mitarbeitende',
    ],
    commonMistake:
      'Richtlinien werden als Papiertiger erstellt, ohne dass die Mitarbeitenden sie kennen oder die Prozesse gelebt werden.',
    managementEffort:
      'Ca. 3–4 Stunden Review und Freigabe aller Dokumente.',
  },
  {
    id: 309,
    slug: 'l-supply-chain-programm',
    title: 'Tag 45–70: Supply-Chain-Security-Programm',
    priority: 'mittel',
    owner: 'IT-Leitung / Einkauf / Recht',
    whyItMatters:
      '§30 Nr.4 BSIG fordert Lieferketten-Sicherheit. Ein großer Verband hat typischerweise 20+ IT-Dienstleister und Cloud-Dienste. Ein systematisches Supply-Chain-Programm mit Fragebögen, Zertifikatsprüfung und vertraglichen Klauseln ist unerlässlich.',
    managementAction:
      'Richten Sie ein Supply-Chain-Security-Programm ein: Systematische Bewertung aller IT-Dienstleister, vertragliche Sicherheitsklauseln und Monitoring kritischer Lieferanten.',
    practicalSteps: [
      'Alle IT-Dienstleister und Cloud-Anbieter systematisch erfassen und nach Kritikalität kategorisieren.',
      'Sicherheitsfragebögen an kritische Dienstleister versenden (ISO-27001-Zertifikat, SOC-2-Report etc.).',
      'Vertragliche Sicherheitsklauseln standardisieren (Patch-Fristen, Meldepflichten, Audit-Rechte, Haftung).',
      'Monitoring-Prozess für kritische Lieferanten einrichten (jährliche Bewertung, Incident-Notification).',
    ],
    simpleImplementation:
      'Standardisierter Dienstleister-Fragebogen + Bewertungsmatrix. Vertragsklauseln als Modul für den Einkauf bereitstellen.',
    doneWhen:
      'Alle Dienstleister sind bewertet, Verträge enthalten Sicherheitsklauseln und ein Monitoring-Prozess ist definiert.',
    evidence: [
      'Dienstleister-Bewertungsmatrix',
      'Ausgefüllte Sicherheitsfragebögen / Zertifikate',
      'Vertragliche Sicherheitsklauseln (Standard-Modul)',
      'Monitoring-Prozess-Beschreibung',
    ],
    commonMistake:
      'Das Programm wird nur auf den Haupt-IT-Dienstleister angewandt, aber SaaS-Anbieter und Sub-Dienstleister bleiben unbewertet.',
    managementEffort:
      'Ca. 2 Stunden Programm-Aufstellung, 1 Stunde quartalsweises Review.',
  },
  {
    id: 310,
    slug: 'l-internes-audit-zertifizierung',
    title: 'Tag 70–90: Internes Audit + Zertifizierungsvorbereitung',
    priority: 'mittel',
    owner: 'ISB / externe Prüfer',
    whyItMatters:
      'Ein internes Audit gegen NIS-2/BSIG-Anforderungen ist der Abschluss der 90-Tage-Phase und gleichzeitig der Startpunkt für die nächste. Für große Verbände kann eine ISO-27001-Zertifizierung strategisch sinnvoll sein — sie erfüllt viele NIS-2-Anforderungen gleichzeitig.',
    managementAction:
      'Beauftragen Sie ein internes Audit gegen NIS-2/BSIG. Entscheiden Sie, ob eine ISO-27001-Zertifizierung angestrebt werden soll. Budget für externe Prüfer freigeben.',
    practicalSteps: [
      'Internes Audit gegen NIS-2/BSIG-Anforderungskatalog durchführen.',
      'Gap-Analyse mit Priorisierung: Kritisch, Wichtig, Nice-to-have.',
      'Entscheidung über ISO-27001-Zertifizierung treffen (Kosten-Nutzen-Analyse).',
      'Folgemaßnahmen-Plan für die nächsten 6 Monate erstellen.',
    ],
    simpleImplementation:
      'Internes Audit durch ISB oder externen Berater. Gap-Analyse als Excel-Matrix mit Ampel-Bewertung.',
    doneWhen:
      'Internes Audit ist durchgeführt, Gap-Analyse liegt vor, Zertifizierungsentscheidung ist getroffen und Folgemaßnahmen sind geplant.',
    evidence: [
      'Internes Audit-Bericht',
      'Gap-Analyse mit Priorisierung',
      'Entscheidungsvorlage ISO-27001 (falls relevant)',
      'Folgemaßnahmen-Plan für nächste Periode',
    ],
    commonMistake:
      'Das Audit wird als „Bestanden/Nicht bestanden" gesehen, statt als Instrument zur kontinuierlichen Verbesserung.',
    managementEffort:
      'Ca. 2 Stunden Audit-Beteiligung, 1 Stunde Review und Entscheidung.',
  },
];

// ── Helper ──

type SizingKey = 'S' | 'M' | 'L';

const detailMap: Record<SizingKey, GrundschutzDetail[]> = {
  S: roadmap90DetailsS,
  M: roadmap90DetailsM,
  L: roadmap90DetailsL,
};

export function getRoadmap90Detail(size: SizingKey, index: number): GrundschutzDetail | undefined {
  return detailMap[size]?.[index];
}

/** Derive sizing key from roadmap90 layer id (e.g. "roadmap90-S" → "S") */
export function sizingFromLayerId(layerId: string): SizingKey | undefined {
  const match = layerId.match(/roadmap90-([SML])$/);
  return match ? (match[1] as SizingKey) : undefined;
}
