import egyptImage from '../../img/egypt.png';
import babylonImage from '../../img/babylon.png';
import romeImage from '../../img/rome.png';
import rusImage from '../../img/ancient-rus.png';
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

const ARTIFACT_ID = 'number-passport';
const civilizations = [
  { id: 'egypt-01', key: 'egypt', name: 'Египет', period: 'ок. 3000–30 гг. до н. э.', image: egyptImage, mark: '𓍢𓍢 𓎆𓎆 𓏺𓏺', system: 'Десятичная непозиционная', alphabet: 'Рисуночные знаки степеней десяти', example: '222', reason: 'Учёт урожая, налогов и строительства' },
  { id: 'babylon-01', key: 'babylon', name: 'Вавилон', period: 'ок. 1800–500 гг. до н. э.', image: babylonImage, mark: '2,5₆₀', system: 'Позиционная, основание 60', alphabet: 'Два клинописных знака', example: '125', reason: 'Астрономия, время и торговые расчёты' },
  { id: 'rome-01', key: 'rome', name: 'Рим', period: '753 г. до н. э. — 476 г.', image: romeImage, mark: 'DCCLIII', pendingMark: '753', system: 'Буквенная непозиционная', alphabet: 'I, V, X, L, C, D, M', example: '753', reason: 'Учёт, памятные надписи и торговля' },
  { id: 'rus-01', key: 'rus', name: 'Древняя Русь', period: 'IX–XVII века', image: rusImage, mark: 'ЦПИ', system: 'Алфавитная непозиционная', alphabet: 'Кириллические буквы под титлом', example: '988', reason: 'Летописи, даты и церковные книги' },
];

export const renderStageTwo = ({ root, questionBank, onStateChange }) => {
  const state = getState();
  const requiredIds = civilizations.map(({ id }) => id);
  const firstIncomplete = requiredIds.find((id) => !state.completedQuestions.includes(id));
  const requested = state.activeQuestionByStage?.[2];
  const activeId = requiredIds.includes(requested) ? requested : (firstIncomplete || requiredIds[0]);
  const activeCivilization = civilizations.find(({ id }) => id === activeId);
  const question = questionBank.questions.find(({ id }) => id === activeId);
  const completedCount = requiredIds.filter((id) => state.completedQuestions.includes(id)).length;
  const artifactUnlocked = state.artifacts.includes(ARTIFACT_ID);

  root.innerHTML = `
    <section class="quest-card stage-two" aria-labelledby="quest-title">
      <header><p class="stage-kicker">Этап 2</p><h1 id="quest-title" tabindex="-1">Архив НИИ Времени</h1><p class="eyebrow">Сравниваем системы чисел</p></header>
      <p class="intro">Откройте четыре архивные карточки, выполните обязательные задания и соберите «Паспорт числа».</p>
      <div class="civilization-tabs" role="tablist" aria-label="Цивилизации">${civilizations.map((civilization) => {
        const complete = state.completedQuestions.includes(civilization.id);
        const active = civilization.id === activeId;
        return `<button class="civilization-tab ${active ? 'is-active' : ''} ${complete ? 'is-complete' : ''}" type="button" role="tab" aria-selected="${active}" data-question="${civilization.id}"><img src="${civilization.image}" alt="" aria-hidden="true"><span class="civilization-tab__status" aria-hidden="true">${complete ? '✓' : civilization.pendingMark || civilization.mark}</span><strong>${civilization.name}</strong><small>${civilization.period}</small></button>`;
      }).join('')}</div>
      <section class="archive-question" aria-labelledby="archive-question-title"><div class="archive-question__visual" style="--archive-image:url('${activeCivilization.image}')"><span>${state.completedQuestions.includes(activeId) ? activeCivilization.mark : activeCivilization.pendingMark || activeCivilization.mark}</span><small>${activeCivilization.system}</small></div><div class="archive-question__body"><p class="archive-question__counter">Задание ${completedCount + (state.completedQuestions.includes(activeId) ? 0 : 1)} из 4</p><h2 id="archive-question-title">${question.prompt}</h2><form class="answer-form stage-two__form"></form></div></section>
      <section class="number-passport" aria-labelledby="passport-title"><header><div><p class="stage-kicker">Артефакт заполняется автоматически</p><h2 id="passport-title">Паспорт числа</h2></div><strong>${completedCount} / 4</strong></header><div class="passport-table" role="table" aria-label="Паспорт числа"><div class="passport-row passport-row--header" role="row"><span>Цивилизация</span><span>Система и алфавит</span><span>Число</span><span>Историческая задача</span></div>${civilizations.map((civilization) => {
        const complete = state.completedQuestions.includes(civilization.id);
        return `<div class="passport-row ${complete ? 'is-filled' : 'is-locked'}" role="row"><strong>${civilization.name}</strong><span>${complete ? `${civilization.system}<small>${civilization.alphabet}</small>` : 'Закрыто'}</span><b>${complete ? civilization.example : '—'}</b><span>${complete ? civilization.reason : 'Выполните задание цивилизации'}</span></div>`;
      }).join('')}</div></section>
      <section class="stage-artifact ${artifactUnlocked ? 'is-unlocked' : ''}" aria-live="polite"><span class="stage-artifact__icon" aria-hidden="true">${artifactUnlocked ? artifactImage('papyrus-number') : icon('status-locked')}</span><div><p>Артефакт этапа</p><h2>Папирус числа</h2><span>${artifactUnlocked ? 'Заполнен — этап 3 открыт' : `Заполнено разделов: ${completedCount} из 4`}</span></div></section>
    </section>`;

  root.querySelectorAll('.civilization-tab').forEach((tab) => {
    tab.addEventListener('click', () => { setActiveQuestion(2, tab.dataset.question); onStateChange(); });
  });

  let ui;
  const form = root.querySelector('.stage-two__form');
  const target = () => question.type === 'singleChoice' ? form.querySelector('input[name="answer"]') : ui.control;
  const setState = (name, message) => { form.dataset.state = name; ui.status.textContent = message; target()?.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false'); };
  const showHint = (save = true) => { ui.hint.innerHTML = `<strong>Подсказка:</strong> ${question.hint}`; ui.hint.hidden = false; ui.hintButton.setAttribute('aria-expanded', 'true'); if (save) openHint(activeId); };

  ui = createQuestionComponent({
    container: form,
    question,
    initialValue: state.answers[activeId] || '',
    onChange: (value) => { updateAnswer(activeId, value); if (form.dataset.state !== 'success') setState('', ''); },
    onHint: () => { const opening = ui.hint.hidden; ui.hint.hidden = !opening; ui.hintButton.setAttribute('aria-expanded', String(opening)); if (opening) { showHint(); ui.hint.focus({ preventScroll: true }); } },
    onSubmit: (value) => {
      const result = validateAnswer(question, value);
      if (!result.valid) { setState('error', `Ошибка формата: ${result.message}`); target()?.focus(); return; }
      updateAnswer(activeId, value);
      const attempt = registerAttempt(activeId);
      const label = ui.submit.querySelector('.button-label');
      ui.submit.disabled = true; ui.submit.classList.add('is-loading'); label.textContent = 'Проверяем'; ui.status.textContent = 'Проверяем ответ…';
      window.setTimeout(() => {
        if (result.correct) {
          completeQuestion(question);
          const latest = getState();
          const allComplete = requiredIds.every((id) => latest.completedQuestions.includes(id));
          if (allComplete) { addArtifact(ARTIFACT_ID); unlockStage(3); }
          else {
            const next = requiredIds.find((id) => !latest.completedQuestions.includes(id));
            if (next) setActiveQuestion(2, next);
          }
          onStateChange();
        } else {
          if (attempt === 1) showHint();
          setState('error', attempt >= 2 ? `Ответ неверный. ${question.errorExplanation}` : 'Ответ неверный. Открыта подсказка — попробуйте снова.');
          label.textContent = 'Проверить снова'; ui.submit.disabled = false; ui.submit.classList.remove('is-loading'); target()?.focus();
        }
      }, 450);
    },
  });
  if (state.openedHints.includes(activeId)) showHint(false);
  if (state.completedQuestions.includes(activeId)) { setState('success', `Выполнено. ${question.errorExplanation}`); ui.submit.querySelector('.button-label').textContent = 'Ответ принят'; }
  root.querySelector('#quest-title')?.focus({ preventScroll: true });
};
