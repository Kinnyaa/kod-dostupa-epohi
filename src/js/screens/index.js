import { resultsScreen, stages } from '../../data/stages';
import { icon } from '../components/icons';

export const renderPlaceholderScreen = ({ root, screenId, unlockedStage, score }) => {
  const isResults = screenId === 6;
  const screen = isResults ? resultsScreen : stages.find(({ id }) => id === screenId);
  const locked = screenId > unlockedStage;
  root.innerHTML = `
    <section class="quest-card stage-screen ${isResults ? 'results-screen' : ''}" aria-labelledby="quest-title">
      <header>
        <p class="stage-kicker">${isResults ? 'Финальный экран' : `Этап ${screen.id}`}</p>
        <h1 id="quest-title" tabindex="-1">${screen.title}</h1>
        <p class="eyebrow">${screen.subtitle}</p>
      </header>
      <div class="stage-screen__intro">
        <span class="stage-screen__number" aria-hidden="true">${isResults ? icon('status-reward') : String(screen.id).padStart(2, '0')}</span>
        <div><p>${screen.description}</p>${!isResults ? `<p><strong>Артефакт этапа:</strong> ${screen.artifact}</p>` : `<p><strong>Текущий результат:</strong> ${score} из 100 баллов</p>`}</div>
      </div>
      <div class="stage-screen__notice ${locked ? 'is-locked' : ''}" role="status">
        <strong>${locked ? 'Экран пока заблокирован' : 'Экран подготовлен'}</strong>
        <p>${locked ? 'Завершите обязательные задания предыдущего этапа.' : 'Интерактивные задания этого этапа будут подключены следующим промтом.'}</p>
      </div>
    </section>`;
  root.querySelector('#quest-title')?.focus({ preventScroll: true });
};
