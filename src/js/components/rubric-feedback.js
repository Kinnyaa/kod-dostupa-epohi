import { validateRubric } from '../utils/rubric-validator';

export const attachRubricFeedback = ({ container, control, question, completed = false }) => {
  const panel = document.createElement('section');
  panel.className = 'rubric-feedback';
  panel.setAttribute('aria-label', 'Полнота объяснения');
  panel.setAttribute('aria-live', 'polite');
  panel.setAttribute('aria-atomic', 'true');
  container.insertBefore(panel, container.querySelector('button'));
  let timeout;
  let disposed = false;
  let previousText = '';
  const render = (result) => {
    if (disposed) return;
    const title = document.createElement('strong');
    title.textContent = completed ? 'Ответ уже принят и сохранён' : `Раскрыто ${result.score} из ${result.maxScore} критериев`;
    const note = document.createElement('p');
    note.textContent = completed ? 'Прогресс сохранён. Повторная проверка не требуется.'
      : result.correct ? 'Объяснение готово к проверке. Отправьте ответ кнопкой ниже.' : result.feedback;
    const list = document.createElement('ul');
    if (!completed) question.rubric.criteria.forEach((criterion) => {
      const state = result.contradictions.some(({ criteria }) => criteria.includes(criterion.id)) ? 'error'
        : result.matchedCriteria.includes(criterion.id) ? 'complete'
          : result.partialCriteria.includes(criterion.id) ? 'partial' : 'neutral';
      const names = { error: 'Проверьте утверждение', complete: 'Раскрыто', partial: 'Нужно уточнить', neutral: 'Пока не раскрыто' };
      const marks = { error: '!', complete: '✓', partial: '◐', neutral: '○' };
      const item = document.createElement('li');
      item.className = `rubric-feedback__criterion is-${state}`;
      const mark = document.createElement('span');
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = marks[state];
      const description = document.createElement('span');
      description.textContent = `${criterion.title} — ${names[state]}`;
      item.append(mark, description);
      list.append(item);
    });
    if (!completed) result.contradictions.filter(({ criteria }) => !criteria.length).forEach(({ message }) => {
      const item = document.createElement('li');
      item.className = 'rubric-feedback__criterion is-error';
      const mark = document.createElement('span');
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = '!';
      const description = document.createElement('span');
      description.textContent = message;
      item.append(mark, description);
      list.append(item);
    });
    const signature = title.textContent + list.textContent + note.textContent;
    // Do not re-announce unchanged feedback after every edit.
    if (signature === previousText) return;
    previousText = signature;
    panel.replaceChildren(title, list, note);
  };
  const check = () => {
    clearTimeout(timeout);
    const result = validateRubric(question, control.value);
    render(result);
    return result;
  };
  const schedule = () => {
    clearTimeout(timeout);
    if (!completed && !control.disabled) timeout = setTimeout(check, 400);
  };
  const onInput = (event) => { if (!event.isComposing) schedule(); };
  control.addEventListener('input', onInput);
  const onCompositionStart = () => clearTimeout(timeout);
  control.addEventListener('compositionstart', onCompositionStart);
  control.addEventListener('compositionend', schedule);
  check();
  return { check, dispose: () => { disposed = true; clearTimeout(timeout); control.removeEventListener('input', onInput); control.removeEventListener('compositionstart', onCompositionStart); control.removeEventListener('compositionend', schedule); } };
};
