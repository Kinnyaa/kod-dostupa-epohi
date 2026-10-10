const collapseSpaces = (value) => String(value ?? '').trim().replace(/\s+/g, ' ');

export const normalizeText = (value) => collapseSpaces(value)
  .toLocaleLowerCase('ru-RU')
  .replace(/ё/g, 'е');

export const normalizeRoman = (value) => String(value ?? '')
  .replace(/\s+/g, '')
  .toUpperCase();

export const normalizeInteger = (value) => {
  const source = String(value ?? '').replace(/[\s\u00a0]/g, '');
  return /^[-+]?\d+$/.test(source) ? String(Number.parseInt(source, 10)) : null;
};

export const normalizeBinary = (value) => String(value ?? '')
  .trim()
  .replace(/^0b/i, '')
  .replace(/[\s_]/g, '')
  .replace(/₂$/u, '');

export const normalizeIntegerList = (value) => {
  const parts = Array.isArray(value)
    ? value
    : String(value ?? '').trim().split(/[\s,;]+/);
  if (!parts.length || parts.some((part) => !/^[-+]?\d+$/.test(String(part)))) return null;
  return [...new Set(parts.map(Number))].sort((a, b) => a - b).join(',');
};

export const normalizeByType = (type, value) => {
  switch (type) {
    case 'integer': return normalizeInteger(value);
    case 'roman': return normalizeRoman(value);
    case 'binary': return normalizeBinary(value);
    case 'listOfIntegers': return normalizeIntegerList(value);
    case 'multiChoice': return normalizeIntegerList(value);
    case 'singleChoice':
    case 'text':
    default: return normalizeText(value);
  }
};
