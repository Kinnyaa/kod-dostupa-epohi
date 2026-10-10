import { icon } from './icons';

const inputConfig = {
  integer: { inputmode: 'numeric', pattern: '[-+0-9 ]*', placeholder: 'Введите целое число…' },
  roman: { inputmode: 'text', pattern: '[MDCLXVImdclxvi ]*', placeholder: 'Например, DCCLIII' },
  binary: { inputmode: 'numeric', pattern: '[01 ₂]*', placeholder: 'Введите двоичное число…' },
  listOfIntegers: { inputmode: 'numeric', placeholder: 'Например: 1, 2, 3' },
  text: { inputmode: 'text', placeholder: 'Введите ответ…' },
};

const createInputControl = (question, initialValue) => {
  if (question.type === 'singleChoice') {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'choice-list';
    fieldset.innerHTML = `<legend class="sr-only">Выберите один ответ</legend>${question.options.map((option, index) => `
      <label class="choice-option">
        <input type="radio" name="answer" value="${option.replace(/"/g, '&quot;')}" ${option === initialValue ? 'checked' : ''}>
        <span>${option}</span>
      </label>`).join('')}`;
    return fieldset;
  }

  const config = inputConfig[question.type] || inputConfig.text;
  const input = document.createElement('input');
  input.id = 'answer';
  input.name = 'answer';
  input.autocomplete = 'off';
  input.inputMode = config.inputmode;
  input.placeholder = config.placeholder;
  if (config.pattern) input.pattern = config.pattern;
  input.value = initialValue || '';
  input.setAttribute('aria-describedby', 'answer-help answer-status');
  return input;
};

export const createQuestionComponent = ({ container, question, initialValue = '', onChange, onSubmit, onHint }) => {
  container.innerHTML = '';
  container.noValidate = true;

  const label = document.createElement('label');
  label.className = 'sr-only';
  label.htmlFor = 'answer';
  label.textContent = 'Ответ на задание';
  const control = createInputControl(question, initialValue);

  const submit = document.createElement('button');
  submit.className = 'primary-button';
  submit.type = 'submit';
  submit.innerHTML = `<span class="button-label">Проверить ответ</span>${icon('navigation-forward')}`;

  const hintButton = document.createElement('button');
  hintButton.className = 'hint-button';
  hintButton.type = 'button';
  hintButton.setAttribute('aria-expanded', 'false');
  hintButton.setAttribute('aria-controls', 'hint');
  hintButton.innerHTML = `${icon('status-hint')} Нужна подсказка?${icon('navigation-forward', 'hint-toggle')}`;

  const help = document.createElement('p');
  help.id = 'answer-help';
  help.className = 'sr-only';
  help.textContent = 'После ввода активируйте кнопку проверки ответа.';
  const status = document.createElement('p');
  status.id = 'answer-status';
  status.className = 'answer-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  const hint = document.createElement('div');
  hint.id = 'hint';
  hint.className = 'hint';
  hint.tabIndex = -1;
  hint.hidden = true;

  container.append(label, control, submit, hintButton, help, status, hint);

  const getValue = () => {
    if (question.type === 'singleChoice') {
      return container.querySelector('input[name="answer"]:checked')?.value || '';
    }
    return control.value;
  };
  const changeEvent = question.type === 'singleChoice' ? 'change' : 'input';
  control.addEventListener(changeEvent, () => onChange(getValue()));
  container.addEventListener('submit', (event) => { event.preventDefault(); onSubmit(getValue()); });
  hintButton.addEventListener('click', () => onHint());

  return { control, submit, hintButton, status, hint, getValue };
};
