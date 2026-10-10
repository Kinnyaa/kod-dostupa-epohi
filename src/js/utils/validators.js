import { normalizeByType } from './normalization';

const ROMAN_PATTERN = /^(?=[MDCLXVI]+$)M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
const BINARY_PATTERN = /^[01]+$/;

const formatError = (type) => {
  const messages = {
    integer: 'Введите целое число арабскими цифрами.',
    roman: 'Используйте корректную римскую запись буквами I, V, X, L, C, D и M.',
    binary: 'Используйте только нули и единицы.',
    listOfIntegers: 'Введите целые числа через пробел, запятую или точку с запятой.',
    singleChoice: 'Выберите один вариант ответа.',
    text: 'Введите ответ.',
  };
  return messages[type] || 'Заполните ответ.';
};

const getAcceptedAnswers = (question) => {
  const accepted = question.acceptedAnswers?.length
    ? question.acceptedAnswers
    : [question.correctAnswer];
  return accepted.map((answer) => normalizeByType(question.type, answer));
};

export const validateAnswer = (question, value) => {
  const normalized = normalizeByType(question.type, value);
  const empty = value == null || (Array.isArray(value) ? value.length === 0 : String(value).trim() === '');
  if (empty) return { valid: false, correct: false, normalized, message: formatError(question.type) };

  if (normalized == null) {
    return { valid: false, correct: false, normalized, message: formatError(question.type) };
  }
  if (question.type === 'roman' && !ROMAN_PATTERN.test(normalized)) {
    return { valid: false, correct: false, normalized, message: formatError(question.type) };
  }
  if (question.type === 'binary' && !BINARY_PATTERN.test(normalized)) {
    return { valid: false, correct: false, normalized, message: formatError(question.type) };
  }

  const correct = getAcceptedAnswers(question).includes(normalized);
  return { valid: true, correct, normalized, message: '' };
};
