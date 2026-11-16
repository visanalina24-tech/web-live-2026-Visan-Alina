function isValidEvent(event) {
  if (typeof event !== 'object' || event === null) return false;

  // campurile obligatorii trebuie sa fie proprietati proprii, nu mostenite
  for (const key of ['id', 'occurredAt', 'active', 'durationMs']) {
    if (!Object.hasOwn(event, key)) return false;
  }

  // tipuri exacte, fara conversie
  return (
    typeof event.id === 'string' &&
    typeof event.occurredAt === 'string' &&
    !Number.isNaN(Date.parse(event.occurredAt)) &&
    typeof event.active === 'boolean' &&
    typeof event.durationMs === 'number' &&
    Number.isFinite(event.durationMs)
  );
}

export function normalizeEvents(events) {
  if (!Array.isArray(events)) {
    throw new TypeError('events trebuie să fie un tablou');
  }

  // 1. validare completa, inainte de sortare
  events.forEach((event, index) => {
    if (!isValidEvent(event)) {
      throw new TypeError(`eveniment invalid la indexul ${index}`);
    }
  });

  // 2. proiectare: obiecte noi, doar cele 4 campuri (map creeaza o copie)
  return events
    .map((event) => ({
      id: event.id,
      occurredAt: event.occurredAt,
      active: event.active,
      durationMs: event.durationMs,
    }))
    // 3. sortare pe copie: dupa timp, apoi dupa id
    .sort((a, b) => {
      const byTime = Date.parse(a.occurredAt) - Date.parse(b.occurredAt);
      if (byTime !== 0) return byTime;
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
}

export function summarizeEvents(events) {
  if (!Array.isArray(events)) {
    throw new TypeError('events trebuie să fie un tablou');
  }

  let activeCount = 0;
  let totalDurationMs = 0;
  for (const event of events) {
    if (typeof event.active !== 'boolean' || typeof event.durationMs !== 'number') {
      throw new TypeError('eveniment normalizat invalid');
    }
    if (event.active) activeCount += 1;
    totalDurationMs += event.durationMs;
  }
  return { activeCount, totalDurationMs };
}