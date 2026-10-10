require('./setup.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeBinary, normalizeInteger, normalizeIntegerList, normalizeRoman, normalizeText } = require('../src/js/utils/normalization.js');
const { validateAnswer } = require('../src/js/utils/validators.js');

test('normalizes supported answer formats', () => {
  assert.equal(normalizeInteger(' +007 '), '7');
  assert.equal(normalizeRoman(' dcc liii '), 'DCCLIII');
  assert.equal(normalizeBinary('0b1011 1100_01₂'), '1011110001');
  assert.equal(normalizeIntegerList('6, 2; 3 2'), '2,3,6');
  assert.equal(normalizeText('  НОЛЬ   и Ёлка '), 'ноль и елка');
});

test('validates single and multiple choice answers', () => {
  const single = { type: 'singleChoice', correctAnswer: 'Верно', acceptedAnswers: ['Верно'] };
  const multiple = { type: 'multiChoice', correctAnswer: [2, 3, 4], acceptedAnswers: ['2,3,4'] };
  assert.equal(validateAnswer(single, 'Верно').correct, true);
  assert.equal(validateAnswer(single, '').valid, false);
  assert.equal(validateAnswer(multiple, ['4', '2', '3']).correct, true);
});
