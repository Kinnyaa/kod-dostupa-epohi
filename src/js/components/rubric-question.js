import { createQuestionComponent } from './question';
import { attachRubricFeedback } from './rubric-feedback';
import { getState, updateAnswer, registerAttempt, completeQuestion, openHint } from '../state';

// Only this explicit submit path may change attempts, hints or rewards.
export const submitRubricAnswer = (question, value, result) => {
  const state = getState();
  if (state.completedQuestions.includes(question.id)) return { accepted: true, alreadyCompleted: true };
  const startedAt = state.timers.expedition?.startedAt;
  if (startedAt && Date.now() - startedAt >= 90 * 60 * 1000) return { expired: true };
  if (!result.valid) return { accepted: false };
  updateAnswer(question.id, value);
  const attempt = registerAttempt(question.id);
  if (result.correct) completeQuestion(question);
  else if (attempt === 1) openHint(question.id);
  return { accepted: result.correct, attempt };
};

export const createRubricQuestion = ({ container, question, onAccepted }) => {
  const state = getState();
  const completed = state.completedQuestions.includes(question.id);
  container.classList.add('answer-form', 'rubric-form');
  let ui; let feedback;
  const showHint = () => {
    ui.hint.textContent = `Подсказка: ${question.hint}`;
    ui.hint.hidden = false;
    ui.hintButton.setAttribute('aria-expanded', 'true');
  };
  ui = createQuestionComponent({
    container, question, idPrefix: `rubric-${question.id}`, initialValue: state.answers[question.id] || '',
    onChange: (value) => {
      if (completed) return;
      updateAnswer(question.id, value);
      container.dataset.state = '';
      ui.status.textContent = '';
      ui.control.removeAttribute('aria-invalid');
    },
    onHint: () => {
      if (completed) return;
      if (!ui.hint.hidden) { ui.hint.hidden = true; ui.hintButton.setAttribute('aria-expanded', 'false'); return; }
      openHint(question.id);
      showHint();
    },
    onSubmit: (value) => {
      const result = feedback.check();
      const outcome = submitRubricAnswer(question, value, result);
      if (outcome.alreadyCompleted) return;
      if (outcome.expired) { ui.status.textContent = 'Время экспедиции истекло. Ответы сохранены.'; return; }
      container.dataset.state = outcome.accepted ? 'success' : 'error';
      ui.status.textContent = result.feedback;
      ui.control.setAttribute('aria-invalid', String(!outcome.accepted));
      if (getState().openedHints.includes(question.id)) showHint();
      if (outcome.accepted) {
        ui.submit.disabled = true;
        ui.control.readOnly = true;
        ui.submit.querySelector('.button-label').textContent = 'Ответ принят';
        onAccepted();
      }
    },
  });
  feedback = attachRubricFeedback({ container, control: ui.control, question, completed });
  if (state.openedHints.includes(question.id)) showHint();
  if (completed) {
    container.dataset.state = 'success';
    ui.control.readOnly = true;
    ui.submit.disabled = true;
    ui.hintButton.disabled = true;
    ui.submit.querySelector('.button-label').textContent = 'Ответ принят';
  }
  return { ...ui, dispose: feedback.dispose };
};
