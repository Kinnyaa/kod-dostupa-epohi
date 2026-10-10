const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const bank = JSON.parse(fs.readFileSync(path.join(root, 'docs/content/question-bank.json'), 'utf8'));

test('question bank contains the complete five-stage route', () => {
  const required = bank.questions.filter(({ required }) => required);
  const optional = bank.questions.filter(({ required }) => !required);
  assert.equal(required.length, 13);
  assert.equal(optional.length, 7);
  assert.deepEqual([...new Set(required.map(({ stage }) => stage))].sort(), [1, 2, 3, 4, 5]);
});

test('all five stage screens and release workflow exist', () => {
  for (let stage = 1; stage <= 5; stage += 1) {
    assert.equal(fs.existsSync(path.join(root, `src/js/screens/stage-${stage}.js`)), true);
  }
  assert.equal(fs.existsSync(path.join(root, '.github/workflows/deploy-pages.yml')), true);
});
