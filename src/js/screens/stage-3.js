import { createQuestionComponent } from '../components/question';
import { validateAnswer } from '../utils/validators';
import {
  addArtifact,
  completeQuestion,
  getState,
  openHint,
  registerAttempt,
  setActiveQuestion,
  unlockStage,
  updateAnswer,
} from '../state';
import { artifactImage, icon } from '../components/icons';

const ARTIFACT_ID = 'translation-table';
const tasks = [
  { id: 'rome-01', short: 'Римская запись', mark: 'DCCLIII', pendingMark: '753', label: '753₁₀ → римская система' },
  { id: 'cross-01', short: 'Двоичная запись', mark: '1011110001₂', pendingMark: '753', label: '753₁₀ → двоичная система' },
  { id: 'cross-02', short: 'Делители 60', mark: '12', pendingMark: '60', label: 'Найти все положительные делители' },
  { id: 'cross-03', short: 'Сравнение', mark: '60 : 100', label: 'Сравнить количество делителей' },
];

const renderTranslationTable = (state) => {
  const romanReady = state.completedQuestions.includes('rome-01');
  const binaryReady = state.completedQuestions.includes('cross-01');
  const row = (system, value, ready) => `<div class="translation-row ${ready ? 'is-verified' : ''}" role="row"><strong>${system}</strong><code>${ready ? value : '—'}</code><span>${ready ? `${icon('status-complete')} Проверено` : `${icon('status-locked')} Ожидает проверки`}</span></div>`;
  return `<section class="translation-table" aria-labelledby="translation-title"><header><div><p class="stage-kicker">Таблица переводов</p><h2 id="translation-title">Одно число — три записи</h2></div><strong>753</strong></header><div role="table" aria-label="Переводы числа 753"><div class="translation-row translation-row--header" role="row"><span>Система</span><span>Запись</span><span>Статус</span></div>${row('Десятичная', '753', true)}${row('Римская', 'DCCLIII', romanReady)}${row('Двоичная', '1011110001₂', binaryReady)}</div></section>`;
};

const renderDivisorComparison = (state) => {
  const listReady = state.completedQuestions.includes('cross-02');
  const comparisonReady = state.completedQuestions.includes('cross-03');
  return `<section class="divisor-board" aria-labelledby="divisor-title"><header><p class="stage-kicker">Проверка основания 60</p><h2 id="divisor-title">Почему 60 удобно для деления?</h2></header><div class="divisor-columns"><article class="${listReady ? 'is-revealed' : ''}"><strong>60</strong><span>${listReady ? '12 делителей' : 'Список закрыт'}</span><p>${listReady ? '1 · 2 · 3 · 4 · 5 · 6 · 10 · 12 · 15 · 20 · 30 · 60' : 'Выполните задание о делителях.'}</p></article><article class="${comparisonReady ? 'is-revealed' : ''}"><strong>100</strong><span>${comparisonReady ? '9 делителей' : 'Сравнение закрыто'}</span><p>${comparisonReady ? '1 · 2 · 4 · 5 · 10 · 20 · 25 · 50 · 100' : 'Сделайте вывод после проверки списка 60.'}</p></article></div>${comparisonReady ? '<p class="divisor-conclusion">Вывод: 60 делится без остатка на большее число целых значений, поэтому шестидесятеричная система удобна для дробей, времени и углов.</p>' : ''}</section>`;
};

export const renderStageThree = ({ root, questionBank, onStateChange }) => {
  const state = getState();
  const taskIds = tasks.map(({ id }) => id);
  const firstIncomplete = taskIds.find((id) => !state.completedQuestions.includes(id));
  const requested = state.activeQuestionByStage?.[3];
  const activeId = taskIds.includes(requested) ? requested : (firstIncomplete || taskIds[0]);
  const activeTask = tasks.find(({ id }) => id === activeId);
  const question = questionBank.questions.find(({ id }) => id === activeId);
  const completedCount = taskIds.filter((id) => state.completedQuestions.includes(id)).length;
  const artifactUnlocked = state.artifacts.includes(ARTIFACT_ID);

  root.innerHTML = `<section class="quest-card stage-three" aria-labelledby="quest-title">
    <header><p class="stage-kicker">Этап 3</p><h1 id="quest-title" tabindex="-1">Компиляция</h1><p class="eyebrow">Переводим данные между системами</p></header>
    <p class="intro">Проверьте две записи числа 753, исследуйте делители и соберите таблицу корректных переводов.</p>
    <div class="compiler-steps" role="tablist" aria-label="Задания компиляции">${tasks.map((task, index) => { const complete = state.completedQuestions.includes(task.id); const active = task.id === activeId; return `<button type="button" role="tab" aria-selected="${active}" class="compiler-step ${active ? 'is-active' : ''} ${complete ? 'is-complete' : ''}" data-question="${task.id}"><span>${complete ? '✓' : index + 1}</span><strong>${task.short}</strong><small>${task.label}</small></button>`; }).join('')}</div>
    <section class="compiler-console" aria-labelledby="compiler-question"><div class="compiler-console__mark"><span>${state.completedQuestions.includes(activeId) ? activeTask.mark : activeTask.pendingMark || activeTask.mark}</span><small>Контрольная операция ${Math.min(completedCount + (state.completedQuestions.includes(activeId) ? 0 : 1), 4)} из 4</small></div><div class="compiler-console__body"><h2 id="compiler-question">${question.prompt}</h2><form class="answer-form stage-three__form"></form></div></section>
    ${renderTranslationTable(state)}
    ${renderDivisorComparison(state)}
    <section class="stage-artifact ${artifactUnlocked ? 'is-unlocked' : ''}" aria-live="polite"><span class="stage-artifact__icon" aria-hidden="true">${artifactUnlocked ? artifactImage('translation-tablet') : icon('status-locked')}</span><div><p>Артефакт этапа</p><h2>Табличка переводов</h2><span>${artifactUnlocked ? 'Проверена — этап 4 открыт' : `Проверено операций: ${completedCount} из 4`}</span></div></section>
  </section>`;

  root.querySelectorAll('.compiler-step').forEach((tab) => tab.addEventListener('click', () => { setActiveQuestion(3, tab.dataset.question); onStateChange(); }));

  let ui;
  const form = root.querySelector('.stage-three__form');
  const target = () => question.type === 'singleChoice' ? form.querySelector('input[name="answer"]') : ui.control;
  const setFormState = (name, message) => { form.dataset.state = name; ui.status.textContent = message; target()?.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false'); };
  const showHint = (save = true) => { ui.hint.innerHTML = `<strong>Подсказка:</strong> ${question.hint}`; ui.hint.hidden = false; ui.hintButton.setAttribute('aria-expanded', 'true'); if (save) openHint(activeId); };

  ui = createQuestionComponent({
    container: form,
    question,
    initialValue: state.answers[activeId] || '',
    onChange: (value) => { updateAnswer(activeId, value); if (form.dataset.state !== 'success') setFormState('', ''); },
    onHint: () => { const opening = ui.hint.hidden; ui.hint.hidden = !opening; ui.hintButton.setAttribute('aria-expanded', String(opening)); if (opening) { showHint(); ui.hint.focus({ preventScroll: true }); } },
    onSubmit: (value) => {
      const result = validateAnswer(question, value);
      if (!result.valid) { setFormState('error', `Ошибка формата: ${result.message}`); target()?.focus(); return; }
      updateAnswer(activeId, value);
      const attempt = registerAttempt(activeId);
      const label = ui.submit.querySelector('.button-label');
      ui.submit.disabled = true; ui.submit.classList.add('is-loading'); label.textContent = 'Проверяем'; ui.status.textContent = 'Проверяем ответ…';
      window.setTimeout(() => {
        if (result.correct) {
          completeQuestion(question);
          const latest = getState();
          const allComplete = taskIds.every((id) => latest.completedQuestions.includes(id));
          if (allComplete) { addArtifact(ARTIFACT_ID); unlockStage(4); }
          else { const next = taskIds.find((id) => !latest.completedQuestions.includes(id)); if (next) setActiveQuestion(3, next); }
          onStateChange();
        } else {
          if (attempt === 1) showHint();
          setFormState('error', attempt >= 2 ? `Ответ неверный. ${question.errorExplanation}` : 'Ответ неверный. Открыта подсказка — попробуйте снова.');
          label.textContent = 'Проверить снова'; ui.submit.disabled = false; ui.submit.classList.remove('is-loading'); target()?.focus();
        }
      }, 450);
    },
  });
  if (state.openedHints.includes(activeId)) showHint(false);
  if (state.completedQuestions.includes(activeId)) { setFormState('success', `Проверено. ${question.errorExplanation}`); ui.submit.querySelector('.button-label').textContent = 'Ответ принят'; }
  root.querySelector('#quest-title')?.focus({ preventScroll: true });
};
