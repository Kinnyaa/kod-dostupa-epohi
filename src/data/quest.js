export const civilizations = [
  { id: 'egypt', name: 'Египет', period: 'III тысячелетие до н. э.', system: 'Десятичная непозиционная', alphabet: '𓏺 = 1, 𓎆 = 10, 𓍢 = 100', fact: 'Значения повторяющихся знаков складывались; нуля и разрядных позиций не было.' },
  { id: 'babylon', name: 'Вавилон', period: 'II тысячелетие до н. э.', system: 'Позиционная, основание 60', alphabet: 'Два клинописных знака для единиц и десятков', fact: 'Основание 60 удобно для дробей: у 60 много делителей. След системы — минуты и градусы.' },
  { id: 'rome', name: 'Рим', period: 'Античность', system: 'Непозиционная буквенная', alphabet: 'I, V, X, L, C, D, M', fact: 'Сложение и ограниченное вычитание знаков подходили для записей и счёта на абаке.' },
  { id: 'rus', name: 'Древняя Русь', period: 'X–XVII века', system: 'Алфавитная десятичная', alphabet: 'Буквы кириллицы под знаком титла', fact: 'Числовые значения букв позволяли использовать знакомую письменность для записи чисел.' },
];

export const stages = [
  { id: 'protocol', short: 'Протокол', title: 'Взлом протокола', eyebrow: 'Найдите нарушение в шифровке', artifact: 'Свиток исследователя' },
  { id: 'archive', short: 'Архив', title: 'Архив НИИ Времени', eyebrow: 'Сравните системы записи чисел', artifact: 'Папирус числа' },
  { id: 'compile', short: 'Компиляция', title: 'Компиляция', eyebrow: 'Переведите и проверьте', artifact: 'Табличка переводов' },
  { id: 'core', short: 'Ядро', title: 'Сборка ядра', eyebrow: 'Проверьте совместимость с 8 битами', artifact: 'Печать совместимости' },
  { id: 'defense', short: 'Защита', title: 'Защита перед Советом', eyebrow: 'Соберите выводы и защитите решение', artifact: 'Ключ временного ядра' },
];

export const answers = {
  protocolViolation: 'IL', egyptNumber: '243', roman753: 'DCCLIII', binary753: '1011110001',
  divisors60: ['1', '2', '3', '4', '5', '6', '10', '12', '15', '20', '30', '60'],
  divisors100: ['1', '2', '4', '5', '10', '20', '25', '50', '100'],
  binary3600: '111000010000', bits3600: '12',
};

export const normalizeList = (value) => value.trim().split(/[\s,;]+/).filter(Boolean).sort((a, b) => Number(a) - Number(b));
export const sameList = (value, expected) => {
  const actual = normalizeList(value);
  return actual.length === expected.length && actual.every((item, index) => item === expected[index]);
};
