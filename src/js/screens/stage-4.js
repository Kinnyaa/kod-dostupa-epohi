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

const ARTIFACT_ID = 'compatibility-card';
const TASK_IDS = ['cross-04', 'practical-01'];
const PROCESSOR_ANSWER = 'Intel 4004 — 4-битный процессор; разрядность процессора не означает размер байта.';

const renderBitDiagram = (ready) => `<section class="bit-lab" aria-labelledby="bit-lab-title"><header><p class="stage-kicker">Двоичные разряды</p><h2 id="bit-lab-title">Число 3600 в памяти</h2></header><div class="bit-register ${ready ? 'is-verified' : ''}" aria-label="${ready ? 'Двоичная запись 111000010000, 12 бит' : 'Двоичная запись пока не проверена'}">${(ready ? '111000010000' : '????????????').split('').map((digit, index) => `<span><b>${digit}</b><small>${11 - index}</small></span>`).join('')}</div><p>${ready ? 'Старший занятый разряд имеет индекс 11, поэтому нужны 12 бит без ведущих нулей.' : 'Соберите карточку совместимости, чтобы открыть двоичную запись и номера разрядов.'}</p></section>`;

const renderRange = (ready) => `<section class="range-check" aria-labelledby="range-title"><div><p class="stage-kicker">Диапазон 8 бит</p><h2 id="range-title">0–255</h2><p>8 бит дают 2⁸ = 256 беззнаковых значений.</p></div><div class="range-check__scale"><span>0</span><span>255</span><i style="--overflow:${ready ? '100%' : '0%'}"></i><strong>3600</strong></div><div class="range-check__result ${ready ? 'is-error' : ''}">${ready ? `${icon('status-locked')} Не помещается` : 'Ожидает проверки'}</div></section>`;

const renderCompatibilityCard = (state) => {
  const rangeReady = state.completedQuestions.includes('cross-04');
  const practicalReady = state.completedQuestions.includes('practical-01');
  const status = (ready) => ready ? `${icon('status-complete')} Проверено` : `${icon('status-locked')} Не проверено`;
  return `<section class="compatibility-card ${practicalReady ? 'is-compatible' : ''}" aria-labelledby="compatibility-title"><header><div><p class="stage-kicker">Практический кейс</p><h2 id="compatibility-title">Карточка совместимости № 3600</h2></div><strong>${practicalReady ? 'ГОТОВО' : 'ЧЕРНОВИК'}</strong></header><div class="compatibility-grid"><div><span>Двоичная запись</span><b>${practicalReady ? '111000010000₂' : '—'}</b><small>${status(practicalReady)}</small></div><div><span>Минимальная ёмкость</span><b>${practicalReady ? '12 бит' : '—'}</b><small>${status(practicalReady)}</small></div><div><span>Диапазон 8 бит</span><b>${rangeReady ? '0–255' : '—'}</b><small>${status(rangeReady)}</small></div><div><span>Результат</span><b>${practicalReady && rangeReady ? 'Не помещается' : '—'}</b><small>${status(practicalReady && rangeReady)}</small></div></div>${practicalReady ? '<p class="compatibility-note">Intel 4004 — 4-битный процессор. Разрядность процессора нельзя называть «4-битным байтом».</p>' : ''}</section>`;
};

const renderPracticalForm = (container, state, question, onStateChange) => {
  const saved = typeof state.answers[question.id] === 'object' ? state.answers[question.id] : {};
  container.innerHTML = `<div class="practical-fields"><label>Двоичная запись 3600<input name="binary" inputmode="numeric" autocomplete="off" placeholder="Например: 1010" value="${saved.binary || ''}"></label><label>Минимальное число бит<input name="bits" inputmode="numeric" autocomplete="off" placeholder="Введите число" value="${saved.bits || ''}"></label></div><fieldset class="choice-list"><legend>Выберите корректный вывод об Intel 4004</legend>${[
    PROCESSOR_ANSWER,
    'Intel 4004 использовал 4-битный байт, поэтому число 3600 хранить невозможно.',
    'Разрядность Intel 4004 означает, что любой двоичный код должен состоять ровно из четырёх бит.',
  ].map((option) => `<label class="choice-option"><input type="radio" name="processor" value="${option}" ${saved.processor === option ? 'checked' : ''}><span>${option}</span></label>`).join('')}</fieldset><button class="primary-button" type="submit"><span class="button-label">Проверить карточку</span>${icon('navigation-forward')}</button><button class="hint-button" type="button" aria-expanded="false" aria-controls="practical-hint">${icon('status-hint')} Нужна подсказка?${icon('navigation-forward', 'hint-toggle')}</button><p class="answer-status" role="status" aria-live="polite"></p><div class="hint" id="practical-hint" tabindex="-1" hidden></div>`;
  const status = container.querySelector('.answer-status');
  const hint = container.querySelector('.hint');
  const hintButton = container.querySelector('.hint-button');
  const submit = container.querySelector('.primary-button');
  const getValue = () => ({ binary: container.elements.binary.value, bits: container.elements.bits.value, processor: container.elements.processor.value || '' });
  const save = () => updateAnswer(question.id, getValue());
  container.querySelectorAll('input').forEach((input) => input.addEventListener('change', save));
  const showHint = (persist = true) => { hint.innerHTML = `<strong>Подсказка:</strong> ${question.hint}`; hint.hidden = false; hintButton.setAttribute('aria-expanded', 'true'); if (persist) openHint(question.id); };
  hintButton.addEventListener('click', () => { const opening = hint.hidden; hint.hidden = !opening; hintButton.setAttribute('aria-expanded', String(opening)); if (opening) { showHint(); hint.focus({ preventScroll: true }); } });
  container.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = getValue(); save();
    if (!value.binary.trim() || !value.bits.trim() || !value.processor) { container.dataset.state = 'error'; status.textContent = 'Заполните все три поля карточки.'; return; }
    const correct = value.binary.replace(/[\s_]/g, '').replace(/₂$/u, '') === '111000010000' && value.bits.trim() === '12' && value.processor === PROCESSOR_ANSWER;
    const attempt = registerAttempt(question.id);
    submit.disabled = true; submit.classList.add('is-loading'); submit.querySelector('.button-label').textContent = 'Проверяем'; status.textContent = 'Проверяем совместимость…';
    window.setTimeout(() => {
      if (correct) { completeQuestion(question); addArtifact(ARTIFACT_ID); unlockStage(5); onStateChange(); }
      else { if (attempt === 1) showHint(); container.dataset.state = 'error'; status.textContent = attempt >= 2 ? `Карточка содержит ошибку. ${question.errorExplanation}` : 'Карточка содержит ошибку. Открыта подсказка — проверьте разряды и вывод.'; submit.disabled = false; submit.classList.remove('is-loading'); submit.querySelector('.button-label').textContent = 'Проверить снова'; }
    }, 450);
  });
  if (state.openedHints.includes(question.id)) showHint(false);
  if (state.completedQuestions.includes(question.id)) { container.dataset.state = 'success'; status.textContent = `Карточка проверена. ${question.errorExplanation}`; submit.querySelector('.button-label').textContent = 'Карточка принята'; }
};

export const renderStageFour = ({ root, questionBank, onStateChange }) => {
  const state = getState();
  const firstIncomplete = TASK_IDS.find((id) => !state.completedQuestions.includes(id));
  const requested = state.activeQuestionByStage?.[4];
  const activeId = TASK_IDS.includes(requested) ? requested : (firstIncomplete || TASK_IDS[0]);
  const question = questionBank.questions.find(({ id }) => id === activeId);
  const completedCount = TASK_IDS.filter((id) => state.completedQuestions.includes(id)).length;
  const practicalReady = state.completedQuestions.includes('practical-01');
  const rangeReady = state.completedQuestions.includes('cross-04');
  const artifactUnlocked = state.artifacts.includes(ARTIFACT_ID);

  root.innerHTML = `<section class="quest-card stage-four" aria-labelledby="quest-title"><header><p class="stage-kicker">Этап 4</p><h1 id="quest-title" tabindex="-1">Сборка ядра</h1><p class="eyebrow">Проверяем совместимость чисел</p></header><p class="intro">Архив хранит число 3600. Определите его двоичную ёмкость и проверьте совместимость с беззнаковым диапазоном 8 бит.</p><div class="core-tabs" role="tablist" aria-label="Проверки совместимости"><button type="button" role="tab" aria-selected="${activeId === 'cross-04'}" class="core-tab ${activeId === 'cross-04' ? 'is-active' : ''} ${rangeReady ? 'is-complete' : ''}" data-question="cross-04"><span>${rangeReady ? '✓' : '01'}</span><strong>Диапазон 8 бит</strong><small>Проверить границы 0–255</small></button><button type="button" role="tab" aria-selected="${activeId === 'practical-01'}" class="core-tab ${activeId === 'practical-01' ? 'is-active' : ''} ${practicalReady ? 'is-complete' : ''}" data-question="practical-01"><span>${practicalReady ? '✓' : '02'}</span><strong>Практический кейс</strong><small>Собрать карточку числа 3600</small></button></div><section class="core-task" aria-labelledby="core-question"><p>Проверка ${completedCount + (state.completedQuestions.includes(activeId) ? 0 : 1)} из 2</p><h2 id="core-question">${question.prompt}</h2><form class="answer-form stage-four__form"></form></section>${renderBitDiagram(practicalReady)}${renderRange(rangeReady)}${renderCompatibilityCard(state)}<section class="stage-artifact ${artifactUnlocked ? 'is-unlocked' : ''}" aria-live="polite"><span class="stage-artifact__icon" aria-hidden="true">${artifactUnlocked ? artifactImage('compatibility-seal') : icon('status-locked')}</span><div><p>Артефакт этапа</p><h2>Печать совместимости</h2><span>${artifactUnlocked ? 'Карточка заверена — этап 5 открыт' : `Выполнено проверок: ${completedCount} из 2`}</span></div></section></section>`;
  root.querySelectorAll('.core-tab').forEach((tab) => tab.addEventListener('click', () => { setActiveQuestion(4, tab.dataset.question); onStateChange(); }));
  const form = root.querySelector('.stage-four__form');
  if (activeId === 'practical-01') renderPracticalForm(form, state, question, onStateChange);
  else {
    let ui;
    const target = () => form.querySelector('input[name="answer"]');
    const setFormState = (name, message) => { form.dataset.state = name; ui.status.textContent = message; target()?.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false'); };
    const showHint = (save = true) => { ui.hint.innerHTML = `<strong>Подсказка:</strong> ${question.hint}`; ui.hint.hidden = false; ui.hintButton.setAttribute('aria-expanded', 'true'); if (save) openHint(activeId); };
    ui = createQuestionComponent({ container: form, question, initialValue: state.answers[activeId] || '', onChange: (value) => { updateAnswer(activeId, value); if (form.dataset.state !== 'success') setFormState('', ''); }, onHint: () => { const opening = ui.hint.hidden; ui.hint.hidden = !opening; ui.hintButton.setAttribute('aria-expanded', String(opening)); if (opening) showHint(); }, onSubmit: (value) => { const result = validateAnswer(question, value); if (!result.valid) { setFormState('error', `Ошибка формата: ${result.message}`); return; } updateAnswer(activeId, value); const attempt = registerAttempt(activeId); ui.submit.disabled = true; ui.submit.classList.add('is-loading'); ui.submit.querySelector('.button-label').textContent = 'Проверяем'; window.setTimeout(() => { if (result.correct) { completeQuestion(question); setActiveQuestion(4, 'practical-01'); onStateChange(); } else { if (attempt === 1) showHint(); setFormState('error', attempt >= 2 ? `Ответ неверный. ${question.errorExplanation}` : 'Ответ неверный. Открыта подсказка — попробуйте снова.'); ui.submit.disabled = false; ui.submit.classList.remove('is-loading'); ui.submit.querySelector('.button-label').textContent = 'Проверить снова'; } }, 450); } });
    if (state.openedHints.includes(activeId)) showHint(false);
    if (state.completedQuestions.includes(activeId)) { setFormState('success', `Проверено. ${question.errorExplanation}`); ui.submit.querySelector('.button-label').textContent = 'Ответ принят'; }
  }
  root.querySelector('#quest-title')?.focus({ preventScroll: true });
};
