# Proiectul 02 — Listă interactivă de sarcini

## Obiectiv

Randați starea imuabilă a sarcinilor cu API-uri DOM sigure și conectați la modelul furnizat un submit și un ascultător delegat pentru click.

## Mod de lucru

Citiți mai întâi modelul și orchestrarea aplicației. Identificați modulul care păstrează sarcinile și funcțiile care creează elemente DOM și înregistrează ascultători. În DevTools, inspectați propagarea unui click imbricat către listă și comparați `target`, `closest(...)` și `currentTarget`.

Dați Codex sarcina precisă din `spec.md`. Respingeți folosirea `innerHTML`, ascultătorii pe fiecare rând, modificările modelului sau rescrierea orchestrării. Verificați că fiecare ascultător este eliminat folosind aceeași referință de funcție care a fost înregistrată.

## Criterii de reușită

- Toate verificările trec, iar adăugarea/comutarea/ștergerea manuală funcționează.
- Titlurile care seamănă cu marcaj nesigur sunt randate ca text.
- Clickurile imbricate în butonul de ștergere identifică rândul corect.
- Curățarea oprește callbackurile.
- Se modifică numai `public/task-view.js`.

## Sarcină de depanare

Determinați temporar id-ul sarcinii din `event.currentTarget`. Observați de ce lista nu are id-ul sarcinii, cereți o explicație focalizată și reparați căutarea prin rândul container al țintei evenimentului.

## Ce ar trebui să puteți explica

- Starea față de reprezentarea DOM.
- Inserarea sigură a textului.
- Propagarea și delegarea evenimentelor.
- Eliminarea ascultătorilor și împărțirea lucrului între module.
