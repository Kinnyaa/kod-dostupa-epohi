import '../../node_modules/focus-visible/dist/focus-visible';
import '../scss/main.scss';
import questionBank from '../../docs/content/question-bank.json';
import { renderAchievementPanel, renderArtifactsPanel, renderProgressPanel, renderStageControls, renderTimeline, renderTimerPanel } from './components/Navigation';
import { renderPlaceholderScreen } from './screens';
import { renderStageOne } from './screens/stage-1';
import { renderStageTwo } from './screens/stage-2';
import { renderStageThree } from './screens/stage-3';
import { renderStageFour } from './screens/stage-4';
import { renderFinalResults, renderStageFive } from './screens/stage-5';
import { renderStartScreen } from './screens/start';
import { renderEraMap } from './screens/era-map';
import { renderNumberPassport } from './screens/number-passport';
import { renderResultsPage } from './screens/results';
import { renderBriefingScreen } from './screens/briefing';
import { getState, registerTeam, setCurrentStage, startGame } from './state';
import { icon } from './components/icons';

const screenRoot = document.querySelector('#screen-root');
const timeline = document.querySelector('.timeline');
const stageNavigation = document.querySelector('.stage-navigation');
const score = document.querySelector('.score');
const scoreValue = document.querySelector('.score-value');
const appShell = document.querySelector('.app-shell');
const topbar = document.querySelector('.topbar');
let cleanupScreen = () => {};
let timerInterval = null;
const viewNames = ['game', 'map', 'passport', 'results'];
const viewFromLocation = () => {
  const requested = window.location.hash.replace('#', '');
  return viewNames.includes(requested) ? requested : 'game';
};
let currentView = viewFromLocation();
const sidebarLinks = [...document.querySelectorAll('.sidebar__link')];

const showView = (view, historyMode = 'push') => {
  if (!viewNames.includes(view)) return;
  currentView = view;
  const url = `${window.location.pathname}${window.location.search}#${view}`;
  if (historyMode === 'replace') window.history.replaceState({ view }, '', url);
  else if (window.location.hash !== `#${view}`) window.history.pushState({ view }, '', url);
  renderApp();
};

const hydrateStaticIcons = () => {
  const replacements = [
    ['.player__mark', 'status-reward', 'player__mark'],
    ['.score>span', 'status-score', 'score-icon'],
    ['.sidebar__link:nth-child(1)>span', 'navigation-home', 'sidebar-icon'],
    ['.sidebar__link:nth-child(2)>span', 'navigation-timeline', 'sidebar-icon'],
    ['.sidebar__link:nth-child(3)>span', 'navigation-passport', 'sidebar-icon'],
    ['.sidebar__link:nth-child(4)>span', 'navigation-results', 'sidebar-icon'],
    ['.question__icon', 'system-help', 'question__icon'],
    ['.timer>span', 'status-time', 'timer-icon'],
    ['.achievement .medal', 'status-reward', 'medal'],
  ];
  replacements.forEach(([selector, name, className]) => document.querySelector(selector)?.replaceWith(document.createRange().createContextualFragment(icon(name, className))));
  document.querySelectorAll('.progress-card ol li.done').forEach((item) => { item.innerHTML = `${icon('status-complete', 'progress-marker')} ${item.textContent.replace(/^✓\s*/, '')}`; });
};

const renderScore = () => {
  const value = getState().score;
  scoreValue.textContent = value;
  score.setAttribute('aria-label', `${value} баллов`);
};

const navigate = (stage) => {
  const returningToGame = currentView !== 'game';
  const before = getState().currentStage;
  setCurrentStage(stage);
  if (getState().currentStage !== before || stage === before) {
    if (returningToGame) showView('game');
    else renderApp();
  }
};

function renderApp() {
  cleanupScreen();
  cleanupScreen = () => {};
  const state = getState();
  document.querySelector('.player b').textContent = state.teamName || 'Хранители времени';
  if (!state.teamName) {
    topbar.hidden = true;
    appShell.classList.add('app-shell--welcome');
    renderStartScreen({
      root: screenRoot,
      onStart: (teamName) => {
        registerTeam(teamName);
        renderApp();
      },
    });
    return;
  }
  if (!state.hasStarted) {
    topbar.hidden = true;
    appShell.classList.add('app-shell--welcome');
    renderBriefingScreen({
      root: screenRoot,
      teamName: state.teamName,
      onStart: () => {
        startGame();
        showView('game', 'replace');
      },
    });
    return;
  }
  topbar.hidden = false;
  appShell.classList.remove('app-shell--welcome');
  renderTimeline({ container: timeline, ...state, onNavigate: navigate });
  renderStageControls({ container: stageNavigation, ...state, onNavigate: navigate });
  renderProgressPanel(state);
  renderArtifactsPanel(state);
  renderAchievementPanel(state);
  renderTimerPanel(state);
  if (timerInterval) window.clearInterval(timerInterval);
  timerInterval = window.setInterval(() => renderTimerPanel(getState()), 1000);
  renderScore();

  sidebarLinks.forEach((link) => {
    const active = link.dataset.view === currentView;
    link.classList.toggle('sidebar__link--active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (currentView === 'map') {
    stageNavigation.hidden = true;
    renderEraMap({ root: screenRoot, state, onNavigate: navigate });
    return;
  }
  if (currentView === 'passport') {
    stageNavigation.hidden = true;
    renderNumberPassport({ root: screenRoot, state });
    return;
  }
  if (currentView === 'results') {
    stageNavigation.hidden = true;
    renderResultsPage({
      root: screenRoot,
      state,
      questionBank,
      onContinue: () => showView('game'),
      onStateChange: renderApp,
    });
    return;
  }
  stageNavigation.hidden = false;

  const shared = { root: screenRoot, questionBank, onStateChange: renderApp };
  if (state.currentStage === 1) renderStageOne(shared);
  else if (state.currentStage === 2) renderStageTwo(shared);
  else if (state.currentStage === 3) renderStageThree(shared);
  else if (state.currentStage === 4) renderStageFour(shared);
  else if (state.currentStage === 5) cleanupScreen = renderStageFive(shared) || (() => {});
  else if (state.currentStage === 6) renderFinalResults(shared);
  else renderPlaceholderScreen({ root: screenRoot, screenId: state.currentStage, unlockedStage: state.unlockedStage, score: state.score });
}

hydrateStaticIcons();
sidebarLinks.forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showView(link.dataset.view);
}));
window.addEventListener('popstate', () => {
  const view = viewFromLocation();
  if (view !== currentView) { currentView = view; renderApp(); }
});
if (!viewNames.includes(window.location.hash.replace('#', ''))) {
  window.history.replaceState({ view: currentView }, '', `${window.location.pathname}${window.location.search}#${currentView}`);
}
renderApp();
