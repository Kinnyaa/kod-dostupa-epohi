require('./setup.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const bank = require('../docs/content/question-bank.json');
const { validateRubric, normalizeRubricText } = require('../src/js/utils/rubric-validator');
const state = require('../src/js/state');
const { submitRubricAnswer } = require('../src/js/components/rubric-question');
const hypothesis = bank.questions.find(({ id }) => id === 'final-01');
const final = bank.questions.find(({ id }) => id === 'final-02');
const explanation = 'Основание определяет набор цифр и веса разрядов. Значение числа не меняется.';
const full = `${explanation} 255₁₀ = 11111111₂ = CF₂₀.`;
const evaluate = (text) => validateRubric(final, text);

for (const [name, text] of [
  ['reference answer', full],
  ['bank reference', final.correctAnswer],
  ['paraphrase', 'Используется другой набор символов. Это одно и то же количество. Пример: 255 = 11111111₂.'],
  ['sentence order', '255 = CF₂₀. Значение остается прежним. Число занимает разное количество разрядов.'],
  ['word forms', 'Разные системы используют разные цифры для записи. Количество предметов при этом не изменяется. Например, 255 = 11111111(2).'],
  ['single typo', full.replace('основание', 'основане').replace('Основание', 'Основане')],
  ['natural base suffix', `${explanation} Пример числа 255: 11111111 в двоичной системе.`],
  ['natural base prefix', `${explanation} Пример числа 255: в двоичной системе 11111111.`],
  ['conversion phrasing', `${explanation} 255 в двоичной системе записывается как 11111111.`],
  ['not only', `${explanation} Меняется не только запись, но и длина представления. 255 = CF₂₀.`],
  ['explicit unchanged reversed', 'Основание задает веса разрядов. Не меняется значение числа. 255 = CF₂₀.'],
  ['form paraphrase', 'Меняется форма представления числа. Это одно и то же количество. 255 = CF₂₀.'],
  ['base does not affect value', `${full} Основание не влияет на значение числа.`],
  ['supplementary equality', `${full} Например, число разрядов в этом случае равно 8 = 8.`],
]) test(`rubric accepts ${name}`, () => assert.equal(evaluate(text).correct, true, JSON.stringify(evaluate(text))));

for (const [name, suffix] of [
  ['wrong binary digit', '255 = 11111112₂'],
  ['wrong binary value', '255 = 11111110₂'],
  ['wrong base20 value', '255 = CE₂₀'],
  ['CF labelled hexadecimal', '255 = CF₁₆'],
  ['CF described as hexadecimal', 'CF является шестнадцатеричной записью 255'],
  ['CF dash hexadecimal', 'CF — шестнадцатеричная запись числа 255'],
  ['incompatible equality', '255 = 256'],
  ['incompatible equality without repeating source', '11111111 = 256'],
  ['changed value', 'Значение числа меняется'],
  ['changed value reversed', 'Изменяется значение числа'],
  ['value not preserved', 'Значение числа не сохраняется'],
  ['base denied', 'Основание не влияет на запись'],
  ['base denied with system qualifier', 'Основание системы не определяет веса разрядов'],
  ['different value', 'Значение числа становится другим'],
  ['not only notation changes', 'Меняется не только запись, но и значение'],
]) test(`rubric rejects contradiction even beside correct answer: ${name}`, () => {
  const result = evaluate(`${full} ${suffix}.`);
  assert.equal(result.correct, false);
  assert.ok(result.contradictions.length, JSON.stringify(result));
});

test('incomplete answer reports missing criterion without inventing contradiction', () => {
  const result = evaluate('Основание определяет набор цифр и веса разрядов. Например, 255 = 11111111₂.');
  assert.equal(result.correct, false);
  assert.ok(result.missingCriteria.includes('same-value'));
  assert.equal(result.contradictions.length, 0);
});
test('isolated keywords and repeated words are not explanations', () => {
  for (const text of ['255 11111111 CF значение не меняется', 'основание цифры разряды значение количество символы запись 255 11111111 CF', 'значение '.repeat(40)]) {
    assert.equal(evaluate(text).correct, false);
  }
});
test('empty, short and oversized answers are invalid', () => {
  for (const text of ['', 'не знаю', 'а'.repeat(4100)]) assert.equal(evaluate(text).valid, false);
});
test('missing examples remain partial even if words mention both bases', () => {
  const result = evaluate(`${explanation} Двоичная и двадцатеричная системы позволяют записывать числа.`);
  assert.equal(result.correct, false);
  assert.ok(result.partialCriteria.includes('binary-example'));
});
test('normalization preserves exact digits and handles Unicode and spaces', () => {
  assert.equal(normalizeRubricText(' Ёлка\u00a0 «CF₂₀» — 11111111₂ '), 'елка "cf_20" - 11111111_2');
});
test('hypothesis accepts explained practical conditions', () => {
  const result = validateRubric(hypothesis, 'Выбор записи зависел от задач торговли и измерения земли. Для записи использовали доступные материалы и знаки.');
  assert.equal(result.correct, true, JSON.stringify(result));
});
test('hypothesis rejects a universal sole cause and accepts not-only wording', () => {
  const rest = ' Люди использовали разные материалы и знаки, чтобы удобнее выполнять вычисления.';
  assert.equal(validateRubric(hypothesis, 'Выбор записи зависел только от количества пальцев.' + rest).correct, false);
  assert.equal(validateRubric(hypothesis, 'Выбор записи зависел не только от задач счета.' + rest).correct, true);
});
test('live analysis is pure and does not affect progress', () => {
  state.resetProgress(); state.registerTeam('Тест', ['Анна']); state.startGame();
  const before = JSON.stringify(state.getState());
  for (let i = 0; i < full.length; i += 1) evaluate(full.slice(0, i));
  assert.equal(JSON.stringify(state.getState()), before);
});
test('hypothesis does not credit negated practical conditions', () => {
  const result = validateRubric(hypothesis, 'Выбор записи не зависел от задач торговли и измерения земли. Для записи не использовали доступные материалы и знаки.');
  assert.equal(result.correct, false);
  assert.ok(result.missingCriteria.includes('tasks'));
  assert.ok(result.missingCriteria.includes('tools'));
});
test('hypothesis rejects a list of topic keywords', () => {
  assert.equal(validateRubric(hypothesis, 'Выбор задачи торговля материалы инструменты вычисления удобство').correct, false);
});
test('explicit submissions count once, preserve penalties and prevent duplicate awards', () => {
  state.resetProgress(); state.startGame();
  const wrong = `${explanation} 255 = 11111110₂.`;
  submitRubricAnswer(final, wrong, evaluate(wrong));
  assert.equal(state.getState().attempts[final.id], 1);
  assert.ok(state.getState().openedHints.includes(final.id));
  assert.equal(state.getState().score, 0);
  submitRubricAnswer(final, full, evaluate(full));
  assert.equal(state.getState().attempts[final.id], 2);
  assert.equal(state.getState().score, 3);
  submitRubricAnswer(final, full, evaluate(full));
  assert.equal(state.getState().attempts[final.id], 2);
  assert.equal(state.getState().score, 3);
});
test('invalid submission does not spend an attempt', () => {
  state.resetProgress();
  submitRubricAnswer(final, '', evaluate(''));
  assert.deepEqual(state.getState().attempts, {});
});
test('expired expedition blocks rubric scoring', () => {
  state.resetProgress(); state.updateTimer('expedition', { startedAt: Date.now() - 91 * 60000 });
  assert.ok(submitRubricAnswer(final, full, evaluate(full)).expired);
  assert.equal(state.getState().score, 0);
});
test('legacy completed answer stays accepted without reassessment or new attempts', () => {
  state.resetProgress(); state.updateState({ completedQuestions: [final.id], answers: { [final.id]: 'Старый ответ' }, score: 5 });
  assert.ok(submitRubricAnswer(final, 'Старый ответ', evaluate('Старый ответ')).alreadyCompleted);
  assert.equal(state.getState().score, 5);
  assert.equal(state.getState().schemaVersion, 3);
});
test('full route still earns exactly 100 including optional cap and blitz', () => {
  state.resetProgress();
  for (const question of bank.questions) { state.registerAttempt(question.id); state.completeQuestion(question); }
  state.completeBlitz('blitz-01', 5, 5);
  assert.equal(state.getState().score, 100);
});
test('each rubricText question has complete declarative rubric', () => {
  for (const question of bank.questions.filter(({ type }) => type === 'rubricText')) {
    assert.ok(question.rubric.criteria.length);
    assert.ok(question.rubric.threshold > 0);
    for (const criterion of question.rubric.criteria) assert.ok(criterion.id && criterion.title && criterion.message);
  }
});
