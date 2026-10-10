import { TaskCard } from '../components/TaskCard'; import { Navigation } from '../components/Navigation';
export const StageScreen = ({ stage, state, totalStages }) => `${TaskCard({ stage, answer: state.answers[stage.id], completed: state.completedStages.includes(state.currentStage) })}${Navigation({ currentStage: state.currentStage, unlockedStage: state.unlockedStage, totalStages })}`;
