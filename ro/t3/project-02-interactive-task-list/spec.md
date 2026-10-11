# Specificația exercițiului — Listă interactivă de sarcini

## Unitate

Unitatea 03 — Module, asincronicitate, evenimente și browserul

## Obiectiv de învățare

Randarea stării cu API-uri de creare DOM și conectarea evenimentelor formularului și clickurilor delegate la modelul furnizat, folosind funcțiile exportate de modulul de afișare.

## De ce există exercițiul

Aplicațiile DOM devin ușor de înțeles când starea, randarea și tratarea evenimentelor au responsabilități distincte. Delegarea face propagarea observabilă și evită ascultători opaci pe fiecare element generat.

## Cerințe preliminare

- ESM, funcții/obiecte, evenimente în browser și HTML de bază.

## Context inițial

Studenții primesc HTML/CSS, un model imuabil complet, orchestrarea aplicației, un server static și un `task-view.js` incomplet. Vederea exportă `renderTasks(tasks, { document, list })` și `bindTaskEvents({ form, list, onAdd, onToggle, onDelete })`.

## Comportament obligatoriu

- Randarea golește lista și creează câte un `li` cu `data-task-id` pentru fiecare sarcină.
- Fiecare rând conține un checkbox care reflectă `completed`, un titlu populat prin `textContent` și un buton cu `data-action="delete"`.
- Rândurile finalizate au clasa `completed`; starea goală randează un rând informativ neinteractiv.
- Submitul previne comportamentul implicit, curăță spațiile câmpului `title`, apelează `onAdd(title)` numai pentru text nevid și resetează formularul după o adăugare validă.
- Un singur ascultător de click deleagă checkboxurile către `onToggle(id)` și clickurile pe butonul de ștergere sau descendenții lui către `onDelete(id)`, folosind rândul container.
- Legarea returnează o funcție `unbind()` care elimină ambii ascultători.

## Constrângeri

- ESM/DOM native în browser; teste și server Node LTS; fără dependențe.
- Nu folosiți `innerHTML` pentru datele sarcinilor.
- Nu atașați ascultători fiecărui rând.
- Studentul modifică numai `public/task-view.js`.
- Păstrați schimbările de stare în modelul furnizat și rerandați prin orchestrarea furnizată.

## Criterii observabile de finalizare

- Adăugarea, comutarea și ștergerea funcționează fără reîncărcare.
- Un titlu care conține `<script>` este randat ca text.
- Un click pe textul din butonul de ștergere elimină rândul corect.
- După dezlegare, interacțiunile nu mai invocă callbackuri.
- Toate verificările automate trec.

## Plan de validare

### Verificări de bază

- Operațiile add/toggle/delete ale modelului furnizat sunt imuabile și deterministe.
- HTML-ul conține formularul etichetat și rădăcina listei.

### Verificările obiectivului

- Randarea normală și goală produce structura și starea DOM cerute.
- Submitul curăță textul, respinge textul gol, resetează corect și previne comportamentul implicit.
- Delegarea toggle/delete identifică acțiunea și id-ul corect.
- `unbind` elimină ascultătorii.

### Verificări de regresie

- Titlurile nesigure sunt atribuite prin `textContent`, nu parsate ca marcaj.
- Randarea nu modifică sarcinile.
- Randările repetate nu acumulează ascultători pe rânduri.

## Munca destinată studentului

După validarea referinței, copiați referința și înlocuiți numai cele două funcții exportate din `public/task-view.js` cu implementări TODO fără efect. Modelul și orchestrarea rămân intacte. Verificările de bază trec; verificările vederii și evenimentelor eșuează.

## Sarcină pentru Codex

> Implementați numai `public/task-view.js` folosind crearea DOM și `textContent`. Randați rândurile și starea goală; legați un submit și un singur ascultător delegat de click; returnați curățarea care îi elimină. Nu folosiți `innerHTML`, ascultători pe rând, dependențe sau schimbări în model/teste. Sarcina este finalizată când trec toate verificările și interacțiunile manuale. Explicați event target, cel mai apropiat rând și current target.

## Sarcină de depanare/extensie

- Citiți temporar `event.currentTarget.dataset.taskId` în ascultătorul delegat. Reproduceți lipsa id-ului, cereți Codex o explicație focalizată a câmpurilor propagării și reparați codul.

## În afara domeniului

- Persistență, API-uri de server, drag-and-drop, frameworkuri, elemente personalizate sau stilizarea ca obiectiv.
