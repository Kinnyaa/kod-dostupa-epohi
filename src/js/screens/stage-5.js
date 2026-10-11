import { createQuestionComponent } from '../components/question';
import { createRubricQuestion } from '../components/rubric-question';
import { validateAnswer } from '../utils/validators';
import {
  addArtifact,
  completeBlitz,
  completeQuestion,
  getState,
  openHint,
  recoverQuestion,
  registerAttempt,
  setActiveQuestion,
  unlockStage,
  updateAnswer,
  updateTimer,
  ACHIEVEMENT_DEFINITIONS,
} from '../state';
import { artifactImage, icon } from '../components/icons';
import { openResultCardModal } from '../components/result-card-modal';

const FINAL_IDS = ['final-02', 'final-03'];
const ARTIFACT_ID = 'core-patch';
const BLITZ_ID = 'blitz-01';
const BLITZ_DURATION = 90;
const blitzQuestions = [
  { prompt: 'Какая запись числа 99 является канонической?', options: ['IC', 'XCIX', 'LXXXXVIIII'], answer: 'XCIX' },
  { prompt: 'Какое основание использовала вавилонская позиционная система?', options: ['10', '20', '60'], answer: '60' },
  { prompt: 'Как записывается число 753 в двоичной системе?', options: ['1011110001', '1011100001', '1111110001'], answer: '1011110001' },
  { prompt: 'Какое максимальное значение помещается в 8 бит без знака?', options: ['127', '255', '256'], answer: '255' },
  { prompt: 'Сколько минимум бит нужно для записи числа 3600?', options: ['8', '10', '12'], answer: '12' },
];
const mandatoryIds = ['rome-02', 'final-01', 'egypt-01', 'babylon-01', 'rome-01', 'rus-01', 'cross-01', 'cross-02', 'cross-03', 'cross-04', 'practical-01', 'final-02', 'final-03', BLITZ_ID];

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const timerRemaining = (timer) => {
  if (!timer?.startedAt) return BLITZ_DURATION;
  if (timer.completed) return Math.max(0, timer.remaining ?? 0);
  return Math.max(0, BLITZ_DURATION - Math.floor((Date.now() - timer.startedAt) / 1000));
};

const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')} : ${String(seconds % 60).padStart(2, '0')}`;

const finishBlitz = (onStateChange) => {
  const state = getState();
  if (state.completedQuestions.includes(BLITZ_ID)) return;
  const progress = state.answers[BLITZ_ID] || {};
  updateTimer('blitz', { completed: true, remaining: timerRemaining(state.timers.blitz), finishedAt: Date.now() });
  completeBlitz(BLITZ_ID, progress.correct || 0, blitzQuestions.length);
  addArtifact(ARTIFACT_ID);
  unlockStage(6);
  onStateChange();
};

const renderBlitz = (state) => {
  const questionsReady = FINAL_IDS.every((id) => state.completedQuestions.includes(id));
  const timer = state.timers.blitz;
  const remaining = timerRemaining(timer);
  const completed = state.completedQuestions.includes(BLITZ_ID);
  const progress = state.answers[BLITZ_ID] || { index: 0, correct: 0, selections: [] };
  const current = blitzQuestions[Math.min(progress.index || 0, blitzQuestions.length - 1)];
  if (completed) return `<section class="blitz-room is-complete" aria-labelledby="blitz-title"><div><p class="stage-kicker">Блиц завершён</p><h2 id="blitz-title">Результат: ${progress.correct || 0} из ${blitzQuestions.length}</h2><p>За каждый правильный ответ начислен один балл. Ключ временного ядра получен.</p></div><div class="blitz-score">${icon('status-reward')}<strong>+${progress.correct || 0}</strong><span>баллов</span></div></section>`;
  if (!timer?.startedAt) return `<section class="blitz-room" aria-labelledby="blitz-title"><div><p class="stage-kicker">Финальное испытание</p><h2 id="blitz-title">Блиц-тест: 5 вопросов за 90 секунд</h2><p>Выберите по одному ответу на каждый вопрос. За каждый верный ответ команда получает 1 балл. После выбора вернуться к предыдущему вопросу нельзя.</p></div><div class="blitz-clock"><time datetime="PT90S">01 : 30</time><span>${questionsReady ? 'Таймер готов' : 'Сначала завершите два вывода'}</span><button class="primary-button blitz-start" type="button" ${questionsReady ? '' : 'disabled'}>Начать блиц</button></div></section>`;
  return `<section class="blitz-room is-running" aria-labelledby="blitz-title"><div class="blitz-question"><div class="blitz-question__meta"><span>Вопрос ${(progress.index || 0) + 1} из ${blitzQuestions.length}</span><strong>Правильных: ${progress.correct || 0}</strong></div><h2 id="blitz-title">${current.prompt}</h2><div class="blitz-options">${current.options.map((option) => `<button type="button" data-blitz-answer="${option}">${option}</button>`).join('')}</div></div><div class="blitz-clock"><time datetime="PT${remaining}S">${formatTime(remaining)}</time><span>Осталось времени</span></div></section>`;
};

export const renderStageFive = ({ root, questionBank, onStateChange }) => {
  const state = getState();
  const firstIncomplete = FINAL_IDS.find((id) => !state.completedQuestions.includes(id));
  const requested = state.activeQuestionByStage?.[5];
  const activeId = FINAL_IDS.includes(requested) ? requested : (firstIncomplete || FINAL_IDS[0]);
  const question = questionBank.questions.find(({ id }) => id === activeId);
  const completedCount = FINAL_IDS.filter((id) => state.completedQuestions.includes(id)).length;
  const blitzComplete = state.completedQuestions.includes(BLITZ_ID);
  const artifactUnlocked = state.artifacts.includes(ARTIFACT_ID);

  root.innerHTML = `<section class="quest-card stage-five" aria-labelledby="quest-title"><header><p class="stage-kicker">Этап 5</p><h1 id="quest-title" tabindex="-1">Финальный блиц</h1><p class="eyebrow">Подтверждаем полный допуск</p></header><p class="intro">Сформулируйте два итоговых вывода, затем пройдите блиц-тест на время.</p><div class="council-tabs" role="tablist" aria-label="Финальные вопросы">${FINAL_IDS.map((id, index) => { const item = questionBank.questions.find((entry) => entry.id === id); const done = state.completedQuestions.includes(id); return `<button type="button" role="tab" aria-selected="${id === activeId}" class="council-tab ${id === activeId ? 'is-active' : ''} ${done ? 'is-complete' : ''}" data-question="${id}"><span>${done ? '✓' : `0${index + 1}`}</span><strong>${index ? 'Сильные и слабые стороны' : 'Значение и форма записи'}</strong><small>${item.prompt}</small></button>`; }).join('')}</div><section class="council-question" aria-labelledby="council-question"><p>Финальный вопрос ${completedCount + (state.completedQuestions.includes(activeId) ? 0 : 1)} из 2</p><h2 id="council-question">${question.prompt}</h2><form class="answer-form council-form"></form></section>${renderBlitz(state)}<section class="stage-artifact ${artifactUnlocked ? 'is-unlocked' : ''}" aria-live="polite"><span class="stage-artifact__icon" aria-hidden="true">${artifactUnlocked ? artifactImage('time-core-key') : icon('status-locked')}</span><div><p>Финальный артефакт</p><h2>Ключ временного ядра</h2><span>${artifactUnlocked ? 'Полный допуск получен — итоговая карточка открыта' : blitzComplete ? 'Формируется итоговый протокол' : 'Ответьте на вопросы и завершите блиц'}</span></div></section></section>`;
  root.querySelectorAll('.council-tab').forEach((tab) => tab.addEventListener('click', () => { setActiveQuestion(5, tab.dataset.question); onStateChange(); }));

  let ui;
  let disposeQuestion = () => {};
  const form = root.querySelector('.council-form');
  if (question.type === 'rubricText') {
    ui = createRubricQuestion({ container: form, question, onAccepted: () => {
      const next = FINAL_IDS.find((id) => !getState().completedQuestions.includes(id));
      if (next) setActiveQuestion(5, next);
      onStateChange();
    } });
    disposeQuestion = ui.dispose;
  } else {
  const setFormState = (name, message) => { form.dataset.state = name; ui.status.textContent = message; ui.control?.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false'); };
  const showHint = (save = true) => { ui.hint.innerHTML = `<strong>Подсказка:</strong> ${question.hint}`; ui.hint.hidden = false; ui.hintButton.setAttribute('aria-expanded', 'true'); if (save) openHint(activeId); };
  const renderedQuestion = question;
  ui = createQuestionComponent({ container: form, question: renderedQuestion, initialValue: state.answers[activeId] || '', onChange: (value) => { updateAnswer(activeId, value); if (form.dataset.state !== 'success') setFormState('', ''); }, onHint: () => { const opening = ui.hint.hidden; ui.hint.hidden = !opening; ui.hintButton.setAttribute('aria-expanded', String(opening)); if (opening) showHint(); }, onSubmit: (value) => { const result = validateAnswer(question, value); if (!result.valid) { setFormState('error', result.message); return; } updateAnswer(activeId, value); const attempt = registerAttempt(activeId); ui.submit.disabled = true; ui.submit.classList.add('is-loading'); ui.submit.querySelector('.button-label').textContent = 'Проверяем'; window.setTimeout(() => { if (result.correct) { completeQuestion(question); const next = FINAL_IDS.find((id) => !getState().completedQuestions.includes(id)); if (next) setActiveQuestion(5, next); onStateChange(); } else { if (attempt === 1) showHint(); setFormState('error', attempt >= 2 ? `Ответ пока неверный. ${question.errorExplanation}` : 'Выбран неверный вариант. Открыта подсказка.'); ui.submit.disabled = false; ui.submit.classList.remove('is-loading'); ui.submit.querySelector('.button-label').textContent = 'Проверить снова'; } }, 450); } });
  if (state.openedHints.includes(activeId)) showHint(false);
  if (state.completedQuestions.includes(activeId)) { setFormState('success', 'Вывод принят Советом и добавлен в итоговый протокол.'); ui.submit.querySelector('.button-label').textContent = 'Ответ принят'; }
  }

  root.querySelector('.blitz-start')?.addEventListener('click', () => {
    updateAnswer(BLITZ_ID, { index: 0, correct: 0, selections: [] });
    updateTimer('blitz', { startedAt: Date.now(), duration: BLITZ_DURATION, completed: false, remaining: BLITZ_DURATION });
    onStateChange();
  });
  root.querySelectorAll('[data-blitz-answer]').forEach((button) => button.addEventListener('click', () => {
    const latest = getState();
    const progress = latest.answers[BLITZ_ID] || { index: 0, correct: 0, selections: [] };
    const currentQuestion = blitzQuestions[progress.index || 0];
    const selected = button.dataset.blitzAnswer;
    const nextIndex = (progress.index || 0) + 1;
    updateAnswer(BLITZ_ID, {
      index: nextIndex,
      correct: (progress.correct || 0) + Number(selected === currentQuestion.answer),
      selections: [...(progress.selections || []), selected],
    });
    if (nextIndex >= blitzQuestions.length) finishBlitz(onStateChange);
    else onStateChange();
  }));
  const timerNode = root.querySelector('.blitz-clock time');
  const sideTimer = document.querySelector('.timer time');
  const sideLabel = document.querySelector('#timer-label');
  if (sideTimer) sideTimer.textContent = formatTime(timerRemaining(state.timers.blitz));
  if (sideLabel) sideLabel.textContent = blitzComplete ? 'Блиц завершён' : 'До конца блица';
  let interval;
  if (state.timers.blitz?.startedAt && !blitzComplete) {
    const tick = () => { const remaining = timerRemaining(getState().timers.blitz); if (timerNode) { timerNode.textContent = formatTime(remaining); timerNode.setAttribute('datetime', `PT${remaining}S`); } if (sideTimer) sideTimer.textContent = formatTime(remaining); if (sideLabel) sideLabel.textContent = 'До конца блица'; if (remaining <= 0) { window.clearInterval(interval); finishBlitz(onStateChange); } };
    tick(); interval = window.setInterval(tick, 250);
  }
  root.querySelector('#quest-title')?.focus({ preventScroll: true });
  return () => { disposeQuestion(); if (interval) window.clearInterval(interval); };
};

const lostPoints = (state, question) => {
  const attempts = state.attempts[question.id] || 1;
  const practical = question.id === 'practical-01';
  const loss = (attempts === 2 ? (practical ? 2 : 1) : attempts >= 3 ? (practical ? 4 : 2) : 0) + (state.openedHints.includes(question.id) ? (practical ? 2 : 1) : 0);
  return Math.min(practical ? 4 : 2, loss);
};

export const renderFinalResults = ({ root, questionBank, onStateChange }) => {
  const state = getState();
  const allRequired = mandatoryIds.every((id) => state.completedQuestions.includes(id));
  const allArtifacts = state.artifacts.length >= 5;
  const success = allRequired && allArtifacts && state.score >= 60;
  const recovered = state.recoveredQuestions || [];
  const recoverable = questionBank.questions.filter((question) => state.completedQuestions.includes(question.id) && !recovered.includes(question.id) && !['rubricText', 'rubricCase'].includes(question.type) && lostPoints(state, question) > 0);
  const hypothesis = escapeHtml(state.answers['final-01'] || 'Не заполнено');
  const achievementTitles = ACHIEVEMENT_DEFINITIONS.filter(({ id }) => state.achievements.includes(id)).map(({ title }) => title);
  const participantNames = (state.participants || []).map(escapeHtml);
  root.innerHTML = `<section class="quest-card final-results" aria-labelledby="quest-title"><header><p class="stage-kicker">Итоги экспедиции</p><h1 id="quest-title" tabindex="-1">${success ? 'Полный допуск получен' : 'Требуется восстановление'}</h1><p class="eyebrow">Личный архив Хранителя времени</p></header><div class="result-hero ${success ? 'is-success' : ''}"><span>${success ? icon('status-reward') : icon('status-time')}</span><div><strong>${state.score}<small> / 100 баллов</small></strong><p>${success ? 'Все обязательные испытания завершены, пять артефактов собраны.' : 'Маршрут завершён, но для допуска необходимо набрать не менее 60 баллов.'}</p></div></div><section class="reward-summary" aria-labelledby="reward-title"><header><div><p class="stage-kicker">Игровое состояние</p><h2 id="reward-title">Награды экспедиции</h2></div><strong>${state.achievements.length} / ${ACHIEVEMENT_DEFINITIONS.length}</strong></header><div><span>${icon('status-score')} ${state.score} баллов</span><span>${icon('status-complete')} ${Object.values(state.attempts).reduce((sum, count) => sum + count, 0)} попыток</span><span>${icon('status-hint')} ${state.openedHints.length} подсказок</span><span>${icon('navigation-passport')} ${state.artifacts.length} артефактов</span></div><ul>${ACHIEVEMENT_DEFINITIONS.map((achievement) => `<li class="${state.achievements.includes(achievement.id) ? 'is-earned' : ''}">${state.achievements.includes(achievement.id) ? icon('status-reward') : icon('status-locked')}<span><strong>${achievement.title}</strong><small>${achievement.description}</small></span></li>`).join('')}</ul></section><article class="print-card" id="print-card"><header><div><p>НИИ Времени · итоговый документ</p><h2>Патч для ядра</h2></div><strong>Команда «Хранители времени»</strong></header><section><h3>Паспорт числа</h3><div class="print-passport"><span>Египет — 222</span><span>Вавилон — 125</span><span>Рим — DCCLIII</span><span>Древняя Русь — ЦПИ (988)</span></div></section><section><h3>Проверенные переводы</h3><p>753₁₀ = DCCLIII = 1011110001₂</p><p>3600₁₀ = 111000010000₂ · 12 бит · в диапазон 0–255 не помещается.</p></section><section><h3>Гипотеза исследователя</h3><p>${hypothesis}</p></section><section><h3>Финальные выводы</h3><p>${escapeHtml(state.answers['final-02'])}</p><p>${escapeHtml(state.answers['final-03'])}</p></section><section><h3>Достижения</h3><p>${achievementTitles.length ? achievementTitles.join(' · ') : 'Пока не получены'}</p></section><footer><span>Артефакты: ${state.artifacts.length} из 5</span><strong>Итог: ${state.score} / 100</strong></footer></article><div class="result-actions"><button class="primary-button print-button" type="button">${icon('navigation-passport')} Распечатать карточку</button></div>${!success ? `<section class="recovery-mode"><p class="stage-kicker">Режим восстановления</p><h2>Верните потерянные баллы</h2><p>Повторно выполните задания, где использовались подсказки или несколько попыток.</p>${recoverable.length ? `<div class="recovery-list">${recoverable.map((question) => `<button type="button" data-recovery="${question.id}"><strong>${question.prompt}</strong><span>Можно вернуть до ${lostPoints(state, question)} баллов</span></button>`).join('')}</div><form class="answer-form recovery-form" hidden></form>` : '<p>Доступных заданий восстановления нет.</p>'}</section>` : ''}</section>`;
  const printedTeamName = root.querySelector('.print-card > header > strong');
  if (printedTeamName) printedTeamName.textContent = `Команда «${state.teamName || 'Хранители времени'}»`;
  root.querySelector('.print-card > header')?.insertAdjacentHTML('afterend', `<section><h3>Участники команды</h3><p>${participantNames.length ? participantNames.join(' · ') : 'Имена не указаны'}</p></section>`);
  const printButton = root.querySelector('.print-button');
  if (printButton) {
    printButton.innerHTML = `${icon('navigation-passport')} Получить карточку`;
    printButton.addEventListener('click', () => openResultCardModal(root.querySelector('.print-card')));
  }
  root.querySelectorAll('[data-recovery]').forEach((button) => button.addEventListener('click', () => {
    const question = questionBank.questions.find(({ id }) => id === button.dataset.recovery);
    const form = root.querySelector('.recovery-form'); form.hidden = false;
    let ui = createQuestionComponent({ container: form, question, initialValue: '', onChange: () => {}, onHint: () => {}, onSubmit: (value) => { const result = validateAnswer(question, value); if (result.valid && result.correct) { recoverQuestion(question); onStateChange(); } else { form.dataset.state = 'error'; ui.status.textContent = result.valid ? 'Ответ неверный — попробуйте ещё раз.' : result.message; } } });
    ui.hintButton.hidden = true; ui.status.textContent = `Восстановление: ${question.prompt}`; ui.control?.focus();
  }));
  root.querySelector('#quest-title')?.focus({ preventScroll: true });
};
