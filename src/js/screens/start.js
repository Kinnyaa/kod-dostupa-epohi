import { icon } from '../components/icons';

const MAX_TEAM_NAME_LENGTH = 24;
const MAX_MEMBER_NAME_LENGTH = 40;

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
          <fieldset class="team-members">
            <legend>Участники команды</legend>
            <div class="team-member" data-member="1">
              <label for="member-name-1">Имя первого участника</label>
              <input id="member-name-1" name="memberName1" type="text" maxlength="${MAX_MEMBER_NAME_LENGTH}" autocomplete="name" placeholder="Введите имя">
            </div>
            <div class="team-member" data-member="2" hidden>
              <div class="team-member__heading"><label for="member-name-2">Имя второго участника</label><button class="team-member__remove" type="button" aria-label="Удалить второго участника">Удалить</button></div>
              <input id="member-name-2" name="memberName2" type="text" maxlength="${MAX_MEMBER_NAME_LENGTH}" autocomplete="name" placeholder="Введите имя">
            </div>
            <button class="team-members__add" type="button">${icon('navigation-forward')} Добавить ещё одного участника</button>
            <p>Можно добавить не больше двух участников. Имена появятся только в итоговой карточке.</p>
          </fieldset>
          <button class="primary-button welcome-form__submit" type="submit">Начать игру ${icon('navigation-forward')}</button>
        </form>
      </section>
    </main>`;

  const form = root.querySelector('.welcome-form');
  const input = form.querySelector('#team-name');
  const counter = form.querySelector('.welcome-form__counter b');
  const error = form.querySelector('.welcome-form__error');
  const secondMember = form.querySelector('[data-member="2"]');
  const secondMemberInput = form.querySelector('#member-name-2');
  const addMemberButton = form.querySelector('.team-members__add');
  const removeMemberButton = form.querySelector('.team-member__remove');

  input.addEventListener('input', () => {
    counter.textContent = input.value.length;
    error.textContent = '';
    input.removeAttribute('aria-invalid');
  });

  addMemberButton.addEventListener('click', () => {
    secondMember.hidden = false;
    addMemberButton.hidden = true;
    secondMemberInput.focus();
  });

  removeMemberButton.addEventListener('click', () => {
    secondMemberInput.value = '';
    secondMember.hidden = true;
    addMemberButton.hidden = false;
    addMemberButton.focus();
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
    const participants = [
      form.querySelector('#member-name-1').value,
      secondMemberInput.value,
    ].map((name) => name.trim()).filter(Boolean).slice(0, 2);
    onStart({ teamName, participants });
  });
};
