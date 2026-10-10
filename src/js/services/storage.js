const STORAGE_KEY = 'access-code-epochs-state';

export const loadState = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Не удалось восстановить прогресс:', error);
    return null;
  }
};

export const saveState = (state) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Не удалось сохранить прогресс:', error);
  }
};

export const clearState = () => window.localStorage.removeItem(STORAGE_KEY);
