const { memory } = require('./setup.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');

const freshState = () => {
  memory.clear();
  for (const key of Object.keys(require.cache)) if (key.includes('src\\js\\state') || key.includes('src/js/state')) delete require.cache[key];
  return require('../src/js/state.js');
};

test('stores no more than two participant names', () => {
  const state = freshState();
  state.registerTeam('Команда', [' Анна ', 'Максим', 'Третий']);
  assert.deepEqual(state.getState().participants, ['Анна', 'Максим']);
});

test('awards points for only five optional questions', () => {
  const state = freshState();
  for (let index = 0; index < 7; index += 1) {
    const id = ['egypt-02', 'egypt-03', 'babylon-02', 'babylon-03', 'rome-03', 'rus-02', 'rus-03'][index];
    state.registerAttempt(id);
    state.completeQuestion({ id, points: 5, required: false });
  }
  assert.equal(state.getState().score, 25);
  assert.equal(state.getState().completedQuestions.length, 7);
});

test('reset removes all progress', () => {
  const state = freshState();
  state.registerTeam('Команда', ['Анна']);
  state.startGame();
  state.resetProgress();
  assert.equal(state.getState().teamName, '');
  assert.deepEqual(state.getState().participants, []);
  assert.equal(state.getState().score, 0);
});
