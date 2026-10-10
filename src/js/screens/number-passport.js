import { artifactImage, icon } from '../components/icons';

const civilizations = [
  { id: 'egypt-01', name: 'Египет', system: 'Десятичная непозиционная', alphabet: 'Знаки степеней десяти', value: '222', rule: 'Значения повторяющихся знаков складываются.' },
  { id: 'babylon-01', name: 'Вавилон', system: 'Позиционная, основание 60', alphabet: 'Два клинописных знака', value: '125', rule: 'Значение знака зависит от его разряда.' },
  { id: 'rome-01', name: 'Рим', system: 'Буквенная непозиционная', alphabet: 'I, V, X, L, C, D, M', value: 'DCCLIII', rule: 'Меньший знак перед большим вычитается, после — складывается.' },
  { id: 'rus-01', name: 'Древняя Русь', system: 'Алфавитная непозиционная', alphabet: 'Кириллические буквы под титлом', value: 'ЦПИ (988)', rule: 'Буквы алфавита обозначают числовые значения.' },
];

const artifactDefinitions = [
  ['researcher-hypothesis', 'scroll-researcher', 'Свиток исследователя'],
  ['number-passport', 'papyrus-number', 'Папирус числа'],
  ['translation-table', 'translation-tablet', 'Табличка переводов'],
  ['compatibility-card', 'compatibility-seal', 'Печать совместимости'],
  ['core-patch', 'time-core-key', 'Ключ временного ядра'],
];

const lock = (message) => `<div class="passport-lock">${icon('status-locked')}<span>${message}</span></div>`;
const verified = () => `<span class="passport-status">${icon('status-complete')} Проверено</span>`;

export const renderNumberPassport = ({ root, state }) => {
  const done = (id) => state.completedQuestions.includes(id);
  const romanReady = done('rome-01');
  const binaryReady = done('cross-01');
  const divisorsReady = done('cross-02');
  const comparisonReady = done('cross-03');
  const rangeReady = done('cross-04');
  const practicalReady = done('practical-01');
  const openSections = civilizations.filter(({ id }) => done(id)).length
    + Number(romanReady || binaryReady) + Number(divisorsReady || comparisonReady) + Number(rangeReady || practicalReady);

  root.innerHTML = `<section class="quest-card archive-passport" aria-labelledby="archive-passport-title">
    <header class="archive-passport__header"><div><p class="stage-kicker">Архив команды</p><h1 id="archive-passport-title" tabindex="-1">Паспорт числа</h1><p class="eyebrow">Проверенные записи, правила и вычисления</p></div><div class="archive-passport__stamp"><strong>${openSections} / 7</strong><span>разделов открыто</span></div></header>

    <section class="passport-section"><header><div><p class="stage-kicker">Раздел 01</p><h2>Системы цивилизаций</h2></div><strong>${civilizations.filter(({ id }) => done(id)).length} / 4</strong></header><div class="passport-civilizations">${civilizations.map((item) => {
    const ready = done(item.id);
    return `<article class="passport-civilization ${ready ? 'is-ready' : 'is-locked'}"><div class="passport-civilization__heading"><span>${ready ? icon('status-complete') : icon('status-locked')}</span><div><h3>${item.name}</h3><small>${ready ? item.system : 'Данные ещё не исследованы'}</small></div></div>${ready ? `<dl><div><dt>Алфавит</dt><dd>${item.alphabet}</dd></div><div><dt>Пример</dt><dd>${item.value}</dd></div><div><dt>Правило</dt><dd>${item.rule}</dd></div></dl>` : '<p>Выполните задание этой цивилизации на втором этапе.</p>'}</article>`;
  }).join('')}</div></section>

    <section class="passport-section"><header><div><p class="stage-kicker">Раздел 02</p><h2>Таблица переводов числа 753</h2></div>${romanReady && binaryReady ? verified() : ''}</header>${romanReady || binaryReady ? `<div class="passport-conversions"><div><span>Десятичная</span><strong>753₁₀</strong>${verified()}</div><div class="${romanReady ? '' : 'is-locked'}"><span>Римская</span><strong>${romanReady ? 'DCCLIII' : '—'}</strong>${romanReady ? verified() : icon('status-locked')}</div><div class="${binaryReady ? '' : 'is-locked'}"><span>Двоичная</span><strong>${binaryReady ? '1011110001₂' : '—'}</strong>${binaryReady ? verified() : icon('status-locked')}</div></div>` : lock('Переводы откроются после заданий третьего этапа.')}</section>

    <section class="passport-section"><header><div><p class="stage-kicker">Раздел 03</p><h2>Делители и основание 60</h2></div>${comparisonReady ? verified() : ''}</header>${divisorsReady ? `<div class="passport-divisors"><article><strong>60</strong><span>12 делителей</span><p>1 · 2 · 3 · 4 · 5 · 6 · 10 · 12 · 15 · 20 · 30 · 60</p></article><article class="${comparisonReady ? '' : 'is-locked'}"><strong>100</strong><span>${comparisonReady ? '9 делителей' : 'Сравнение закрыто'}</span><p>${comparisonReady ? '1 · 2 · 4 · 5 · 10 · 20 · 25 · 50 · 100' : 'Завершите сравнение на третьем этапе.'}</p></article></div>${comparisonReady ? '<p class="passport-conclusion">60 имеет больше делителей, поэтому основание 60 удобно для времени, углов и дробных вычислений.</p>' : ''}` : lock('Список делителей откроется после соответствующего задания.')}</section>

    <section class="passport-section"><header><div><p class="stage-kicker">Раздел 04</p><h2>Разрядность и совместимость</h2></div>${rangeReady && practicalReady ? verified() : ''}</header>${rangeReady || practicalReady ? `<div class="passport-compatibility"><div><span>Число</span><strong>3600₁₀</strong></div><div class="${practicalReady ? '' : 'is-locked'}"><span>Двоичный код</span><strong>${practicalReady ? '111000010000₂' : '—'}</strong></div><div class="${practicalReady ? '' : 'is-locked'}"><span>Минимум</span><strong>${practicalReady ? '12 бит' : '—'}</strong></div><div class="${rangeReady ? '' : 'is-locked'}"><span>Диапазон 8 бит</span><strong>${rangeReady ? '0–255' : '—'}</strong></div><div class="${rangeReady && practicalReady ? 'is-warning' : 'is-locked'}"><span>Результат</span><strong>${rangeReady && practicalReady ? 'Не помещается' : '—'}</strong></div></div>` : lock('Проверки разрядности откроются после заданий четвёртого этапа.')}</section>

    <section class="passport-section passport-artifacts"><header><div><p class="stage-kicker">Коллекция</p><h2>Артефакты экспедиции</h2></div><strong>${state.artifacts.length} / ${artifactDefinitions.length}</strong></header><div>${artifactDefinitions.map(([id, image, title]) => { const collected = state.artifacts.includes(id); return `<article class="${collected ? 'is-collected' : 'is-locked'}">${collected ? artifactImage(image) : icon('status-locked')}<span><strong>${collected ? title : 'Неизвестный артефакт'}</strong><small>${collected ? 'Добавлен в паспорт' : 'Завершите соответствующий этап'}</small></span></article>`; }).join('')}</div></section>
  </section>`;
  root.querySelector('#archive-passport-title')?.focus({ preventScroll: true });
};
