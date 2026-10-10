import { ACHIEVEMENT_DEFINITIONS } from '../state';
import { artifactImage, icon } from '../components/icons';
import { createQuestionComponent } from '../components/question';
import { validateAnswer } from '../utils/validators';
import { recoverQuestion } from '../state';
import { openResultCardModal } from '../components/result-card-modal';

const artifacts = [
  ['researcher-hypothesis', 'scroll-researcher', 'Свиток исследователя'],
  ['number-passport', 'papyrus-number', 'Папирус числа'],
  ['translation-table', 'translation-tablet', 'Табличка переводов'],
  ['compatibility-card', 'compatibility-seal', 'Печать совместимости'],
  ['core-patch', 'time-core-key', 'Ключ временного ядра'],
];

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const pointsLost = (state, question) => {
  const attempts = state.attempts[question.id] || 0;
  const practical = question.id === 'practical-01';
  const attemptLoss = attempts === 2 ? (practical ? 2 : 1) : attempts >= 3 ? (practical ? 4 : 2) : 0;
  const hintLoss = state.openedHints.includes(question.id) ? (practical ? 2 : 1) : 0;
  return Math.min(practical ? 4 : 2, attemptLoss + hintLoss);
};

export const renderResultsPage = ({ root, state, questionBank, onContinue, onStateChange }) => {
  const attempts = Object.values(state.attempts).reduce((sum, value) => sum + Number(value || 0), 0);
  const completedStages = Math.min(5, Math.max(state.artifacts.length, state.unlockedStage - 1));
  const finished = state.artifacts.length >= 5;
  const passed = finished && state.score >= 60;
  const status = passed ? 'Полный допуск получен' : finished ? 'Требуется восстановление' : 'Экспедиция продолжается';
  const recoverable = questionBank.questions.filter((question) => state.completedQuestions.includes(question.id)
    && !state.recoveredQuestions.includes(question.id)
    && !['rubricText', 'rubricCase'].includes(question.type)
    && pointsLost(state, question) > 0);

  root.innerHTML = `<section class="quest-card results-page" aria-labelledby="results-title">
    <header class="results-page__header"><div><p class="stage-kicker">Личный архив</p><h1 id="results-title" tabindex="-1">Результаты команды</h1><p class="eyebrow">${escapeHtml(state.teamName || 'Хранители времени')}</p></div><div class="results-page__status ${passed ? 'is-success' : ''}">${passed ? icon('status-reward') : icon(finished ? 'status-hint' : 'status-time')}<span><small>Текущий статус</small><strong>${status}</strong></span></div></header>

    <div class="result-metrics"><article><span>${icon('status-score')}</span><strong>${state.score}<small> / 100</small></strong><p>баллов</p></article><article><span>${icon('status-complete')}</span><strong>${completedStages}<small> / 5</small></strong><p>этапов</p></article><article><span>${icon('navigation-forward')}</span><strong>${attempts}</strong><p>попыток</p></article><article><span>${icon('status-hint')}</span><strong>${state.openedHints.length}</strong><p>подсказок</p></article></div>

    <section class="results-block"><header><div><p class="stage-kicker">Коллекция</p><h2>Артефакты</h2></div><strong>${state.artifacts.length} / 5</strong></header><div class="results-artifacts">${artifacts.map(([id, image, title]) => { const ready = state.artifacts.includes(id); return `<article class="${ready ? 'is-earned' : 'is-locked'}">${ready ? artifactImage(image) : icon('status-locked')}<span><strong>${ready ? title : 'Артефакт закрыт'}</strong><small>${ready ? 'Получен' : 'Продолжайте экспедицию'}</small></span></article>`; }).join('')}</div></section>

    <section class="results-block"><header><div><p class="stage-kicker">Награды</p><h2>Достижения</h2></div><strong>${state.achievements.length} / ${ACHIEVEMENT_DEFINITIONS.length}</strong></header><div class="results-achievements">${ACHIEVEMENT_DEFINITIONS.map((achievement) => { const earned = state.achievements.includes(achievement.id); return `<article class="${earned ? 'is-earned' : 'is-locked'}">${icon(earned ? 'status-reward' : 'status-locked')}<span><strong>${achievement.title}</strong><small>${achievement.description}</small></span></article>`; }).join('')}</div></section>

    <section class="results-block recovery-overview"><header><div><p class="stage-kicker">Повторная попытка</p><h2>Восстановление баллов</h2></div><strong>${recoverable.length}</strong></header>${recoverable.length ? `<p>Выберите задание, исправьте ответ и восстановите потерянные баллы.</p><div>${recoverable.map((question) => `<button type="button" data-recover-id="${question.id}"><span><strong>${question.prompt}</strong><small>Можно вернуть баллов: ${pointsLost(state, question)}</small></span>${icon('navigation-forward')}</button>`).join('')}</div><form class="answer-form results-recovery-form" hidden></form>` : `<div class="results-empty">${icon('status-complete')}<span><strong>Заданий для восстановления нет</strong><small>${finished ? 'Все доступные баллы уже учтены.' : 'Они появятся здесь после прохождения заданий с подсказками или повторными попытками.'}</small></span></div>`}</section>

    <article class="print-card results-print-card"><header><div><p>НИИ Времени · отчёт экспедиции</p><h2>Карточка команды</h2></div><strong>«${escapeHtml(state.teamName || 'Хранители времени')}»</strong></header><section><h3>Итоговый статус</h3><p>${status}</p></section><section><h3>Результаты</h3><p>Баллы: ${state.score} из 100 · Этапы: ${completedStages} из 5 · Попытки: ${attempts} · Подсказки: ${state.openedHints.length}</p></section><section><h3>Артефакты</h3><p>${artifacts.filter(([id]) => state.artifacts.includes(id)).map(([, , title]) => title).join(' · ') || 'Пока не собраны'}</p></section><section><h3>Достижения</h3><p>${ACHIEVEMENT_DEFINITIONS.filter(({ id }) => state.achievements.includes(id)).map(({ title }) => title).join(' · ') || 'Пока не открыты'}</p></section><footer><span>Этапов пройдено: ${completedStages} из 5</span><strong>${state.score} / 100</strong></footer></article>

    <div class="results-page__actions"><button class="stage-nav-button results-continue" type="button">${icon('navigation-back')} Продолжить игру</button><button class="primary-button results-print" type="button">${icon('navigation-passport')} Получить карточку</button></div>
  </section>`;

  root.querySelector('.results-continue')?.addEventListener('click', onContinue);
  root.querySelector('.results-print')?.addEventListener('click', () => openResultCardModal(root.querySelector('.results-print-card')));
  root.querySelectorAll('[data-recover-id]').forEach((button) => button.addEventListener('click', () => {
    const question = questionBank.questions.find(({ id }) => id === button.dataset.recoverId);
    const form = root.querySelector('.results-recovery-form');
    form.hidden = false;
    let ui;
    ui = createQuestionComponent({
      container: form,
      question,
      initialValue: '',
      onChange: () => {},
      onHint: () => {},
      onSubmit: (value) => {
        const result = validateAnswer(question, value);
        if (result.valid && result.correct) {
          recoverQuestion(question);
          onStateChange();
          return;
        }
        form.dataset.state = 'error';
        ui.status.textContent = result.valid ? 'Ответ неверный — попробуйте ещё раз.' : result.message;
      },
    });
    ui.hintButton.hidden = true;
    ui.status.textContent = `Восстановление: ${question.prompt}`;
    ui.control?.focus();
  }));
  root.querySelector('#results-title')?.focus({ preventScroll: true });
};
