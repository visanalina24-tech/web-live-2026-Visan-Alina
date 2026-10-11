# Specificația exercițiului — Fetch rezilient

## Unitate

Unitatea 03 — Module, asincronicitate, evenimente și browserul

## Obiectiv de învățare

Implementarea și verificarea timeoutului, reîncercării și clasificării erorilor pentru `fetch`, fără timere pierdute, reîncercarea erorilor permanente ale clientului sau stări învechite ale interfeței.

## De ce există exercițiul

Codul fetch naiv, inclusiv cel generat, tratează adesea numai cazul fericit. Reziliența cere o politică explicită: ce eșecuri sunt reîncercate, cum funcționează anularea, cum se numără încercările și ce stare finală ajunge la utilizator.

## Cerințe preliminare

- Promisiunile/fetch și stările explicite ale interfeței din proiectul tabloului de bord.
- Tratarea erorilor și funcțiile injectabile.

## Context inițial

Studenții primesc un verificator ESM al stării, un renderer, teste deterministe cu simulări, un server static și un helper `singleAttempt` funcțional. `fetchWithPolicy(url, options)` este incomplet.

## Comportament obligatoriu

- Opțiunile sunt `fetchImpl=fetch`, `timeoutMs=1000`, `retries=2`, `sleep`, `createController=() => new AbortController()`, plus echivalente injectabile pentru `setTimer`/`clearTimer`.
- Fiecare încercare folosește un abort controller nou și își elimină timeoutul în `finally`.
- Un răspuns îndeplinit cu `ok` returnează JSON-ul parsat.
- `4xx` aruncă imediat `Error('request failed: <status>')`, fără retry.
- Respingerea de rețea, anularea/timeoutul și `5xx` sunt reîncercate până când numărul total este `retries + 1`.
- Înainte de reîncercarea N, începând cu 1, așteptați `sleep(50 * 2 ** (N - 1))`.
- După epuizare, aruncați `Error('request failed after <attempts> attempts: <last message>')`, cu ultima eroare în `cause`.
- Controllerul interfeței randează loading, success sau eroarea finală și nu lasă respingeri netratate.

## Constrângeri

- ESM, `fetch` și `AbortController` native; teste/server Node LTS; fără dependențe.
- Studentul modifică numai `public/fetch-policy.js`.
- Nu reîncercați `4xx` sau erorile de parsare JSON după un răspuns reușit.
- Nu refolosiți un semnal anulat.
- Evitați așteptarea reală în teste prin `sleep` și fabrici de controllere injectate.

## Criterii observabile de finalizare

- Un `503` tranzitoriu urmat de succes produce succes după o întârziere înregistrată.
- Un `404` execută o singură încercare și randează eroare.
- O cerere blocată este anulată, reîncercată conform politicii și ajunge la eroarea finală.
- Timerele sunt eliminate atât la succes, cât și la eșec.
- Toate verificările trec, iar studentul poate explica cronologia încercărilor.

## Plan de validare

### Verificări de bază

- Tranzițiile rendererului/controllerului funcționează cu o politică injectată care reușește sau eșuează.
- Pagina statică și modulele se încarcă.

### Verificările obiectivului

- Succesul imediat folosește un controller nou și elimină timeoutul.
- `4xx` nu este reîncercat.
- Erorile de rețea, timeout și `5xx` folosesc întârzieri exacte și semnale noi.
- Eroarea de epuizare conține încercările, ultimul mesaj și cauza.
- Eșecul parsării JSON după un răspuns reușit nu este reîncercat.

### Verificări de regresie

- Niciun timer nu rămâne activ după succesul sau eșecul unei încercări.
- Opțiunile de intrare nu sunt modificate.
- Un număr de reîncercări zero înseamnă exact o încercare.

## Munca destinată studentului

După validarea referinței, copiați referința și înlocuiți numai `fetchWithPolicy` cu un TODO care apelează helperul `singleAttempt`, păstrând exporturile și semnăturile. Browserul rămâne funcțional, iar orchestrarea de bază trece cu politici injectate; verificările politicii eșuează.

## Sarcină pentru Codex

> Implementați numai `public/fetch-policy.js` în jurul funcției `singleAttempt`. Aplicați regulile specificate pentru timeout, erorile reîncercate și întârzierile care se dublează înainte de fiecare reîncercare, creați un controller nou la fiecare încercare, eliminați fiecare timer în `finally` și păstrați cauza finală. Nu modificați interfața, testele sau dependențele. Sarcina este finalizată când trec toate verificările. Desenați cronologia încercărilor/stărilor înainte de editare.

## Sarcină de depanare/extensie

- Creați intenționat controllerul în afara buclei. Folosiți eșecul celei de-a doua încercări pentru a diagnostica refolosirea semnalului, cereți Codex cea mai mică reparație și verificați identitatea controllerului în teste.

## În afara domeniului

- Circuit breakers de producție, cache, persistență offline, service workers, politici arbitrare de stare sau endpointuri externe.
