export const SCORE_RULES = Object.freeze({ base: 100, wrongAttemptPenalty: 20, hintPenalty: 15, minimum: 25 });

export function calculateTaskScore({ attempts = 1, hintsUsed = 0, correct = true } = {}, rules = SCORE_RULES) {
  if (!correct) return 0;
  const wrongAttempts = Math.max(0, Number(attempts) - 1);
  const hints = Math.max(0, Number(hintsUsed));
  return Math.max(rules.minimum, rules.base - wrongAttempts * rules.wrongAttemptPenalty - hints * rules.hintPenalty);
}

export function calculateTotalScore(answers = {}) {
  return Object.values(answers).reduce((total, answer) => total + calculateTaskScore(answer), 0);
}
