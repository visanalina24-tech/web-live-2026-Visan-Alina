const leafOperators = {
  // comparatie stricta, fara conversie
  equals: (actual, expected) => actual === expected,
  // doar numere: '4' nu conteaza ca 4
  atLeast: (actual, expected) =>
    typeof actual === 'number' && typeof expected === 'number' && actual >= expected,
  // doar tablouri
  includes: (actual, expected) => Array.isArray(actual) && actual.includes(expected),
};

export function compileRule(definition) {
  if (typeof definition !== 'object' || definition === null || Array.isArray(definition)) {
    throw new TypeError('regula trebuie sa fie un obiect');
  }

  const keys = Object.keys(definition);

  // regula compusa: exact o cheie, all / any / not
  if ('all' in definition || 'any' in definition || 'not' in definition) {
    if (keys.length !== 1) {
      throw new TypeError('o regula compusa are exact o forma');
    }

    if ('not' in definition) {
      const child = compileRule(definition.not); // compilat o singura data
      return (record) => !child(record);
    }

    const kind = 'all' in definition ? 'all' : 'any';
    const list = definition[kind];
    if (!Array.isArray(list) || list.length === 0) {
      throw new TypeError(`${kind} trebuie sa fie un tablou nevid`);
    }

    const children = list.map(compileRule); // compilati o singura data
    return kind === 'all'
      ? (record) => children.every((child) => child(record))
      : (record) => children.some((child) => child(record));
  }

  // regula-frunza: field, operator, value
  const { field, operator } = definition;
  if (typeof field !== 'string' || !('value' in definition)) {
    throw new TypeError('regula-frunza are nevoie de field si value');
  }
  if (!Object.hasOwn(leafOperators, operator)) {
    throw new TypeError('operator necunoscut');
  }

  const compare = leafOperators[operator];
  const expected = definition.value;
  // inchiderea tine minte field, compare si expected
  return (record) => compare(record?.[field], expected);
}

export function evaluateRecords(records, definition) {
  if (!Array.isArray(records)) {
    throw new TypeError('records trebuie sa fie un tablou');
  }

  const predicate = compileRule(definition); // o singura data

  const matchedIds = [];
  const rejectedIds = [];
  for (const record of records) {
    (predicate(record) ? matchedIds : rejectedIds).push(record.id);
  }
  return { matchedIds, rejectedIds };
}