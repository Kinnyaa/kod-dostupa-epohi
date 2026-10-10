import { loadState, saveState } from './services/storage';

export const ACHIEVEMENT_DEFINITIONS = [
  { id: 'archive-keeper', title: 'Архивист эпох', description: 'Засчитано задание каждой из четырёх цивилизаций' },
  { id: 'flawless-decoder', title: 'Безошибочный дешифровщик', description: 'Этапы 2–3 пройдены с первой попытки без подсказок' },
  { id: 'master-sixty', title: 'Мастер шестидесяти', description: 'Исследованы делители 60 и дополнительное задание Вавилона' },
  { id: 'bit-keeper', title: 'Хранитель разрядов', description: 'Проверены двоичная запись 753 и диапазон 8 бит' },
  { id: 'full-access', title: 'Полный допуск', description: 'Собраны все артефакты и набрано не менее 90 баллов' },
];

const achievementIdsFor = (candidate) => {
  const completed = candidate.completedQuestions || [];
  const hints = candidate.openedHints || [];
  const attempts = candidate.attempts || {};
  const unlocked = [];
  if (['egypt-01', 'babylon-01', 'rome-01', 'rus-01'].every((id) => completed.includes(id))) unlocked.push('archive-keeper');
  const flawlessIds = ['egypt-01', 'babylon-01', 'rome-01', 'rus-01', 'cross-01', 'cross-02', 'cross-03'];
  if (flawlessIds.every((id) => completed.includes(id) && attempts[id] === 1 && !hints.includes(id))) unlocked.push('flawless-decoder');
  if (['babylon-03', 'cross-02'].every((id) => completed.includes(id))) unlocked.push('master-sixty');
  if (['cross-01', 'cross-04'].every((id) => completed.includes(id))) unlocked.push('bit-keeper');
  if ((candidate.artifacts || []).length >= 5 && candidate.score >= 90) unlocked.push('full-access');
  return unlocked;
};

const initialState = {
  schemaVersion: 3,
  hasStarted: false,
  teamName: '',
  currentStage: 1,
  unlockedStage: 1,
  score: 0,
  answers: {},
  attempts: {},
  completedQuestions: [],
  openedHints: [],
  artifacts: [],
  achievements: [],
  timers: {},
  activeQuestionByStage: {},
  recoveredQuestions: [],
};

const restoredState = loadState();
let state = restoredState?.schemaVersion === initialState.schemaVersion
  ? { ...initialState, ...restoredState }
  : { ...initialState };
state = { ...state, achievements: achievementIdsFor(state) };

export const getState = () => state;

export const registerTeam = (teamName) => updateState({
  teamName: String(teamName).trim().slice(0, 24),
});

export const startGame = () => updateState({
  hasStarted: true,
  currentStage: 1,
  timers: {
    ...state.timers,
    expedition: state.timers.expedition?.startedAt
      ? state.timers.expedition
      : { startedAt: Date.now() },
  },
});

export const updateState = (changes) => {
  const next = { ...state, ...changes };
  state = { ...next, achievements: achievementIdsFor(next) };
  saveState(state);
  return state;
};

export const updateAnswer = (questionId, value) => updateState({
  answers: { ...state.answers, [questionId]: value },
});

export const registerAttempt = (questionId) => {
  const attempts = (state.attempts[questionId] || 0) + 1;
  updateState({ attempts: { ...state.attempts, [questionId]: attempts } });
  return attempts;
};

export const openHint = (questionId) => {
  if (!state.openedHints.includes(questionId)) {
    updateState({ openedHints: [...state.openedHints, questionId] });
  }
};

export const completeQuestion = (question) => {
  if (state.completedQuestions.includes(question.id)) return state;
  const attempts = state.attempts[question.id] || 1;
  const practical = question.id === 'practical-01';
  const attemptPenalty = attempts === 2 ? (practical ? 2 : 1) : attempts >= 3 ? (practical ? 4 : 2) : 0;
  const hintPenalty = state.openedHints.includes(question.id) ? (practical ? 2 : 1) : 0;
  const earned = Math.max(practical ? 2 : 1, question.points - attemptPenalty - hintPenalty);
  return updateState({
    score: Math.min(100, state.score + earned),
    completedQuestions: [...state.completedQuestions, question.id],
  });
};

export const completeBlitz = (questionId, correctAnswers, totalQuestions) => {
  if (state.completedQuestions.includes(questionId)) return state;
  const earned = Math.max(0, Math.min(totalQuestions, Number(correctAnswers) || 0));
  return updateState({
    score: Math.min(100, state.score + earned),
    completedQuestions: [...state.completedQuestions, questionId],
    attempts: { ...state.attempts, [questionId]: totalQuestions },
    answers: {
      ...state.answers,
      [questionId]: { ...(state.answers[questionId] || {}), correct: earned, total: totalQuestions, completed: true },
    },
  });
};

export const setCurrentStage = (stage) => {
  if (stage < 1 || stage > 6 || stage > state.unlockedStage) return state;
  return updateState({ currentStage: stage });
};

export const unlockStage = (stage) => {
  const unlockedStage = Math.max(state.unlockedStage, Math.min(6, stage));
  return updateState({ unlockedStage });
};

export const addArtifact = (artifactId) => {
  if (state.artifacts.includes(artifactId)) return state;
  return updateState({ artifacts: [...state.artifacts, artifactId] });
};

export const setActiveQuestion = (stage, questionId) => updateState({
  activeQuestionByStage: { ...state.activeQuestionByStage, [stage]: questionId },
});

export const updateTimer = (timerId, value) => updateState({
  timers: { ...state.timers, [timerId]: { ...(state.timers[timerId] || {}), ...value } },
});

export const recoverQuestion = (question) => {
  const recovered = state.recoveredQuestions || [];
  if (recovered.includes(question.id)) return state;
  const attempts = state.attempts[question.id] || 1;
  const practical = question.id === 'practical-01';
  const attemptLoss = attempts === 2 ? (practical ? 2 : 1) : attempts >= 3 ? (practical ? 4 : 2) : 0;
  const hintLoss = state.openedHints.includes(question.id) ? (practical ? 2 : 1) : 0;
  const restored = Math.min(practical ? 4 : 2, attemptLoss + hintLoss);
  return updateState({ score: Math.min(100, state.score + restored), recoveredQuestions: [...recovered, question.id] });
};
