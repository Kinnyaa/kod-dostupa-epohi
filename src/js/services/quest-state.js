import { clearProgress, loadProgress, saveProgress } from './storage';

const initialState = () => ({ currentStage: 0, unlockedStage: 0, completed: [false, false, false, false, false], answers: {}, attempts: [0, 0, 0, 0, 0], score: 0, artifacts: [], defenseSeconds: 90, defenseStarted: false, defenseFinished: false });

export const loadState = () => {
  const saved = loadProgress();
  const base = initialState();
  if (!saved || !Array.isArray(saved.completed)) return base;
  return { ...base, ...saved, answers: { ...base.answers, ...(saved.answers || {}) } };
};
export const saveState = (state) => saveProgress(state);
export const clearState = () => clearProgress();
