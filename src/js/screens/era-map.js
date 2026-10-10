import { stages } from '../../data/stages';
import { artifactImage, icon } from '../components/icons';

const artifacts = {
  1: ['researcher-hypothesis', 'scroll-researcher'],
  2: ['number-passport', 'papyrus-number'],
  3: ['translation-table', 'translation-tablet'],
  4: ['compatibility-card', 'compatibility-seal'],
  5: ['core-patch', 'time-core-key'],
};

export const renderEraMap = ({ root, state, onNavigate }) => {
  const completed = Math.min(5, Math.max(0, state.unlockedStage - 1));
  root.innerHTML = `
    <section class="quest-card era-map" aria-labelledby="era-map-title">
      <header class="era-map__header">
        <div><p class="stage-kicker">Маршрут экспедиции</p><h1 id="era-map-title" tabindex="-1">Карта эпох</h1><p class="eyebrow">Пять испытаний временного архива</p></div>
        <div class="era-map__summary" aria-label="Пройдено ${completed} из 5 этапов"><strong>${completed} / 5</strong><span>этапов пройдено</span></div>
      </header>
      <div class="era-map__route">
        ${stages.map((stage) => {
    const locked = stage.id > state.unlockedStage;
    const complete = stage.id < state.unlockedStage;
    const current = stage.id === state.currentStage && !complete;
    const [artifactId, artifactIcon] = artifacts[stage.id];
    const collected = state.artifacts.includes(artifactId);
    const statusClass = complete ? 'is-complete' : current ? 'is-current' : locked ? 'is-locked' : 'is-open';
    const statusLabel = complete ? 'Пройден' : current ? 'Текущий этап' : locked ? 'Заблокирован' : 'Доступен';
    return `<article class="era-stop ${statusClass}">
            <div class="era-stop__marker" aria-hidden="true">${complete ? icon('status-complete') : locked ? icon('status-locked') : stage.id}</div>
            <div class="era-stop__content">
              <div class="era-stop__meta"><span>Этап ${stage.id}</span><strong>${statusLabel}</strong></div>
              <h2>${stage.title}</h2><p class="era-stop__subtitle">${stage.subtitle}</p><p>${stage.description}</p>
              <div class="era-stop__artifact ${collected ? 'is-collected' : ''}">${collected ? artifactImage(artifactIcon) : icon('status-locked')}<span><small>Артефакт этапа</small><b>${stage.artifact}</b></span></div>
            </div>
            <button type="button" data-map-stage="${stage.id}" ${locked ? 'disabled' : ''}>${locked ? 'Недоступно' : current ? 'Продолжить' : 'Открыть этап'} ${locked ? '' : icon('navigation-forward')}</button>
          </article>`;
  }).join('')}
      </div>
    </section>`;

  root.querySelectorAll('[data-map-stage]').forEach((button) => {
    button.addEventListener('click', () => onNavigate(Number(button.dataset.mapStage)));
  });
  root.querySelector('#era-map-title')?.focus({ preventScroll: true });
};
