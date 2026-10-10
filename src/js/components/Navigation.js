import { stages } from '../../data/stages';
import { artifactImage, icon } from './icons';
import { ACHIEVEMENT_DEFINITIONS } from '../state';

export const renderTimeline = ({ container, currentStage, unlockedStage, onNavigate }) => {
  container.innerHTML = stages.map((stage) => {
    const complete = stage.id < unlockedStage;
    const current = stage.id === currentStage;
    const locked = stage.id > unlockedStage;
    return `<li class="${complete ? 'is-complete' : ''} ${current ? 'is-current' : ''} ${locked ? 'is-locked' : ''}">
      <button type="button" data-stage="${stage.id}" ${locked ? 'disabled' : ''} ${current ? 'aria-current="step"' : ''} aria-label="Этап ${stage.id}: ${stage.title}${locked ? '. Недоступен' : ''}">
        <span class="timeline__marker" aria-hidden="true">${complete && !current ? icon('status-complete') : stage.id}</span>
        <span class="timeline__label"><small>Этап ${stage.id}</small><b>${stage.shortTitle}</b></span>
      </button>
    </li>`;
  }).join('');

  container.querySelectorAll('button[data-stage]').forEach((button) => {
    button.addEventListener('click', () => onNavigate(Number(button.dataset.stage)));
  });
};

export const renderStageControls = ({ container, currentStage, unlockedStage, onNavigate }) => {
  const isResults = currentStage === 6;
  const nextStage = currentStage + 1;
  const nextLocked = nextStage > unlockedStage;
  container.innerHTML = `
    <button class="stage-nav-button stage-nav-button--back" type="button" ${currentStage === 1 ? 'disabled' : ''}>${icon('navigation-back')} Назад</button>
    <p class="stage-navigation__status">${isResults ? 'Экспедиция завершена' : `Этап ${currentStage} из 5`}</p>
    <button class="stage-nav-button stage-nav-button--next" type="button" ${isResults || nextLocked ? 'disabled' : ''}>
      ${currentStage === 5 ? 'К итогам' : 'Дальше'} ${icon('navigation-forward')}
    </button>`;
  container.querySelector('.stage-nav-button--back')?.addEventListener('click', () => onNavigate(currentStage - 1));
  container.querySelector('.stage-nav-button--next')?.addEventListener('click', () => onNavigate(nextStage));
};

export const renderProgressPanel = ({ currentStage, unlockedStage }) => {
  const visibleStage = Math.min(currentStage, 5);
  const completed = Math.max(0, Math.min(5, unlockedStage - 1));
  const ring = document.querySelector('.progress-ring');
  const ringValue = ring?.querySelector('strong');
  if (ring && ringValue) {
    ring.style.setProperty('--progress', `${completed * 20}%`);
    ring.setAttribute('aria-label', `Пройдено ${completed} из 5 этапов`);
    ringValue.innerHTML = `${completed} <small>из 5</small>`;
  }

  const list = document.querySelector('.progress-card ol');
  if (!list) return;
  list.innerHTML = stages.map((stage) => {
    const complete = stage.id < unlockedStage;
    const current = stage.id === visibleStage;
    const marker = complete ? icon('status-complete') : current ? icon('status-current') : icon('status-locked');
    return `<li class="${complete ? 'done' : ''} ${current ? 'current' : ''}"><span class="progress-marker">${marker}</span>Этап ${stage.id}. ${stage.shortTitle}</li>`;
  }).join('');
};

export const renderArtifactsPanel = ({ artifacts }) => {
  const definitions = [
    ['researcher-hypothesis', 'scroll-researcher', 'Свиток исследователя'],
    ['number-passport', 'papyrus-number', 'Папирус числа'],
    ['translation-table', 'translation-tablet', 'Табличка переводов'],
    ['compatibility-card', 'compatibility-seal', 'Печать совместимости'],
    ['core-patch', 'time-core-key', 'Ключ временного ядра'],
  ];
  const count = document.querySelector('.artifacts header span');
  const grid = document.querySelector('.artifacts__grid');
  if (!count || !grid) return;
  count.textContent = `${artifacts.length} из ${definitions.length}`;
  grid.innerHTML = definitions.map(([id, artifactName, title]) => {
    const collected = artifacts.includes(id);
    return `<div class="artifact ${collected ? 'collected' : 'locked'}"><span aria-hidden="true">${collected ? artifactImage(artifactName) : icon('status-locked')}</span><p>${collected ? title : '<span class="sr-only">Артефакт </span>Недоступен'}</p></div>`;
  }).join('');
};

export const renderAchievementPanel = ({ achievements = [], attempts = {}, openedHints = [] }) => {
  const panel = document.querySelector('.achievement');
  if (!panel) return;
  const unlocked = ACHIEVEMENT_DEFINITIONS.filter(({ id }) => achievements.includes(id));
  const latest = unlocked.at(-1);
  const next = ACHIEVEMENT_DEFINITIONS.find(({ id }) => !achievements.includes(id));
  const attemptCount = Object.values(attempts).reduce((sum, value) => sum + Number(value || 0), 0);
  panel.innerHTML = `<h2>${latest ? 'Последнее достижение' : 'Достижения'}</h2><div><span class="medal" aria-hidden="true">${latest ? icon('status-reward') : icon('status-locked')}</span><p><strong>${latest?.title || 'Первое достижение впереди'}</strong><small>${latest?.description || next?.description || 'Все достижения получены'}</small><em>${unlocked.length} из ${ACHIEVEMENT_DEFINITIONS.length} · ${attemptCount} попыток · ${openedHints.length} подсказок</em></p><span aria-hidden="true">›</span></div>`;
};

export const renderTimerPanel = ({ timers = {}, completedQuestions = [], currentStage }) => {
  const labels = [...document.querySelectorAll('#timer-label, #header-timer-label')];
  const times = [...document.querySelectorAll('.timer time, .header-timer time')];
  if (!labels.length || !times.length) return;
  const updateClocks = (labelText, timeText, seconds) => {
    labels.forEach((label) => { label.textContent = labelText; });
    times.forEach((time) => {
      time.textContent = timeText;
      time.setAttribute('datetime', `PT${seconds}S`);
    });
  };
  const blitz = timers.blitz;
  const complete = completedQuestions.includes('blitz-01');
  const blitzActive = currentStage === 5 && blitz?.startedAt;
  const remaining = blitzActive
    ? Math.max(0, blitz.completed ? (blitz.remaining ?? 0) : 90 - Math.floor((Date.now() - blitz.startedAt) / 1000))
    : null;
  if (blitzActive) {
    updateClocks(
      complete ? 'Блиц завершён' : 'До конца блица',
      `${String(Math.floor(remaining / 60)).padStart(2, '0')} : ${String(remaining % 60).padStart(2, '0')}`,
      remaining,
    );
    return;
  }
  const elapsed = timers.expedition?.startedAt ? Math.max(0, Math.floor((Date.now() - timers.expedition.startedAt) / 1000)) : 0;
  const expeditionRemaining = Math.max(0, (90 * 60) - elapsed);
  document.querySelectorAll('.timer, .header-timer').forEach((timerCard) => {
    timerCard.classList.toggle('is-warning', expeditionRemaining > 5 * 60 && expeditionRemaining <= 15 * 60);
    timerCard.classList.toggle('is-urgent', expeditionRemaining > 0 && expeditionRemaining <= 5 * 60);
    timerCard.classList.toggle('is-expired', expeditionRemaining === 0);
  });
  const labelText = expeditionRemaining === 0
    ? 'Время экспедиции истекло'
    : expeditionRemaining <= 60
      ? 'Осталась последняя минута'
      : expeditionRemaining <= 5 * 60
        ? 'Осталось меньше 5 минут'
        : expeditionRemaining <= 15 * 60
          ? 'Осталось меньше 15 минут'
          : 'До конца экспедиции';
  updateClocks(
    labelText,
    `${String(Math.floor(expeditionRemaining / 60)).padStart(2, '0')} : ${String(expeditionRemaining % 60).padStart(2, '0')}`,
    expeditionRemaining,
  );
};
