import { icon } from '../components/icons';

const facts = [
  { mark: '60', title: 'Наследие Вавилона', text: 'Деление часа на 60 минут и круга на 360 градусов связано с шестидесятеричной системой.' },
  { mark: '0', title: 'Путь нуля', text: 'Ноль стал полноценным числом не сразу: его современная запись пришла в Европу через Индию и арабский мир.' },
  { mark: 'X', title: 'Римская запись', text: 'Римские числа удобны для надписей, но сложные письменные вычисления с ними выполнять трудно.' },
];

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export const renderBriefingScreen = ({ root, teamName, onStart }) => {
  const safeTeamName = escapeHtml(teamName);
  root.innerHTML = `<main class="briefing-screen" aria-labelledby="briefing-title"><section class="briefing-card">
    <header><div><p class="stage-kicker">Команда «${safeTeamName}» зарегистрирована</p><h1 id="briefing-title" tabindex="-1">Инструктаж перед экспедицией</h1><p>Вам предстоит пройти пять этапов, исследовать способы записи чисел и восстановить временное ядро.</p></div><span class="briefing-card__emblem" aria-hidden="true">${icon('navigation-timeline')}</span></header>
    <section class="briefing-rules" aria-labelledby="briefing-rules-title"><h2 id="briefing-rules-title">Правила прохождения</h2><ol><li><strong>Исследуйте</strong><span>Читайте архивные материалы и сравнивайте системы счисления.</span></li><li><strong>Проверяйте</strong><span>Отвечайте на вопросы. Повторные попытки и подсказки влияют на баллы.</span></li><li><strong>Собирайте</strong><span>Получите пять артефактов и представьте результаты Совету времени.</span></li></ol></section>
    <section class="briefing-facts" aria-labelledby="briefing-facts-title"><div><p class="stage-kicker">Перед стартом</p><h2 id="briefing-facts-title">Факты об эпохах и числах</h2></div><div class="briefing-facts__grid">${facts.map((fact) => `<article><span aria-hidden="true">${fact.mark}</span><div><h3>${fact.title}</h3><p>${fact.text}</p></div></article>`).join('')}</div></section>
    <aside class="briefing-warning" role="note">${icon('status-time')}<div><strong>На экспедицию даётся 90 минут</strong><p>После нажатия кнопки начнётся обратный отсчёт и откроется первый этап. Остановить таймер во время прохождения нельзя. В финале вас ждёт отдельный блиц-тест: 5 вопросов за 90 секунд.</p></div></aside>
    <button class="primary-button briefing-start" type="button">Начать экспедицию ${icon('navigation-forward')}</button>
  </section></main>`;
  root.querySelector('.briefing-start')?.addEventListener('click', onStart);
  root.querySelector('#briefing-title')?.focus({ preventScroll: true });
};
