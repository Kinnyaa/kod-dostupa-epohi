import { icon } from '../components/icons';

const MAX_TEAM_NAME_LENGTH = 24;

export const renderStartScreen = ({ root, onStart }) => {
  root.innerHTML = `
    <main class="welcome-screen" aria-labelledby="welcome-title">
      <section class="welcome-card">
        <div class="welcome-card__seal" aria-hidden="true">${icon('status-reward')}</div>
        <p class="stage-kicker">НИИ Времени приглашает</p>
        <h1 id="welcome-title">Код доступа: Эпохи</h1>
        <p class="welcome-card__lead">Соберите команду, исследуйте системы счисления разных цивилизаций и восстановите временное ядро.</p>
        <form class="welcome-form" novalidate>
          <label for="team-name">Название команды</label>
          <div class="welcome-form__field">
            <input id="team-name" name="teamName" type="text" maxlength="${MAX_TEAM_NAME_LENGTH}" autocomplete="organization" placeholder="Например, Хранители времени" aria-describedby="team-name-help team-name-error" autofocus>
            <span class="welcome-form__counter" aria-live="polite"><b>0</b> / ${MAX_TEAM_NAME_LENGTH}</span>
          </div>
          <p id="team-name-help">Придумайте название длиной до ${MAX_TEAM_NAME_LENGTH} символов.</p>
          <p id="team-name-error" class="welcome-form__error" role="alert"></p>
          <button class="primary-button welcome-form__submit" type="submit">Начать игру ${icon('navigation-forward')}</button>
        </form>
      </section>
    </main>`;

  const form = root.querySelector('.welcome-form');
  const input = form.querySelector('#team-name');
  const counter = form.querySelector('.welcome-form__counter b');
  const error = form.querySelector('.welcome-form__error');

  input.addEventListener('input', () => {
    counter.textContent = input.value.length;
    error.textContent = '';
    input.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const teamName = input.value.trim();
    if (!teamName) {
      error.textContent = 'Введите название команды, чтобы начать игру.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    onStart(teamName);
  });
};
