import { createQuestionComponent } from '../components/question';
import { validateAnswer } from '../utils/validators';
import {
  addArtifact,
  completeQuestion,
  getState,
  openHint,
  registerAttempt,
  unlockStage,
  updateAnswer,
} from '../state';
import { artifactImage, icon } from '../components/icons';

const CHOICE_ID = 'rome-02';
const HYPOTHESIS_ID = 'final-01';
const ARTIFACT_ID = 'researcher-hypothesis';

const validateHypothesis = (value) => {
  const text = String(value || '').trim().toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
  if (text.length < 30) return { valid: false, message: 'Сформулируйте развёрнутую гипотезу длиной не менее 30 символов.' };
  const concepts = [
    /(счет|считать|измер)/,
    /(знак|символ|инструмент|материал)/,
    /(удоб|вычисл|расчет|задач)/,
  ].filter((pattern) => pattern.test(text)).length;
  return concepts >= 2
    ? { valid: true, message: '' }
    : { valid: false, message: 'Свяжите гипотезу хотя бы с двумя идеями: задачи счёта или измерения, доступные знаки и удобство вычислений.' };
};

export const renderStageOne = ({ root, questionBank, onStateChange }) => {
  const choiceQuestion = questionBank.questions.find(({ id }) => id === CHOICE_ID);
  const hypothesisQuestion = questionBank.questions.find(({ id }) => id === HYPOTHESIS_ID);
  const state = getState();

  root.innerHTML = `
    <section class="quest-card stage-one" aria-labelledby="quest-title">
      <header><p class="stage-kicker">Этап 1</p><h1 id="quest-title" tabindex="-1">Взлом протокола</h1><p class="eyebrow">Находим ошибку в историческом шифре</p></header>
      <div class="stage-rules" aria-labelledby="rules-title"><h2 id="rules-title">Правила экспедиции</h2><ol><li>Изучайте запись и справочные материалы.</li><li>Проверяйте ответ явно — пустой ответ не считается попыткой.</li><li>Подсказка помогает, но уменьшает награду на один балл.</li></ol></div>
      <section class="protocol-card" aria-labelledby="protocol-title"><div><p class="protocol-card__label">Повреждённая строка протокола</p><h2 id="protocol-title">Число 99 записано как <strong>IC</strong></h2><p>Архив сообщает, что одно из правил римской системы нарушено. Выберите корректную запись.</p></div><div class="protocol-code" aria-label="Ошибочная запись: I C"><span>I</span><span>C</span><i aria-hidden="true">!</i></div></section>
      <section class="stage-task" aria-labelledby="violation-title"><div class="stage-task__heading"><span>01</span><div><h2 id="violation-title">Найдите нарушение</h2><p>${choiceQuestion.prompt}</p></div></div><form class="answer-form stage-one__choice"></form></section>
      <section class="stage-task" aria-labelledby="hypothesis-title"><div class="stage-task__heading"><span>02</span><div><h2 id="hypothesis-title">Гипотеза исследователя</h2><p>${hypothesisQuestion.prompt}</p></div></div><form class="hypothesis-form" novalidate><label for="hypothesis">Ваша гипотеза</label><textarea id="hypothesis" rows="4" placeholder="Например: системы записи различались, потому что…" aria-describedby="hypothesis-help hypothesis-status"></textarea><p id="hypothesis-help">Упомяните задачи людей, доступные знаки или удобство вычислений.</p><button class="primary-button" type="submit"><span class="button-label">Сохранить гипотезу</span>${icon('navigation-forward')}</button><p id="hypothesis-status" class="answer-status" role="status" aria-live="polite"></p></form></section>
      <section class="stage-artifact ${state.artifacts.includes(ARTIFACT_ID) ? 'is-unlocked' : ''}" aria-live="polite"><span class="stage-artifact__icon" aria-hidden="true">${state.artifacts.includes(ARTIFACT_ID) ? artifactImage('scroll-researcher') : icon('status-locked')}</span><div><p>Артефакт этапа</p><h2>Свиток исследователя</h2><span>${state.artifacts.includes(ARTIFACT_ID) ? 'Получен — этап 2 открыт' : 'Выполните оба задания, чтобы сохранить артефакт'}</span></div></section>
    </section>`;

  let choiceUi;
  const choiceForm = root.querySelector('.stage-one__choice');
  const setChoiceState = (name, message) => {
    choiceForm.dataset.state = name;
    choiceUi.status.textContent = message;
    choiceForm.querySelector('input')?.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false');
  };
  const showChoiceHint = () => {
    choiceUi.hint.innerHTML = `<strong>Подсказка:</strong> ${choiceQuestion.hint}`;
    choiceUi.hint.hidden = false;
    choiceUi.hintButton.setAttribute('aria-expanded', 'true');
    openHint(CHOICE_ID);
  };
  choiceUi = createQuestionComponent({
    container: choiceForm,
    question: choiceQuestion,
    initialValue: state.answers[CHOICE_ID] || '',
    onChange: (value) => { updateAnswer(CHOICE_ID, value); if (choiceForm.dataset.state !== 'success') setChoiceState('', ''); },
    onHint: () => { const opening = choiceUi.hint.hidden; choiceUi.hint.hidden = !opening; choiceUi.hintButton.setAttribute('aria-expanded', String(opening)); if (opening) showChoiceHint(); },
    onSubmit: (value) => {
      const result = validateAnswer(choiceQuestion, value);
      if (!result.valid) { setChoiceState('error', result.message); return; }
      updateAnswer(CHOICE_ID, value);
      const attempt = registerAttempt(CHOICE_ID);
      if (result.correct) {
        completeQuestion(choiceQuestion);
        setChoiceState('success', `Верно! ${choiceQuestion.errorExplanation}`);
        choiceUi.submit.querySelector('.button-label').textContent = 'Нарушение найдено';
        finishStageIfReady();
      } else {
        if (attempt === 1) showChoiceHint();
        setChoiceState('error', attempt >= 2 ? choiceQuestion.errorExplanation : 'Ответ неверный. Открыта подсказка.');
      }
    },
  });
  if (state.openedHints.includes(CHOICE_ID)) showChoiceHint();
  if (state.completedQuestions.includes(CHOICE_ID)) {
    setChoiceState('success', 'Нарушение найдено, ответ сохранён.');
    choiceUi.submit.querySelector('.button-label').textContent = 'Нарушение найдено';
  }

  const hypothesisForm = root.querySelector('.hypothesis-form');
  const hypothesis = root.querySelector('#hypothesis');
  const hypothesisStatus = root.querySelector('#hypothesis-status');
  const hypothesisButton = hypothesisForm.querySelector('button');
  hypothesis.value = state.answers[HYPOTHESIS_ID] || '';
  hypothesis.addEventListener('input', () => { updateAnswer(HYPOTHESIS_ID, hypothesis.value); hypothesisStatus.textContent = ''; hypothesis.removeAttribute('aria-invalid'); });
  hypothesisForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = validateHypothesis(hypothesis.value);
    if (!result.valid) { hypothesis.setAttribute('aria-invalid', 'true'); hypothesisStatus.textContent = result.message; hypothesis.focus(); return; }
    updateAnswer(HYPOTHESIS_ID, hypothesis.value);
    registerAttempt(HYPOTHESIS_ID);
    completeQuestion(hypothesisQuestion);
    hypothesisStatus.textContent = 'Гипотеза принята и сохранена в архиве.';
    hypothesisButton.querySelector('.button-label').textContent = 'Гипотеза сохранена';
    finishStageIfReady();
  });
  if (state.completedQuestions.includes(HYPOTHESIS_ID)) {
    hypothesisStatus.textContent = 'Гипотеза принята и сохранена в архиве.';
    hypothesisButton.querySelector('.button-label').textContent = 'Гипотеза сохранена';
  }

  function finishStageIfReady() {
    const latest = getState();
    if ([CHOICE_ID, HYPOTHESIS_ID].every((id) => latest.completedQuestions.includes(id))) {
      addArtifact(ARTIFACT_ID);
      unlockStage(2);
      onStateChange();
    } else {
      onStateChange({ preserveScreen: true });
    }
  }

  root.querySelector('#quest-title')?.focus({ preventScroll: true });
};
