  /*
   * TODO: construiește transformarea defensivă descrisă în `spec.md`.
   *
   * Înainte să ceri IA să editeze:
   * 1. Rulează separat verificările de bază, obiectiv și regresie.
   * 2. Examinează eșantionul din memorie, locul apelului din aplicație și eșecurile țintite.
   * 3. Cere IA un tabel, fără editări, cu tipurile acceptate, proprietățile
   *    proprii cerute, formele etapelor, riscurile de mutație și dovezile finalizării.
   * 4. Verifică singur tabelul față de specificație și teste.
   *
   * Limitează cererea de implementare la acest fișier. Trebuie să transforme
   * tabloul de sarcini furnizat în înregistrări proiectate noi, să păstreze
   * intrările apelantului, să ordoneze determinist și să derive sumarul din etapa
   * corectă. Nu permite schimbarea aplicației, testelor
   * sau dependențelor.
   *
   * După propunerea IA, examinează fiecare diferență pentru aliasuri superficiale,
   * sortare în loc, ordonare incorectă și editări
   * în afara domeniului. Rulează toate verificările, compară manual ieșirea aplicației
   * și explică fiecare etapă înainte să accepți rezultatul.
   */
  export function transformTasks(tasks, options = {}) {
  if (!Array.isArray(tasks)) {
    throw new TypeError('tasks trebuie să fie un tablou');
  }

  const { owner, minimumEstimate = 0 } = options;

  const result = tasks
    // 1. filtrare
    .filter((task) => task.status === 'open')
    .filter((task) => owner === undefined || task.owner === owner)
    .filter((task) => task.estimate >= minimumEstimate)
    // 2. proiectare: obiecte noi, doar câmpurile cerute
    .map((task) => ({
      id: task.id,
      title: task.title.trim(),
      owner: task.owner,
      estimate: task.estimate,
    }))
    // 3. sortare (pe copia creată de map, nu pe lista de intrare)
    .sort((a, b) => a.id.localeCompare(b.id));

  // 4. sumar, din rezultatul final
  return {
    tasks: result,
    count: result.length,
    totalEstimate: result.reduce((sum, task) => sum + task.estimate, 0),
    owners: [...new Set(result.map((task) => task.owner))].sort(),
  };
  }

