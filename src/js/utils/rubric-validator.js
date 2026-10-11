// Deterministic, local rubric assessment. It deliberately reports unrecognised
// explanations as incomplete; it is not a general natural-language model.
export const normalizeRubricText = (value) => String(value ?? '')
  .toLocaleLowerCase('ru-RU').replace(/ё/g, 'е')
  .replace(/[₀-₉]+/g, (digits) => `_${[...digits].map((digit) => '₀₁₂₃₄₅₆₇₈₉'.indexOf(digit)).join('')}`)
  .replace(/[\u00a0\u202f\s]+/g, ' ')
  .replace(/[—–−]/g, '-').replace(/[«»“”„]/g, '"').trim();

const wordsOf = (text) => text.match(/[а-я]+/g) || [];
const hasTerm = (text, terms = []) => wordsOf(text).some((word) => terms.some((term) => word.startsWith(term)));

const oneEditAway = (a, b) => {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0; let j = 0; let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i += 1; j += 1; continue; }
    edits += 1;
    if (edits > 1) return false;
    if (a.length >= b.length) i += 1;
    if (b.length >= a.length) j += 1;
  }
  return edits + Number(i < a.length || j < b.length) <= 1;
};

const correctTerms = (text, terms) => text.replace(/[а-я]{5,}/g, (word) => {
  if (terms.includes(word)) return word;
  const candidates = terms.filter((term) => term.length >= 5 && oneEditAway(word, term));
  return candidates.length === 1 ? candidates[0] : word;
});

// Patterns are shipped with the trusted question bank, never supplied by a user.
const matches = (text, patterns = []) => patterns.some((pattern) => new RegExp(pattern, 'u').test(text));

const numericFacts = (text, expectedValue) => {
  const facts = [];
  const incompatibleEqualities = [];
  const add = (digits, base) => {
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
    const valid = base >= 2 && base <= 36 && [...digits].every((digit) => alphabet.indexOf(digit) >= 0 && alphabet.indexOf(digit) < base);
    facts.push({ digits, base, value: valid ? parseInt(digits, base) : NaN });
  };
  // Keep explicit bases authoritative, including unexpected bases such as 16.
  for (const m of text.matchAll(/(?<![а-яa-z0-9])([0-9a-z]+)\s*(?:_\s*(\d+)|\((\d+)\))/gu)) add(m[1], Number(m[2] || m[3]));
  const baseNames = '(двоичн[а-я]*|бинарн[а-я]*|двадцатеричн[а-я]*|шестнадцатеричн[а-я]*|десятичн[а-я]*)';
  const baseFor = (name) => name.startsWith('двадцат') ? 20 : name.startsWith('шестнадцат') ? 16 : name.startsWith('десятич') ? 10 : 2;
  // Attach a natural-language base only to its adjacent representation.
  const after = new RegExp(`(?<![а-яa-z0-9])([0-9a-z]+)\\s+(?:-\\s*)?(?:в |это |является |является записью в )?${baseNames}`, 'gu');
  const before = new RegExp(`${baseNames}(?: система| системе| запись| записи)?(?: счисления)?\\s*(?:это|равно|равна|запись|записывается как|записывается|представлено как|число)?\\s*[-:=]?\\s*([0-9a-z]+)(?![а-яa-z0-9_(])`, 'gu');
  for (const m of text.matchAll(after)) {
    const tail = text.slice(m.index + m[0].length).split(/[.!?;]/)[0];
    if (Number(m[1]) === expectedValue && /^ (?:системе|системе счисления)?\s*(?:записывается|представлено)/.test(tail)) continue;
    add(m[1], baseFor(m[2]));
  }
  for (const m of text.matchAll(before)) add(m[2], baseFor(m[1]));
  // Infer an unlabelled representation only in an explicit equality, never
  // from an isolated number or a count of digits in explanatory prose.
  for (const chain of text.matchAll(/(?<![а-яa-z0-9])(?:[a-z0-9]+(?:_\d+|\(\d+\))?\s*=\s*)+[a-z0-9]+(?:_\d+|\(\d+\))?/gu)) {
    const tokens = chain[0].split('=').map((part) => part.trim());
    // A supplementary equality is not a claim about 255, but must be consistent.
    if (!new RegExp(`(?<![0-9])${expectedValue}(?![0-9])`, 'u').test(chain[0])) {
      const values = tokens.map((token) => {
        const parts = token.match(/^([a-z0-9]+)(?:_(\d+)|\((\d+)\))?$/);
        const base = Number(parts[2] || parts[3]) || (/^[01]{4,}$/.test(parts[1]) ? 2 : /^[0-9]+$/.test(parts[1]) ? 10 : 20);
        return base >= 2 && base <= 36 ? parseInt(parts[1], base) : NaN;
      });
      if (values.some((value) => value !== values[0])) incompatibleEqualities.push(chain[0]);
      continue;
    }
    for (const token of tokens) {
      if (/[_()]/.test(token)) continue;
      const base = /^[01]{4,}$/.test(token) ? 2 : /^[0-9]+$/.test(token) ? 10 : 20;
      add(token, base);
    }
  }
  return {
    facts,
    incompatibleEqualities,
    hasSource: new RegExp(`(?<![0-9])${expectedValue}(?![0-9])`, 'u').test(text),
  };
};

export const validateRubric = (question, value) => {
  const rubric = question.rubric;
  if (!rubric) throw new Error(`Missing rubric for ${question.id}`);
  const raw = normalizeRubricText(value);
  const text = correctTerms(raw.slice(0, rubric.maxLength || 4000), rubric.fuzzyTerms || []);
  const words = wordsOf(text);
  const valid = raw.replace(/[^а-яa-z0-9]/g, '').length >= rubric.minLength
    && words.length >= rubric.minWords && raw.length <= (rubric.maxLength || 4000);
  const sentences = text.split(/[.!?;]+/).filter(Boolean);
  const coherent = new Set(words).size >= rubric.minWords
    && sentences.some((sentence) => wordsOf(sentence).length >= 4 && hasTerm(sentence, rubric.relations));
  const contradictions = (rubric.contradictions || []).filter((rule) => sentences.some((sentence) => {
    // A denied claim ("не только", "не меняется значение") is not an assertion.
    const assertion = sentence.replace(/не только/g, 'также')
      .replace(/не (?:меняется|изменяется) (?:само )?(?:значение|количество)/g, 'сохраняется значение');
    return matches(assertion, rule.patterns);
  })).map(({ id, message, criteria }) => ({ id, message, criteria }));

  const numeric = rubric.exampleValue === undefined ? null : numericFacts(raw, rubric.exampleValue);
  if (numeric) {
    if (numeric.incompatibleEqualities.length) contradictions.push({ id: 'incompatible-equality',
      message: 'Проверьте равенства: по обе стороны должно быть одно и то же значение.', criteria: [] });
    numeric.facts.filter((fact) => fact.value !== rubric.exampleValue).forEach((fact) => {
      const id = `number-${fact.digits}-${fact.base}`;
      if (contradictions.some((item) => item.id === id)) return;
      contradictions.push({ id, message: 'Проверьте числовой пример: запись и указанное основание не соответствуют исходному числу.',
        criteria: rubric.criteria.filter((criterion) => criterion.numericBase === fact.base).map(({ id: criterionId }) => criterionId) });
    });
  }
  const partialCriteria = [];
  const matchedCriteria = [];
  rubric.criteria.forEach((criterion) => {
    const mentioned = hasTerm(text, criterion.terms) || (criterion.numericBase && numeric?.facts.some(({ base }) => base === criterion.numericBase));
    let satisfied;
    if (criterion.numericBase) {
      satisfied = numeric.hasSource && numeric.facts.some(({ base, value: numericValue }) => base === criterion.numericBase && numericValue === rubric.exampleValue);
    } else {
      satisfied = sentences.flatMap((sentence) => sentence.split(/,\s*(?:но|а|однако)\s+/)).some((sentence) => {
        if (wordsOf(sentence).length < 3 || !hasTerm(sentence, criterion.terms)) return false;
        if (matches(sentence.replace(/не только/g, 'также'), rubric.negatedRelations)) return false;
        if (criterion.patterns) return matches(sentence, criterion.patterns);
        if (matches(sentence, criterion.alternativePatterns)) return true;
        if (!hasTerm(sentence, rubric.relations)) return false;
        return (criterion.groups || []).every((group) => hasTerm(sentence, group));
      });
    }
    const contradicted = contradictions.some((item) => item.criteria.includes(criterion.id));
    if (valid && coherent && satisfied && !contradicted) matchedCriteria.push(criterion.id);
    else if (mentioned) partialCriteria.push(criterion.id);
  });
  const missingCriteria = rubric.criteria.filter(({ id }) => !matchedCriteria.includes(id)).map(({ id }) => id);
  const correct = valid && coherent && !contradictions.length && matchedCriteria.length >= rubric.threshold
    && rubric.criteria.filter(({ required }) => required).every(({ id }) => matchedCriteria.includes(id));
  const feedback = correct ? 'Объяснение принято: обязательные критерии раскрыты.'
    : contradictions.length ? contradictions[0].message
      : !valid ? `Дайте связное объяснение: не менее ${rubric.minLength} букв и цифр и ${rubric.minWords} слов, не более ${rubric.maxLength || 4000} символов.`
        : !coherent ? 'Свяжите идеи в объяснение: перечисления терминов недостаточно.'
          : rubric.criteria.find(({ id }) => missingCriteria.includes(id))?.message || 'Уточните объяснение.';
  return { valid, correct, score: matchedCriteria.length, maxScore: rubric.criteria.length, matchedCriteria, missingCriteria, partialCriteria, contradictions, feedback };
};
