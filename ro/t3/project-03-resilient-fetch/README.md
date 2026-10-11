# Proiectul 03 — Fetch rezilient

## Obiectiv

Extindeți funcția furnizată pentru o singură cerere: opriți cererile lente și reîncercați anumite eșecuri. Verificați întârzierile, eliminarea timerelor și rezultatul final afișat în pagină.

Un **timeout** stabilește o limită de timp pentru o încercare. Un **retry** înseamnă o nouă încercare după un eșec. **Backoff** este întârzierea înainte de reîncercare; în acest exercițiu, ea se dublează înainte de fiecare reîncercare. Aceste reguli sunt alese pentru exercițiu, nu sunt reguli universale pentru orice aplicație.

## Ce lipsește din codul inițial

Proiectul studentului poate reuși o dată și poate respinge erorile permanente, dar nu oprește cererile lente și nu reîncercă cererile eșuate. Desenați încercările pe o cronologie care include crearea controllerului, configurarea timerului, succesul sau eșecul cererii, curățarea timerului, o eventuală întârziere înainte de reîncercare și următoarea încercare.

Dați Codex sarcina precisă din `spec.md`. Căutați controllere create în afara buclei, reîncercări pentru `4xx` sau erori de parsare, timere eliminate după backoff, numărări greșite ale încercărilor și pierderea cauzei finale.

## Criterii de reușită

- Toate verificările trec.
- Eșecurile tranzitorii folosesc întârzieri exacte și semnale noi.
- Erorile `4xx` și de parsare JSON nu sunt reîncercate.
- Timeoutul anulează încercarea activă.
- Fiecare timer este eliminat, iar epuizarea raportează încercările și cauza.
- Se modifică numai `public/fetch-policy.js`.

## Sarcină de depanare

Mutați crearea controllerului în afara buclei. Inspectați semnalul deja anulat al celei de-a doua încercări, cereți un diagnostic focalizat și restaurați câte un controller nou pentru fiecare încercare.

## Ce ar trebui să puteți explica

- Erori HTTP îndeplinite față de cereri de rețea respinse.
- Anularea unei cereri și crearea unui controller nou pentru fiecare încercare.
- Ce eșecuri sunt reîncercate și de ce întârzierea se dublează înainte de fiecare reîncercare.
- Eliminarea timerelor în `finally` și păstrarea ultimei erori în `cause`.
