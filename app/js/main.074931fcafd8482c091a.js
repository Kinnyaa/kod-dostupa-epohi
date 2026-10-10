/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./data/stages.js":
/*!************************!*\
  !*** ./data/stages.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resultsScreen": () => (/* binding */ resultsScreen),
/* harmony export */   "stages": () => (/* binding */ stages)
/* harmony export */ });
var stages = [{
  id: 1,
  title: 'Взлом протокола',
  shortTitle: 'Введение',
  subtitle: 'Ищем ошибку в историческом шифре',
  description: 'Изучите повреждённый протокол, найдите нарушение и сформулируйте гипотезу исследователя.',
  artifact: 'Свиток исследователя'
}, {
  id: 2,
  title: 'Архив НИИ Времени',
  shortTitle: 'Архив НИИ Времени',
  subtitle: 'Сравниваем системы чисел',
  description: 'Исследуйте способы записи чисел в четырёх цивилизациях и заполните паспорт числа.',
  artifact: 'Папирус числа'
}, {
  id: 3,
  title: 'Компиляция',
  shortTitle: 'Компиляция',
  subtitle: 'Переводим данные между системами',
  description: 'Переведите число 753 в римскую и двоичную запись и сравните свойства систем счисления.',
  artifact: 'Табличка переводов'
}, {
  id: 4,
  title: 'Сборка ядра',
  shortTitle: 'Сборка ядра',
  subtitle: 'Проверяем совместимость чисел',
  description: 'Определите число двоичных разрядов и проверьте, помещаются ли данные в восьмибитный диапазон.',
  artifact: 'Печать совместимости'
}, {
  id: 5,
  title: 'Защита перед Советом',
  shortTitle: 'Защита',
  subtitle: 'Подтверждаем полный допуск',
  description: 'Ответьте на финальные вопросы и представьте результаты исследования Совету времени.',
  artifact: 'Ключ временного ядра'
}];
var resultsScreen = {
  id: 6,
  title: 'Итоги экспедиции',
  subtitle: 'Личный архив Хранителя времени',
  description: 'Здесь появятся итоговый балл, полученные артефакты, достижения и карточка «Ключ временного ядра».'
};

/***/ }),

/***/ "./js/components/Navigation.js":
/*!*************************************!*\
  !*** ./js/components/Navigation.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAchievementPanel": () => (/* binding */ renderAchievementPanel),
/* harmony export */   "renderArtifactsPanel": () => (/* binding */ renderArtifactsPanel),
/* harmony export */   "renderProgressPanel": () => (/* binding */ renderProgressPanel),
/* harmony export */   "renderStageControls": () => (/* binding */ renderStageControls),
/* harmony export */   "renderTimeline": () => (/* binding */ renderTimeline),
/* harmony export */   "renderTimerPanel": () => (/* binding */ renderTimerPanel)
/* harmony export */ });
/* harmony import */ var _data_stages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/stages */ "./data/stages.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons */ "./js/components/icons.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "./js/state.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var renderTimeline = function renderTimeline(_ref) {
  var container = _ref.container,
      currentStage = _ref.currentStage,
      unlockedStage = _ref.unlockedStage,
      onNavigate = _ref.onNavigate;
  container.innerHTML = _data_stages__WEBPACK_IMPORTED_MODULE_0__.stages.map(function (stage) {
    var complete = stage.id < unlockedStage;
    var current = stage.id === currentStage;
    var locked = stage.id > unlockedStage;
    return "<li class=\"".concat(complete ? 'is-complete' : '', " ").concat(current ? 'is-current' : '', " ").concat(locked ? 'is-locked' : '', "\">\n      <button type=\"button\" data-stage=\"").concat(stage.id, "\" ").concat(locked ? 'disabled' : '', " ").concat(current ? 'aria-current="step"' : '', " aria-label=\"\u042D\u0442\u0430\u043F ").concat(stage.id, ": ").concat(stage.title).concat(locked ? '. Недоступен' : '', "\">\n        <span class=\"timeline__marker\" aria-hidden=\"true\">").concat(complete ? (0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-complete') : stage.id, "</span>\n        <span class=\"timeline__label\"><small>\u042D\u0442\u0430\u043F ").concat(stage.id, "</small><b>").concat(stage.shortTitle, "</b></span>\n      </button>\n    </li>");
  }).join('');
  container.querySelectorAll('button[data-stage]').forEach(function (button) {
    button.addEventListener('click', function () {
      return onNavigate(Number(button.dataset.stage));
    });
  });
};
var renderStageControls = function renderStageControls(_ref2) {
  var _container$querySelec, _container$querySelec2;

  var container = _ref2.container,
      currentStage = _ref2.currentStage,
      unlockedStage = _ref2.unlockedStage,
      onNavigate = _ref2.onNavigate;
  var isResults = currentStage === 6;
  var nextStage = currentStage + 1;
  var nextLocked = nextStage > unlockedStage;
  container.innerHTML = "\n    <button class=\"stage-nav-button stage-nav-button--back\" type=\"button\" ".concat(currentStage === 1 ? 'disabled' : '', ">").concat((0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('navigation-back'), " \u041D\u0430\u0437\u0430\u0434</button>\n    <p class=\"stage-navigation__status\">").concat(isResults ? 'Экспедиция завершена' : "\u042D\u0442\u0430\u043F ".concat(currentStage, " \u0438\u0437 5"), "</p>\n    <button class=\"stage-nav-button stage-nav-button--next\" type=\"button\" ").concat(isResults || nextLocked ? 'disabled' : '', ">\n      ").concat(currentStage === 5 ? 'К итогам' : 'Дальше', " ").concat((0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('navigation-forward'), "\n    </button>");
  (_container$querySelec = container.querySelector('.stage-nav-button--back')) === null || _container$querySelec === void 0 ? void 0 : _container$querySelec.addEventListener('click', function () {
    return onNavigate(currentStage - 1);
  });
  (_container$querySelec2 = container.querySelector('.stage-nav-button--next')) === null || _container$querySelec2 === void 0 ? void 0 : _container$querySelec2.addEventListener('click', function () {
    return onNavigate(nextStage);
  });
};
var renderProgressPanel = function renderProgressPanel(_ref3) {
  var currentStage = _ref3.currentStage,
      unlockedStage = _ref3.unlockedStage;
  var visibleStage = Math.min(currentStage, 5);
  var completed = Math.max(0, Math.min(5, unlockedStage - 1));
  var ring = document.querySelector('.progress-ring');
  var ringValue = ring === null || ring === void 0 ? void 0 : ring.querySelector('strong');

  if (ring && ringValue) {
    ring.style.setProperty('--progress', "".concat(completed * 20, "%"));
    ring.setAttribute('aria-label', "\u041F\u0440\u043E\u0439\u0434\u0435\u043D\u043E ".concat(completed, " \u0438\u0437 5 \u044D\u0442\u0430\u043F\u043E\u0432"));
    ringValue.innerHTML = "".concat(completed, " <small>\u0438\u0437 5</small>");
  }

  var list = document.querySelector('.progress-card ol');
  if (!list) return;
  list.innerHTML = _data_stages__WEBPACK_IMPORTED_MODULE_0__.stages.map(function (stage) {
    var complete = stage.id < unlockedStage;
    var current = stage.id === visibleStage;
    var marker = complete ? (0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-complete') : current ? (0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-current') : (0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-locked');
    return "<li class=\"".concat(complete ? 'done' : '', " ").concat(current ? 'current' : '', "\"><span class=\"progress-marker\">").concat(marker, "</span>\u042D\u0442\u0430\u043F ").concat(stage.id, ". ").concat(stage.shortTitle, "</li>");
  }).join('');
};
var renderArtifactsPanel = function renderArtifactsPanel(_ref4) {
  var artifacts = _ref4.artifacts;
  var definitions = [['researcher-hypothesis', 'scroll-researcher', 'Свиток исследователя'], ['number-passport', 'papyrus-number', 'Папирус числа'], ['translation-table', 'translation-tablet', 'Табличка переводов'], ['compatibility-card', 'compatibility-seal', 'Печать совместимости'], ['core-patch', 'time-core-key', 'Ключ временного ядра']];
  var count = document.querySelector('.artifacts header span');
  var grid = document.querySelector('.artifacts__grid');
  if (!count || !grid) return;
  count.textContent = "".concat(artifacts.length, " \u0438\u0437 ").concat(definitions.length);
  grid.innerHTML = definitions.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 3),
        id = _ref6[0],
        artifactName = _ref6[1],
        title = _ref6[2];

    var collected = artifacts.includes(id);
    return "<div class=\"artifact ".concat(collected ? 'collected' : 'locked', "\"><span aria-hidden=\"true\">").concat(collected ? (0,_icons__WEBPACK_IMPORTED_MODULE_1__.artifactImage)(artifactName) : (0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-locked'), "</span><p>").concat(collected ? title : '<span class="sr-only">Артефакт </span>Недоступен', "</p></div>");
  }).join('');
};
var renderAchievementPanel = function renderAchievementPanel(_ref7) {
  var _ref7$achievements = _ref7.achievements,
      achievements = _ref7$achievements === void 0 ? [] : _ref7$achievements,
      _ref7$attempts = _ref7.attempts,
      attempts = _ref7$attempts === void 0 ? {} : _ref7$attempts,
      _ref7$openedHints = _ref7.openedHints,
      openedHints = _ref7$openedHints === void 0 ? [] : _ref7$openedHints;
  var panel = document.querySelector('.achievement');
  if (!panel) return;
  var unlocked = _state__WEBPACK_IMPORTED_MODULE_2__.ACHIEVEMENT_DEFINITIONS.filter(function (_ref8) {
    var id = _ref8.id;
    return achievements.includes(id);
  });
  var latest = unlocked.at(-1);
  var next = _state__WEBPACK_IMPORTED_MODULE_2__.ACHIEVEMENT_DEFINITIONS.find(function (_ref9) {
    var id = _ref9.id;
    return !achievements.includes(id);
  });
  var attemptCount = Object.values(attempts).reduce(function (sum, value) {
    return sum + Number(value || 0);
  }, 0);
  panel.innerHTML = "<h2>".concat(latest ? 'Последнее достижение' : 'Достижения', "</h2><div><span class=\"medal\" aria-hidden=\"true\">").concat(latest ? (0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-reward') : (0,_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-locked'), "</span><p><strong>").concat((latest === null || latest === void 0 ? void 0 : latest.title) || 'Первое достижение впереди', "</strong><small>").concat((latest === null || latest === void 0 ? void 0 : latest.description) || (next === null || next === void 0 ? void 0 : next.description) || 'Все достижения получены', "</small><em>").concat(unlocked.length, " \u0438\u0437 ").concat(_state__WEBPACK_IMPORTED_MODULE_2__.ACHIEVEMENT_DEFINITIONS.length, " \xB7 ").concat(attemptCount, " \u043F\u043E\u043F\u044B\u0442\u043E\u043A \xB7 ").concat(openedHints.length, " \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043E\u043A</em></p><span aria-hidden=\"true\">\u203A</span></div>");
};
var renderTimerPanel = function renderTimerPanel(_ref10) {
  var _defense$remaining, _timers$expedition;

  var _ref10$timers = _ref10.timers,
      timers = _ref10$timers === void 0 ? {} : _ref10$timers,
      _ref10$completedQuest = _ref10.completedQuestions,
      completedQuestions = _ref10$completedQuest === void 0 ? [] : _ref10$completedQuest,
      currentStage = _ref10.currentStage;
  var label = document.querySelector('#timer-label');
  var time = document.querySelector('.timer time');
  if (!label || !time) return;
  var defense = timers.defense;
  var complete = completedQuestions.includes('defense-01');
  var defenseActive = currentStage === 5 && (defense === null || defense === void 0 ? void 0 : defense.startedAt);
  var remaining = defenseActive ? Math.max(0, defense.completed ? (_defense$remaining = defense.remaining) !== null && _defense$remaining !== void 0 ? _defense$remaining : 0 : 90 - Math.floor((Date.now() - defense.startedAt) / 1000)) : null;

  if (defenseActive) {
    label.textContent = complete ? 'Защита завершена' : 'До конца защиты';
    time.textContent = "".concat(String(Math.floor(remaining / 60)).padStart(2, '0'), " : ").concat(String(remaining % 60).padStart(2, '0'));
    time.setAttribute('datetime', "PT".concat(remaining, "S"));
    return;
  }

  var elapsed = (_timers$expedition = timers.expedition) !== null && _timers$expedition !== void 0 && _timers$expedition.startedAt ? Math.max(0, Math.floor((Date.now() - timers.expedition.startedAt) / 1000)) : 0;
  var expeditionRemaining = Math.max(0, 90 * 60 - elapsed);
  label.textContent = expeditionRemaining > 0 ? 'До конца экспедиции' : 'Время экспедиции истекло';
  time.textContent = "".concat(String(Math.floor(expeditionRemaining / 60)).padStart(2, '0'), " : ").concat(String(expeditionRemaining % 60).padStart(2, '0'));
  time.setAttribute('datetime', "PT".concat(expeditionRemaining, "S"));
};

/***/ }),

/***/ "./js/components/icons.js":
/*!********************************!*\
  !*** ./js/components/icons.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "artifactImage": () => (/* binding */ artifactImage),
/* harmony export */   "icon": () => (/* binding */ icon)
/* harmony export */ });
var iconPaths = {
  'navigation-home': '<path d="M10 56h44M16 52V27l16-14 16 14v25M24 52V38h16v14M13 29h38M19 23h26" fill="none" stroke-width="4"/><path d="M27 21h10" stroke-width="3"/>',
  'navigation-timeline': '<circle cx="32" cy="32" r="22" fill="none" stroke-width="4"/><circle cx="32" cy="32" r="5" fill="currentColor"/><path d="M32 10v12M32 42v12M10 32h12M42 32h12M17 17l8 8M39 39l8 8M47 17l-8 8M25 39l-8 8" fill="none" stroke-width="3"/><path d="M32 32l12-9" fill="none" stroke-width="4"/>',
  'navigation-passport': '<path d="M15 8h34v48H15z" fill="none" stroke-width="4"/><path d="M22 17h20M22 25h20M22 45h12" fill="none" stroke-width="3"/><circle cx="39" cy="38" r="8" fill="none" stroke-width="3"/><path d="M31 38h16M39 30v16" fill="none" stroke-width="2"/>',
  'navigation-results': '<path d="M16 29q16-24 32 0-16 27-32 0z" fill="none" stroke-width="3"/><path d="M32 12v10M20 20l7 7M44 20l-7 7M21 43l-5 9M43 43l5 9M32 47v9" fill="none" stroke-width="4"/><path d="M27 31l4 4 8-10" fill="none" stroke-width="3"/>',
  'navigation-back': '<path d="M52 32H14M27 17L12 32l15 15" fill="none" stroke-width="6"/><path d="M39 17v30" fill="none" stroke-width="3"/>',
  'navigation-forward': '<path d="M12 32h38M37 17l15 15-15 15" fill="none" stroke-width="6"/><path d="M25 17v30" fill="none" stroke-width="3"/>',
  'status-locked': '<rect x="15" y="28" width="34" height="26" rx="3" fill="none" stroke-width="4"/><path d="M23 28V19a9 9 0 0 1 18 0v9" fill="none" stroke-width="4"/><circle cx="32" cy="40" r="3" fill="currentColor"/><path d="M32 43v7" fill="none" stroke-width="3"/>',
  'status-complete': '<circle cx="32" cy="32" r="23" fill="none" stroke-width="4"/><path d="M19 32l8 9 18-20" fill="none" stroke-width="5"/>',
  'status-current': '<circle cx="32" cy="32" r="20" fill="none" stroke-width="3"/><circle cx="32" cy="32" r="9" fill="currentColor"/>',
  'status-hint': '<path d="M22 42q-7-6-7-14a17 17 0 0 1 34 0q0 8-7 14l-2 6H24z" fill="none" stroke-width="4"/><path d="M25 55h14M27 48h10M32 4v6M9 17l7 4M55 17l-7 4" fill="none" stroke-width="3"/>',
  'status-time': '<path d="M22 8h20M22 56h20M22 8q0 13 10 18 10-5 10-18M22 56q0-13 10-18 10 5 10 18" fill="none" stroke-width="4"/><path d="M26 14h12M26 50h12" fill="none" stroke-width="3"/>',
  'status-score': '<circle cx="32" cy="32" r="23" fill="none" stroke-width="4"/><path d="M32 15l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="none" stroke-width="3"/>',
  'status-reward': '<circle cx="32" cy="28" r="17" fill="none" stroke-width="4"/><path d="M22 42l-5 16 15-8 15 8-5-16" fill="none" stroke-width="4"/><path d="M32 18l4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1z" fill="none" stroke-width="3"/>',
  'system-help': '<circle cx="32" cy="32" r="23" fill="none" stroke-width="4"/><path d="M24 25a8 8 0 1 1 12 7c-4 2-4 5-4 8M32 48v2" fill="none" stroke-width="4"/>'
};
var icon = function icon(name) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "<svg class=\"ui-icon ".concat(className, "\" viewBox=\"0 0 64 64\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\">").concat(iconPaths[name] || '', "</svg>");
};
var artifactImage = function artifactImage(name) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'artifact-icon';
  return "<img class=\"".concat(className, "\" src=\"./img/artifacts/").concat(name, ".svg\" alt=\"\" aria-hidden=\"true\">");
};

/***/ }),

/***/ "./js/components/question.js":
/*!***********************************!*\
  !*** ./js/components/question.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createQuestionComponent": () => (/* binding */ createQuestionComponent)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ "./js/components/icons.js");

var inputConfig = {
  integer: {
    inputmode: 'numeric',
    pattern: '[-+0-9 ]*',
    placeholder: 'Введите целое число…'
  },
  roman: {
    inputmode: 'text',
    pattern: '[MDCLXVImdclxvi ]*',
    placeholder: 'Например, DCCLIII'
  },
  binary: {
    inputmode: 'numeric',
    pattern: '[01 ₂]*',
    placeholder: 'Введите двоичное число…'
  },
  listOfIntegers: {
    inputmode: 'numeric',
    placeholder: 'Например: 1, 2, 3'
  },
  text: {
    inputmode: 'text',
    placeholder: 'Введите ответ…'
  }
};

var createInputControl = function createInputControl(question, initialValue) {
  if (question.type === 'singleChoice') {
    var fieldset = document.createElement('fieldset');
    fieldset.className = 'choice-list';
    fieldset.innerHTML = "<legend class=\"sr-only\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u043E\u0442\u0432\u0435\u0442</legend>".concat(question.options.map(function (option, index) {
      return "\n      <label class=\"choice-option\">\n        <input type=\"radio\" name=\"answer\" value=\"".concat(option.replace(/"/g, '&quot;'), "\" ").concat(option === initialValue ? 'checked' : '', ">\n        <span>").concat(option, "</span>\n      </label>");
    }).join(''));
    return fieldset;
  }

  var config = inputConfig[question.type] || inputConfig.text;
  var input = document.createElement('input');
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

var createQuestionComponent = function createQuestionComponent(_ref) {
  var container = _ref.container,
      question = _ref.question,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? '' : _ref$initialValue,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit,
      onHint = _ref.onHint;
  container.innerHTML = '';
  container.noValidate = true;
  var label = document.createElement('label');
  label.className = 'sr-only';
  label.htmlFor = 'answer';
  label.textContent = 'Ответ на задание';
  var control = createInputControl(question, initialValue);
  var submit = document.createElement('button');
  submit.className = 'primary-button';
  submit.type = 'submit';
  submit.innerHTML = "<span class=\"button-label\">\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0442\u0432\u0435\u0442</span>".concat((0,_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('navigation-forward'));
  var hintButton = document.createElement('button');
  hintButton.className = 'hint-button';
  hintButton.type = 'button';
  hintButton.setAttribute('aria-expanded', 'false');
  hintButton.setAttribute('aria-controls', 'hint');
  hintButton.innerHTML = "".concat((0,_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-hint'), " \u041D\u0443\u0436\u043D\u0430 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430?").concat((0,_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('navigation-forward', 'hint-toggle'));
  var help = document.createElement('p');
  help.id = 'answer-help';
  help.className = 'sr-only';
  help.textContent = 'После ввода активируйте кнопку проверки ответа.';
  var status = document.createElement('p');
  status.id = 'answer-status';
  status.className = 'answer-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  var hint = document.createElement('div');
  hint.id = 'hint';
  hint.className = 'hint';
  hint.tabIndex = -1;
  hint.hidden = true;
  container.append(label, control, submit, hintButton, help, status, hint);

  var getValue = function getValue() {
    if (question.type === 'singleChoice') {
      var _container$querySelec;

      return ((_container$querySelec = container.querySelector('input[name="answer"]:checked')) === null || _container$querySelec === void 0 ? void 0 : _container$querySelec.value) || '';
    }

    return control.value;
  };

  var changeEvent = question.type === 'singleChoice' ? 'change' : 'input';
  control.addEventListener(changeEvent, function () {
    return onChange(getValue());
  });
  container.addEventListener('submit', function (event) {
    event.preventDefault();
    onSubmit(getValue());
  });
  hintButton.addEventListener('click', function () {
    return onHint();
  });
  return {
    control: control,
    submit: submit,
    hintButton: hintButton,
    status: status,
    hint: hint,
    getValue: getValue
  };
};

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_focus_visible_dist_focus_visible__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/focus-visible/dist/focus-visible */ "../node_modules/focus-visible/dist/focus-visible.js");
/* harmony import */ var _node_modules_focus_visible_dist_focus_visible__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_focus_visible_dist_focus_visible__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");
/* harmony import */ var _docs_content_question_bank_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../docs/content/question-bank.json */ "../docs/content/question-bank.json");
/* harmony import */ var _components_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Navigation */ "./js/components/Navigation.js");
/* harmony import */ var _screens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./screens */ "./js/screens/index.js");
/* harmony import */ var _screens_stage_1__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./screens/stage-1 */ "./js/screens/stage-1.js");
/* harmony import */ var _screens_stage_2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./screens/stage-2 */ "./js/screens/stage-2.js");
/* harmony import */ var _screens_stage_3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./screens/stage-3 */ "./js/screens/stage-3.js");
/* harmony import */ var _screens_stage_4__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./screens/stage-4 */ "./js/screens/stage-4.js");
/* harmony import */ var _screens_stage_5__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./screens/stage-5 */ "./js/screens/stage-5.js");
/* harmony import */ var _screens_start__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./screens/start */ "./js/screens/start.js");
/* harmony import */ var _screens_era_map__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./screens/era-map */ "./js/screens/era-map.js");
/* harmony import */ var _screens_number_passport__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./screens/number-passport */ "./js/screens/number-passport.js");
/* harmony import */ var _screens_results__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./screens/results */ "./js/screens/results.js");
/* harmony import */ var _screens_briefing__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./screens/briefing */ "./js/screens/briefing.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./state */ "./js/state.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/icons */ "./js/components/icons.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


















var screenRoot = document.querySelector('#screen-root');
var timeline = document.querySelector('.timeline');
var stageNavigation = document.querySelector('.stage-navigation');
var score = document.querySelector('.score');
var scoreValue = document.querySelector('.score-value');
var appShell = document.querySelector('.app-shell');
var topbar = document.querySelector('.topbar');

var cleanupScreen = function cleanupScreen() {};

var timerInterval = null;
var viewNames = ['game', 'map', 'passport', 'results'];

var viewFromLocation = function viewFromLocation() {
  var requested = window.location.hash.replace('#', '');
  return viewNames.includes(requested) ? requested : 'game';
};

var currentView = viewFromLocation();

var sidebarLinks = _toConsumableArray(document.querySelectorAll('.sidebar__link'));

var showView = function showView(view) {
  var historyMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'push';
  if (!viewNames.includes(view)) return;
  currentView = view;
  var url = "".concat(window.location.pathname).concat(window.location.search, "#").concat(view);
  if (historyMode === 'replace') window.history.replaceState({
    view: view
  }, '', url);else if (window.location.hash !== "#".concat(view)) window.history.pushState({
    view: view
  }, '', url);
  renderApp();
};

var hydrateStaticIcons = function hydrateStaticIcons() {
  var replacements = [['.player__mark', 'status-reward', 'player__mark'], ['.score>span', 'status-score', 'score-icon'], ['.sidebar__link:nth-child(1)>span', 'navigation-home', 'sidebar-icon'], ['.sidebar__link:nth-child(2)>span', 'navigation-timeline', 'sidebar-icon'], ['.sidebar__link:nth-child(3)>span', 'navigation-passport', 'sidebar-icon'], ['.sidebar__link:nth-child(4)>span', 'navigation-results', 'sidebar-icon'], ['.question__icon', 'system-help', 'question__icon'], ['.timer>span', 'status-time', 'timer-icon'], ['.achievement .medal', 'status-reward', 'medal']];
  replacements.forEach(function (_ref) {
    var _document$querySelect;

    var _ref2 = _slicedToArray(_ref, 3),
        selector = _ref2[0],
        name = _ref2[1],
        className = _ref2[2];

    return (_document$querySelect = document.querySelector(selector)) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.replaceWith(document.createRange().createContextualFragment((0,_components_icons__WEBPACK_IMPORTED_MODULE_16__.icon)(name, className)));
  });
  document.querySelectorAll('.progress-card ol li.done').forEach(function (item) {
    item.innerHTML = "".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_16__.icon)('status-complete', 'progress-marker'), " ").concat(item.textContent.replace(/^✓\s*/, ''));
  });
};

var renderScore = function renderScore() {
  var value = (0,_state__WEBPACK_IMPORTED_MODULE_15__.getState)().score;
  scoreValue.textContent = value;
  score.setAttribute('aria-label', "".concat(value, " \u0431\u0430\u043B\u043B\u043E\u0432"));
};

var navigate = function navigate(stage) {
  var returningToGame = currentView !== 'game';
  var before = (0,_state__WEBPACK_IMPORTED_MODULE_15__.getState)().currentStage;
  (0,_state__WEBPACK_IMPORTED_MODULE_15__.setCurrentStage)(stage);

  if ((0,_state__WEBPACK_IMPORTED_MODULE_15__.getState)().currentStage !== before || stage === before) {
    if (returningToGame) showView('game');else renderApp();
  }
};

function renderApp() {
  cleanupScreen();

  cleanupScreen = function cleanupScreen() {};

  var state = (0,_state__WEBPACK_IMPORTED_MODULE_15__.getState)();
  document.querySelector('.player b').textContent = state.teamName || 'Хранители времени';

  if (!state.teamName) {
    topbar.hidden = true;
    appShell.classList.add('app-shell--welcome');
    (0,_screens_start__WEBPACK_IMPORTED_MODULE_10__.renderStartScreen)({
      root: screenRoot,
      onStart: function onStart(teamName) {
        (0,_state__WEBPACK_IMPORTED_MODULE_15__.registerTeam)(teamName);
        renderApp();
      }
    });
    return;
  }

  if (!state.hasStarted) {
    topbar.hidden = true;
    appShell.classList.add('app-shell--welcome');
    (0,_screens_briefing__WEBPACK_IMPORTED_MODULE_14__.renderBriefingScreen)({
      root: screenRoot,
      teamName: state.teamName,
      onStart: function onStart() {
        (0,_state__WEBPACK_IMPORTED_MODULE_15__.startGame)();
        showView('game', 'replace');
      }
    });
    return;
  }

  topbar.hidden = false;
  appShell.classList.remove('app-shell--welcome');
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_3__.renderTimeline)(_objectSpread(_objectSpread({
    container: timeline
  }, state), {}, {
    onNavigate: navigate
  }));
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_3__.renderStageControls)(_objectSpread(_objectSpread({
    container: stageNavigation
  }, state), {}, {
    onNavigate: navigate
  }));
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_3__.renderProgressPanel)(state);
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_3__.renderArtifactsPanel)(state);
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_3__.renderAchievementPanel)(state);
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_3__.renderTimerPanel)(state);
  if (timerInterval) window.clearInterval(timerInterval);
  timerInterval = window.setInterval(function () {
    return (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_3__.renderTimerPanel)((0,_state__WEBPACK_IMPORTED_MODULE_15__.getState)());
  }, 1000);
  renderScore();
  sidebarLinks.forEach(function (link) {
    var active = link.dataset.view === currentView;
    link.classList.toggle('sidebar__link--active', active);
    if (active) link.setAttribute('aria-current', 'page');else link.removeAttribute('aria-current');
  });

  if (currentView === 'map') {
    stageNavigation.hidden = true;
    (0,_screens_era_map__WEBPACK_IMPORTED_MODULE_11__.renderEraMap)({
      root: screenRoot,
      state: state,
      onNavigate: navigate
    });
    return;
  }

  if (currentView === 'passport') {
    stageNavigation.hidden = true;
    (0,_screens_number_passport__WEBPACK_IMPORTED_MODULE_12__.renderNumberPassport)({
      root: screenRoot,
      state: state
    });
    return;
  }

  if (currentView === 'results') {
    stageNavigation.hidden = true;
    (0,_screens_results__WEBPACK_IMPORTED_MODULE_13__.renderResultsPage)({
      root: screenRoot,
      state: state,
      questionBank: _docs_content_question_bank_json__WEBPACK_IMPORTED_MODULE_2__,
      onContinue: function onContinue() {
        return showView('game');
      },
      onStateChange: renderApp
    });
    return;
  }

  stageNavigation.hidden = false;
  var shared = {
    root: screenRoot,
    questionBank: _docs_content_question_bank_json__WEBPACK_IMPORTED_MODULE_2__,
    onStateChange: renderApp
  };
  if (state.currentStage === 1) (0,_screens_stage_1__WEBPACK_IMPORTED_MODULE_5__.renderStageOne)(shared);else if (state.currentStage === 2) (0,_screens_stage_2__WEBPACK_IMPORTED_MODULE_6__.renderStageTwo)(shared);else if (state.currentStage === 3) (0,_screens_stage_3__WEBPACK_IMPORTED_MODULE_7__.renderStageThree)(shared);else if (state.currentStage === 4) (0,_screens_stage_4__WEBPACK_IMPORTED_MODULE_8__.renderStageFour)(shared);else if (state.currentStage === 5) cleanupScreen = (0,_screens_stage_5__WEBPACK_IMPORTED_MODULE_9__.renderStageFive)(shared) || function () {};else if (state.currentStage === 6) (0,_screens_stage_5__WEBPACK_IMPORTED_MODULE_9__.renderFinalResults)(shared);else (0,_screens__WEBPACK_IMPORTED_MODULE_4__.renderPlaceholderScreen)({
    root: screenRoot,
    screenId: state.currentStage,
    unlockedStage: state.unlockedStage,
    score: state.score
  });
}

hydrateStaticIcons();
sidebarLinks.forEach(function (link) {
  return link.addEventListener('click', function (event) {
    event.preventDefault();
    showView(link.dataset.view);
  });
});
window.addEventListener('popstate', function () {
  var view = viewFromLocation();

  if (view !== currentView) {
    currentView = view;
    renderApp();
  }
});

if (!viewNames.includes(window.location.hash.replace('#', ''))) {
  window.history.replaceState({
    view: currentView
  }, '', "".concat(window.location.pathname).concat(window.location.search, "#").concat(currentView));
}

renderApp();

/***/ }),

/***/ "./js/screens/briefing.js":
/*!********************************!*\
  !*** ./js/screens/briefing.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderBriefingScreen": () => (/* binding */ renderBriefingScreen)
/* harmony export */ });
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");

var facts = [{
  mark: '60',
  title: 'Наследие Вавилона',
  text: 'Деление часа на 60 минут и круга на 360 градусов связано с шестидесятеричной системой.'
}, {
  mark: '0',
  title: 'Путь нуля',
  text: 'Ноль стал полноценным числом не сразу: его современная запись пришла в Европу через Индию и арабский мир.'
}, {
  mark: 'X',
  title: 'Римская запись',
  text: 'Римские числа удобны для надписей, но сложные письменные вычисления с ними выполнять трудно.'
}];

var escapeHtml = function escapeHtml(value) {
  return String(value !== null && value !== void 0 ? value : '').replace(/[&<>"']/g, function (_char) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[_char];
  });
};

var renderBriefingScreen = function renderBriefingScreen(_ref) {
  var _root$querySelector, _root$querySelector2;

  var root = _ref.root,
      teamName = _ref.teamName,
      onStart = _ref.onStart;
  var safeTeamName = escapeHtml(teamName);
  root.innerHTML = "<main class=\"briefing-screen\" aria-labelledby=\"briefing-title\"><section class=\"briefing-card\">\n    <header><div><p class=\"stage-kicker\">\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \xAB".concat(safeTeamName, "\xBB \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0430</p><h1 id=\"briefing-title\" tabindex=\"-1\">\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u0430\u0436 \u043F\u0435\u0440\u0435\u0434 \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u0435\u0439</h1><p>\u0412\u0430\u043C \u043F\u0440\u0435\u0434\u0441\u0442\u043E\u0438\u0442 \u043F\u0440\u043E\u0439\u0442\u0438 \u043F\u044F\u0442\u044C \u044D\u0442\u0430\u043F\u043E\u0432, \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C \u0441\u043F\u043E\u0441\u043E\u0431\u044B \u0437\u0430\u043F\u0438\u0441\u0438 \u0447\u0438\u0441\u0435\u043B \u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0435 \u044F\u0434\u0440\u043E.</p></div><span class=\"briefing-card__emblem\" aria-hidden=\"true\">").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('navigation-timeline'), "</span></header>\n    <section class=\"briefing-rules\" aria-labelledby=\"briefing-rules-title\"><h2 id=\"briefing-rules-title\">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F</h2><ol><li><strong>\u0418\u0441\u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435</strong><span>\u0427\u0438\u0442\u0430\u0439\u0442\u0435 \u0430\u0440\u0445\u0438\u0432\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0438 \u0441\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u0439\u0442\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0441\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F.</span></li><li><strong>\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0439\u0442\u0435</strong><span>\u041E\u0442\u0432\u0435\u0447\u0430\u0439\u0442\u0435 \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B. \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u0438 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 \u0432\u043B\u0438\u044F\u044E\u0442 \u043D\u0430 \u0431\u0430\u043B\u043B\u044B.</span></li><li><strong>\u0421\u043E\u0431\u0438\u0440\u0430\u0439\u0442\u0435</strong><span>\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043F\u044F\u0442\u044C \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u043E\u0432 \u0438 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0421\u043E\u0432\u0435\u0442\u0443 \u0432\u0440\u0435\u043C\u0435\u043D\u0438.</span></li></ol></section>\n    <section class=\"briefing-facts\" aria-labelledby=\"briefing-facts-title\"><div><p class=\"stage-kicker\">\u041F\u0435\u0440\u0435\u0434 \u0441\u0442\u0430\u0440\u0442\u043E\u043C</p><h2 id=\"briefing-facts-title\">\u0424\u0430\u043A\u0442\u044B \u043E\u0431 \u044D\u043F\u043E\u0445\u0430\u0445 \u0438 \u0447\u0438\u0441\u043B\u0430\u0445</h2></div><div class=\"briefing-facts__grid\">").concat(facts.map(function (fact) {
    return "<article><span aria-hidden=\"true\">".concat(fact.mark, "</span><div><h3>").concat(fact.title, "</h3><p>").concat(fact.text, "</p></div></article>");
  }).join(''), "</div></section>\n    <aside class=\"briefing-warning\" role=\"note\">").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-time'), "<div><strong>\u041D\u0430 \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u044E \u0434\u0430\u0451\u0442\u0441\u044F 90 \u043C\u0438\u043D\u0443\u0442</strong><p>\u041F\u043E\u0441\u043B\u0435 \u043D\u0430\u0436\u0430\u0442\u0438\u044F \u043A\u043D\u043E\u043F\u043A\u0438 \u043D\u0430\u0447\u043D\u0451\u0442\u0441\u044F \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u043E\u0442\u0441\u0447\u0451\u0442 \u0438 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0432\u044B\u0439 \u044D\u0442\u0430\u043F. \u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0442\u0430\u0439\u043C\u0435\u0440 \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F \u043D\u0435\u043B\u044C\u0437\u044F. \u0414\u043B\u044F \u0444\u0438\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u0437\u0430\u0449\u0438\u0442\u044B \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u0442\u0430\u0439\u043C\u0435\u0440 \u043D\u0430 90 \u0441\u0435\u043A\u0443\u043D\u0434.</p></div></aside>\n    <button class=\"primary-button briefing-start\" type=\"button\">\u041D\u0430\u0447\u0430\u0442\u044C \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u044E ").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('navigation-forward'), "</button>\n  </section></main>");
  (_root$querySelector = root.querySelector('.briefing-start')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.addEventListener('click', onStart);
  (_root$querySelector2 = root.querySelector('#briefing-title')) === null || _root$querySelector2 === void 0 ? void 0 : _root$querySelector2.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/era-map.js":
/*!*******************************!*\
  !*** ./js/screens/era-map.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderEraMap": () => (/* binding */ renderEraMap)
/* harmony export */ });
/* harmony import */ var _data_stages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/stages */ "./data/stages.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var artifacts = {
  1: ['researcher-hypothesis', 'scroll-researcher'],
  2: ['number-passport', 'papyrus-number'],
  3: ['translation-table', 'translation-tablet'],
  4: ['compatibility-card', 'compatibility-seal'],
  5: ['core-patch', 'time-core-key']
};
var renderEraMap = function renderEraMap(_ref) {
  var _root$querySelector;

  var root = _ref.root,
      state = _ref.state,
      onNavigate = _ref.onNavigate;
  var completed = Math.min(5, Math.max(0, state.unlockedStage - 1));
  root.innerHTML = "\n    <section class=\"quest-card era-map\" aria-labelledby=\"era-map-title\">\n      <header class=\"era-map__header\">\n        <div><p class=\"stage-kicker\">\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u0438</p><h1 id=\"era-map-title\" tabindex=\"-1\">\u041A\u0430\u0440\u0442\u0430 \u044D\u043F\u043E\u0445</h1><p class=\"eyebrow\">\u041F\u044F\u0442\u044C \u0438\u0441\u043F\u044B\u0442\u0430\u043D\u0438\u0439 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0430\u0440\u0445\u0438\u0432\u0430</p></div>\n        <div class=\"era-map__summary\" aria-label=\"\u041F\u0440\u043E\u0439\u0434\u0435\u043D\u043E ".concat(completed, " \u0438\u0437 5 \u044D\u0442\u0430\u043F\u043E\u0432\"><strong>").concat(completed, " / 5</strong><span>\u044D\u0442\u0430\u043F\u043E\u0432 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043E</span></div>\n      </header>\n      <div class=\"era-map__route\">\n        ").concat(_data_stages__WEBPACK_IMPORTED_MODULE_0__.stages.map(function (stage) {
    var locked = stage.id > state.unlockedStage;
    var complete = stage.id < state.unlockedStage;
    var current = stage.id === state.currentStage && !complete;

    var _artifacts$stage$id = _slicedToArray(artifacts[stage.id], 2),
        artifactId = _artifacts$stage$id[0],
        artifactIcon = _artifacts$stage$id[1];

    var collected = state.artifacts.includes(artifactId);
    var statusClass = complete ? 'is-complete' : current ? 'is-current' : locked ? 'is-locked' : 'is-open';
    var statusLabel = complete ? 'Пройден' : current ? 'Текущий этап' : locked ? 'Заблокирован' : 'Доступен';
    return "<article class=\"era-stop ".concat(statusClass, "\">\n            <div class=\"era-stop__marker\" aria-hidden=\"true\">").concat(complete ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-complete') : locked ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-locked') : stage.id, "</div>\n            <div class=\"era-stop__content\">\n              <div class=\"era-stop__meta\"><span>\u042D\u0442\u0430\u043F ").concat(stage.id, "</span><strong>").concat(statusLabel, "</strong></div>\n              <h2>").concat(stage.title, "</h2><p class=\"era-stop__subtitle\">").concat(stage.subtitle, "</p><p>").concat(stage.description, "</p>\n              <div class=\"era-stop__artifact ").concat(collected ? 'is-collected' : '', "\">").concat(collected ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.artifactImage)(artifactIcon) : (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-locked'), "<span><small>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u044D\u0442\u0430\u043F\u0430</small><b>").concat(stage.artifact, "</b></span></div>\n            </div>\n            <button type=\"button\" data-map-stage=\"").concat(stage.id, "\" ").concat(locked ? 'disabled' : '', ">").concat(locked ? 'Недоступно' : current ? 'Продолжить' : 'Открыть этап', " ").concat(locked ? '' : (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('navigation-forward'), "</button>\n          </article>");
  }).join(''), "\n      </div>\n    </section>");
  root.querySelectorAll('[data-map-stage]').forEach(function (button) {
    button.addEventListener('click', function () {
      return onNavigate(Number(button.dataset.mapStage));
    });
  });
  (_root$querySelector = root.querySelector('#era-map-title')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/index.js":
/*!*****************************!*\
  !*** ./js/screens/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderPlaceholderScreen": () => (/* binding */ renderPlaceholderScreen)
/* harmony export */ });
/* harmony import */ var _data_stages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/stages */ "./data/stages.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");


var renderPlaceholderScreen = function renderPlaceholderScreen(_ref) {
  var _root$querySelector;

  var root = _ref.root,
      screenId = _ref.screenId,
      unlockedStage = _ref.unlockedStage,
      score = _ref.score;
  var isResults = screenId === 6;
  var screen = isResults ? _data_stages__WEBPACK_IMPORTED_MODULE_0__.resultsScreen : _data_stages__WEBPACK_IMPORTED_MODULE_0__.stages.find(function (_ref2) {
    var id = _ref2.id;
    return id === screenId;
  });
  var locked = screenId > unlockedStage;
  root.innerHTML = "\n    <section class=\"quest-card stage-screen ".concat(isResults ? 'results-screen' : '', "\" aria-labelledby=\"quest-title\">\n      <header>\n        <p class=\"stage-kicker\">").concat(isResults ? 'Финальный экран' : "\u042D\u0442\u0430\u043F ".concat(screen.id), "</p>\n        <h1 id=\"quest-title\" tabindex=\"-1\">").concat(screen.title, "</h1>\n        <p class=\"eyebrow\">").concat(screen.subtitle, "</p>\n      </header>\n      <div class=\"stage-screen__intro\">\n        <span class=\"stage-screen__number\" aria-hidden=\"true\">").concat(isResults ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-reward') : String(screen.id).padStart(2, '0'), "</span>\n        <div><p>").concat(screen.description, "</p>").concat(!isResults ? "<p><strong>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u044D\u0442\u0430\u043F\u0430:</strong> ".concat(screen.artifact, "</p>") : "<p><strong>\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442:</strong> ".concat(score, " \u0438\u0437 100 \u0431\u0430\u043B\u043B\u043E\u0432</p>"), "</div>\n      </div>\n      <div class=\"stage-screen__notice ").concat(locked ? 'is-locked' : '', "\" role=\"status\">\n        <strong>").concat(locked ? 'Экран пока заблокирован' : 'Экран подготовлен', "</strong>\n        <p>").concat(locked ? 'Завершите обязательные задания предыдущего этапа.' : 'Интерактивные задания этого этапа будут подключены следующим промтом.', "</p>\n      </div>\n    </section>");
  (_root$querySelector = root.querySelector('#quest-title')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/number-passport.js":
/*!***************************************!*\
  !*** ./js/screens/number-passport.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderNumberPassport": () => (/* binding */ renderNumberPassport)
/* harmony export */ });
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var civilizations = [{
  id: 'egypt-01',
  name: 'Египет',
  system: 'Десятичная непозиционная',
  alphabet: 'Знаки степеней десяти',
  value: '222',
  rule: 'Значения повторяющихся знаков складываются.'
}, {
  id: 'babylon-01',
  name: 'Вавилон',
  system: 'Позиционная, основание 60',
  alphabet: 'Два клинописных знака',
  value: '125',
  rule: 'Значение знака зависит от его разряда.'
}, {
  id: 'rome-01',
  name: 'Рим',
  system: 'Буквенная непозиционная',
  alphabet: 'I, V, X, L, C, D, M',
  value: 'DCCLIII',
  rule: 'Меньший знак перед большим вычитается, после — складывается.'
}, {
  id: 'rus-01',
  name: 'Древняя Русь',
  system: 'Алфавитная непозиционная',
  alphabet: 'Кириллические буквы под титлом',
  value: 'ЦПИ (988)',
  rule: 'Буквы алфавита обозначают числовые значения.'
}];
var artifactDefinitions = [['researcher-hypothesis', 'scroll-researcher', 'Свиток исследователя'], ['number-passport', 'papyrus-number', 'Папирус числа'], ['translation-table', 'translation-tablet', 'Табличка переводов'], ['compatibility-card', 'compatibility-seal', 'Печать совместимости'], ['core-patch', 'time-core-key', 'Ключ временного ядра']];

var lock = function lock(message) {
  return "<div class=\"passport-lock\">".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-locked'), "<span>").concat(message, "</span></div>");
};

var verified = function verified() {
  return "<span class=\"passport-status\">".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-complete'), " \u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E</span>");
};

var renderNumberPassport = function renderNumberPassport(_ref) {
  var _root$querySelector;

  var root = _ref.root,
      state = _ref.state;

  var done = function done(id) {
    return state.completedQuestions.includes(id);
  };

  var romanReady = done('rome-01');
  var binaryReady = done('cross-01');
  var divisorsReady = done('cross-02');
  var comparisonReady = done('cross-03');
  var rangeReady = done('cross-04');
  var practicalReady = done('practical-01');
  var openSections = civilizations.filter(function (_ref2) {
    var id = _ref2.id;
    return done(id);
  }).length + Number(romanReady || binaryReady) + Number(divisorsReady || comparisonReady) + Number(rangeReady || practicalReady);
  root.innerHTML = "<section class=\"quest-card archive-passport\" aria-labelledby=\"archive-passport-title\">\n    <header class=\"archive-passport__header\"><div><p class=\"stage-kicker\">\u0410\u0440\u0445\u0438\u0432 \u043A\u043E\u043C\u0430\u043D\u0434\u044B</p><h1 id=\"archive-passport-title\" tabindex=\"-1\">\u041F\u0430\u0441\u043F\u043E\u0440\u0442 \u0447\u0438\u0441\u043B\u0430</h1><p class=\"eyebrow\">\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0438 \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F</p></div><div class=\"archive-passport__stamp\"><strong>".concat(openSections, " / 7</strong><span>\u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u043E\u0442\u043A\u0440\u044B\u0442\u043E</span></div></header>\n\n    <section class=\"passport-section\"><header><div><p class=\"stage-kicker\">\u0420\u0430\u0437\u0434\u0435\u043B 01</p><h2>\u0421\u0438\u0441\u0442\u0435\u043C\u044B \u0446\u0438\u0432\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u0439</h2></div><strong>").concat(civilizations.filter(function (_ref3) {
    var id = _ref3.id;
    return done(id);
  }).length, " / 4</strong></header><div class=\"passport-civilizations\">").concat(civilizations.map(function (item) {
    var ready = done(item.id);
    return "<article class=\"passport-civilization ".concat(ready ? 'is-ready' : 'is-locked', "\"><div class=\"passport-civilization__heading\"><span>").concat(ready ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-complete') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-locked'), "</span><div><h3>").concat(item.name, "</h3><small>").concat(ready ? item.system : 'Данные ещё не исследованы', "</small></div></div>").concat(ready ? "<dl><div><dt>\u0410\u043B\u0444\u0430\u0432\u0438\u0442</dt><dd>".concat(item.alphabet, "</dd></div><div><dt>\u041F\u0440\u0438\u043C\u0435\u0440</dt><dd>").concat(item.value, "</dd></div><div><dt>\u041F\u0440\u0430\u0432\u0438\u043B\u043E</dt><dd>").concat(item.rule, "</dd></div></dl>") : '<p>Выполните задание этой цивилизации на втором этапе.</p>', "</article>");
  }).join(''), "</div></section>\n\n    <section class=\"passport-section\"><header><div><p class=\"stage-kicker\">\u0420\u0430\u0437\u0434\u0435\u043B 02</p><h2>\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432 \u0447\u0438\u0441\u043B\u0430 753</h2></div>").concat(romanReady && binaryReady ? verified() : '', "</header>").concat(romanReady || binaryReady ? "<div class=\"passport-conversions\"><div><span>\u0414\u0435\u0441\u044F\u0442\u0438\u0447\u043D\u0430\u044F</span><strong>753\u2081\u2080</strong>".concat(verified(), "</div><div class=\"").concat(romanReady ? '' : 'is-locked', "\"><span>\u0420\u0438\u043C\u0441\u043A\u0430\u044F</span><strong>").concat(romanReady ? 'DCCLIII' : '—', "</strong>").concat(romanReady ? verified() : (0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-locked'), "</div><div class=\"").concat(binaryReady ? '' : 'is-locked', "\"><span>\u0414\u0432\u043E\u0438\u0447\u043D\u0430\u044F</span><strong>").concat(binaryReady ? '1011110001₂' : '—', "</strong>").concat(binaryReady ? verified() : (0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-locked'), "</div></div>") : lock('Переводы откроются после заданий третьего этапа.'), "</section>\n\n    <section class=\"passport-section\"><header><div><p class=\"stage-kicker\">\u0420\u0430\u0437\u0434\u0435\u043B 03</p><h2>\u0414\u0435\u043B\u0438\u0442\u0435\u043B\u0438 \u0438 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0435 60</h2></div>").concat(comparisonReady ? verified() : '', "</header>").concat(divisorsReady ? "<div class=\"passport-divisors\"><article><strong>60</strong><span>12 \u0434\u0435\u043B\u0438\u0442\u0435\u043B\u0435\u0439</span><p>1 \xB7 2 \xB7 3 \xB7 4 \xB7 5 \xB7 6 \xB7 10 \xB7 12 \xB7 15 \xB7 20 \xB7 30 \xB7 60</p></article><article class=\"".concat(comparisonReady ? '' : 'is-locked', "\"><strong>100</strong><span>").concat(comparisonReady ? '9 делителей' : 'Сравнение закрыто', "</span><p>").concat(comparisonReady ? '1 · 2 · 4 · 5 · 10 · 20 · 25 · 50 · 100' : 'Завершите сравнение на третьем этапе.', "</p></article></div>").concat(comparisonReady ? '<p class="passport-conclusion">60 имеет больше делителей, поэтому основание 60 удобно для времени, углов и дробных вычислений.</p>' : '') : lock('Список делителей откроется после соответствующего задания.'), "</section>\n\n    <section class=\"passport-section\"><header><div><p class=\"stage-kicker\">\u0420\u0430\u0437\u0434\u0435\u043B 04</p><h2>\u0420\u0430\u0437\u0440\u044F\u0434\u043D\u043E\u0441\u0442\u044C \u0438 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C</h2></div>").concat(rangeReady && practicalReady ? verified() : '', "</header>").concat(rangeReady || practicalReady ? "<div class=\"passport-compatibility\"><div><span>\u0427\u0438\u0441\u043B\u043E</span><strong>3600\u2081\u2080</strong></div><div class=\"".concat(practicalReady ? '' : 'is-locked', "\"><span>\u0414\u0432\u043E\u0438\u0447\u043D\u044B\u0439 \u043A\u043E\u0434</span><strong>").concat(practicalReady ? '111000010000₂' : '—', "</strong></div><div class=\"").concat(practicalReady ? '' : 'is-locked', "\"><span>\u041C\u0438\u043D\u0438\u043C\u0443\u043C</span><strong>").concat(practicalReady ? '12 бит' : '—', "</strong></div><div class=\"").concat(rangeReady ? '' : 'is-locked', "\"><span>\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D 8 \u0431\u0438\u0442</span><strong>").concat(rangeReady ? '0–255' : '—', "</strong></div><div class=\"").concat(rangeReady && practicalReady ? 'is-warning' : 'is-locked', "\"><span>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442</span><strong>").concat(rangeReady && practicalReady ? 'Не помещается' : '—', "</strong></div></div>") : lock('Проверки разрядности откроются после заданий четвёртого этапа.'), "</section>\n\n    <section class=\"passport-section passport-artifacts\"><header><div><p class=\"stage-kicker\">\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F</p><h2>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u0438</h2></div><strong>").concat(state.artifacts.length, " / ").concat(artifactDefinitions.length, "</strong></header><div>").concat(artifactDefinitions.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 3),
        id = _ref5[0],
        image = _ref5[1],
        title = _ref5[2];

    var collected = state.artifacts.includes(id);
    return "<article class=\"".concat(collected ? 'is-collected' : 'is-locked', "\">").concat(collected ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.artifactImage)(image) : (0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-locked'), "<span><strong>").concat(collected ? title : 'Неизвестный артефакт', "</strong><small>").concat(collected ? 'Добавлен в паспорт' : 'Завершите соответствующий этап', "</small></span></article>");
  }).join(''), "</div></section>\n  </section>");
  (_root$querySelector = root.querySelector('#archive-passport-title')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/results.js":
/*!*******************************!*\
  !*** ./js/screens/results.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderResultsPage": () => (/* binding */ renderResultsPage)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state */ "./js/state.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");
/* harmony import */ var _components_question__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/question */ "./js/components/question.js");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/validators */ "./js/utils/validators.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var artifacts = [['researcher-hypothesis', 'scroll-researcher', 'Свиток исследователя'], ['number-passport', 'papyrus-number', 'Папирус числа'], ['translation-table', 'translation-tablet', 'Табличка переводов'], ['compatibility-card', 'compatibility-seal', 'Печать совместимости'], ['core-patch', 'time-core-key', 'Ключ временного ядра']];

var escapeHtml = function escapeHtml(value) {
  return String(value !== null && value !== void 0 ? value : '').replace(/[&<>"']/g, function (_char) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[_char];
  });
};

var pointsLost = function pointsLost(state, question) {
  var attempts = state.attempts[question.id] || 0;
  var practical = question.id === 'practical-01';
  var attemptLoss = attempts === 2 ? practical ? 2 : 1 : attempts >= 3 ? practical ? 4 : 2 : 0;
  var hintLoss = state.openedHints.includes(question.id) ? practical ? 2 : 1 : 0;
  return Math.min(practical ? 4 : 2, attemptLoss + hintLoss);
};

var renderResultsPage = function renderResultsPage(_ref) {
  var _root$querySelector, _root$querySelector2, _root$querySelector3;

  var root = _ref.root,
      state = _ref.state,
      questionBank = _ref.questionBank,
      onContinue = _ref.onContinue,
      onStateChange = _ref.onStateChange;
  var attempts = Object.values(state.attempts).reduce(function (sum, value) {
    return sum + Number(value || 0);
  }, 0);
  var completedStages = Math.min(5, Math.max(state.artifacts.length, state.unlockedStage - 1));
  var finished = state.artifacts.length >= 5;
  var passed = finished && state.score >= 60;
  var status = passed ? 'Полный допуск получен' : finished ? 'Требуется восстановление' : 'Экспедиция продолжается';
  var recoverable = questionBank.questions.filter(function (question) {
    return state.completedQuestions.includes(question.id) && !state.recoveredQuestions.includes(question.id) && !['rubricText', 'rubricCase'].includes(question.type) && pointsLost(state, question) > 0;
  });
  root.innerHTML = "<section class=\"quest-card results-page\" aria-labelledby=\"results-title\">\n    <header class=\"results-page__header\"><div><p class=\"stage-kicker\">\u041B\u0438\u0447\u043D\u044B\u0439 \u0430\u0440\u0445\u0438\u0432</p><h1 id=\"results-title\" tabindex=\"-1\">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043A\u043E\u043C\u0430\u043D\u0434\u044B</h1><p class=\"eyebrow\">".concat(escapeHtml(state.teamName || 'Хранители времени'), "</p></div><div class=\"results-page__status ").concat(passed ? 'is-success' : '', "\">").concat(passed ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-reward') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)(finished ? 'status-hint' : 'status-time'), "<span><small>\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441</small><strong>").concat(status, "</strong></span></div></header>\n\n    <div class=\"result-metrics\"><article><span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-score'), "</span><strong>").concat(state.score, "<small> / 100</small></strong><p>\u0431\u0430\u043B\u043B\u043E\u0432</p></article><article><span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-complete'), "</span><strong>").concat(completedStages, "<small> / 5</small></strong><p>\u044D\u0442\u0430\u043F\u043E\u0432</p></article><article><span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('navigation-forward'), "</span><strong>").concat(attempts, "</strong><p>\u043F\u043E\u043F\u044B\u0442\u043E\u043A</p></article><article><span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-hint'), "</span><strong>").concat(state.openedHints.length, "</strong><p>\u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043E\u043A</p></article></div>\n\n    <section class=\"results-block\"><header><div><p class=\"stage-kicker\">\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F</p><h2>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B</h2></div><strong>").concat(state.artifacts.length, " / 5</strong></header><div class=\"results-artifacts\">").concat(artifacts.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 3),
        id = _ref3[0],
        image = _ref3[1],
        title = _ref3[2];

    var ready = state.artifacts.includes(id);
    return "<article class=\"".concat(ready ? 'is-earned' : 'is-locked', "\">").concat(ready ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.artifactImage)(image) : (0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-locked'), "<span><strong>").concat(ready ? title : 'Артефакт закрыт', "</strong><small>").concat(ready ? 'Получен' : 'Продолжайте экспедицию', "</small></span></article>");
  }).join(''), "</div></section>\n\n    <section class=\"results-block\"><header><div><p class=\"stage-kicker\">\u041D\u0430\u0433\u0440\u0430\u0434\u044B</p><h2>\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F</h2></div><strong>").concat(state.achievements.length, " / ").concat(_state__WEBPACK_IMPORTED_MODULE_0__.ACHIEVEMENT_DEFINITIONS.length, "</strong></header><div class=\"results-achievements\">").concat(_state__WEBPACK_IMPORTED_MODULE_0__.ACHIEVEMENT_DEFINITIONS.map(function (achievement) {
    var earned = state.achievements.includes(achievement.id);
    return "<article class=\"".concat(earned ? 'is-earned' : 'is-locked', "\">").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)(earned ? 'status-reward' : 'status-locked'), "<span><strong>").concat(achievement.title, "</strong><small>").concat(achievement.description, "</small></span></article>");
  }).join(''), "</div></section>\n\n    <section class=\"results-block recovery-overview\"><header><div><p class=\"stage-kicker\">\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430</p><h2>\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u0430\u043B\u043B\u043E\u0432</h2></div><strong>").concat(recoverable.length, "</strong></header>").concat(recoverable.length ? "<p>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u0435, \u0438\u0441\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0432\u0435\u0442 \u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u043D\u044B\u0435 \u0431\u0430\u043B\u043B\u044B.</p><div>".concat(recoverable.map(function (question) {
    return "<button type=\"button\" data-recover-id=\"".concat(question.id, "\"><span><strong>").concat(question.prompt, "</strong><small>\u041C\u043E\u0436\u043D\u043E \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0431\u0430\u043B\u043B\u043E\u0432: ").concat(pointsLost(state, question), "</small></span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('navigation-forward'), "</button>");
  }).join(''), "</div><form class=\"answer-form results-recovery-form\" hidden></form>") : "<div class=\"results-empty\">".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('status-complete'), "<span><strong>\u0417\u0430\u0434\u0430\u043D\u0438\u0439 \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043D\u0435\u0442</strong><small>").concat(finished ? 'Все доступные баллы уже учтены.' : 'Они появятся здесь после прохождения заданий с подсказками или повторными попытками.', "</small></span></div>"), "</section>\n\n    <article class=\"print-card results-print-card\"><header><div><p>\u041D\u0418\u0418 \u0412\u0440\u0435\u043C\u0435\u043D\u0438 \xB7 \u043E\u0442\u0447\u0451\u0442 \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u0438</p><h2>\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u044B</h2></div><strong>\xAB").concat(escapeHtml(state.teamName || 'Хранители времени'), "\xBB</strong></header><section><h3>\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u0441\u0442\u0430\u0442\u0443\u0441</h3><p>").concat(status, "</p></section><section><h3>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B</h3><p>\u0411\u0430\u043B\u043B\u044B: ").concat(state.score, " \u0438\u0437 100 \xB7 \u042D\u0442\u0430\u043F\u044B: ").concat(completedStages, " \u0438\u0437 5 \xB7 \u041F\u043E\u043F\u044B\u0442\u043A\u0438: ").concat(attempts, " \xB7 \u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438: ").concat(state.openedHints.length, "</p></section><section><h3>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B</h3><p>").concat(artifacts.filter(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 1),
        id = _ref5[0];

    return state.artifacts.includes(id);
  }).map(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 3),
        title = _ref7[2];

    return title;
  }).join(' · ') || 'Пока не собраны', "</p></section><section><h3>\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F</h3><p>").concat(_state__WEBPACK_IMPORTED_MODULE_0__.ACHIEVEMENT_DEFINITIONS.filter(function (_ref8) {
    var id = _ref8.id;
    return state.achievements.includes(id);
  }).map(function (_ref9) {
    var title = _ref9.title;
    return title;
  }).join(' · ') || 'Пока не открыты', "</p></section><footer><span>\u042D\u0442\u0430\u043F\u043E\u0432 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043E: ").concat(completedStages, " \u0438\u0437 5</span><strong>").concat(state.score, " / 100</strong></footer></article>\n\n    <div class=\"results-page__actions\"><button class=\"stage-nav-button results-continue\" type=\"button\">").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('navigation-back'), " \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0438\u0433\u0440\u0443</button><button class=\"primary-button results-print\" type=\"button\">").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_1__.icon)('navigation-passport'), " \u0420\u0430\u0441\u043F\u0435\u0447\u0430\u0442\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443</button></div>\n  </section>");
  (_root$querySelector = root.querySelector('.results-continue')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.addEventListener('click', onContinue);
  (_root$querySelector2 = root.querySelector('.results-print')) === null || _root$querySelector2 === void 0 ? void 0 : _root$querySelector2.addEventListener('click', function () {
    return window.print();
  });
  root.querySelectorAll('[data-recover-id]').forEach(function (button) {
    return button.addEventListener('click', function () {
      var _ui$control;

      var question = questionBank.questions.find(function (_ref10) {
        var id = _ref10.id;
        return id === button.dataset.recoverId;
      });
      var form = root.querySelector('.results-recovery-form');
      form.hidden = false;
      var ui;
      ui = (0,_components_question__WEBPACK_IMPORTED_MODULE_2__.createQuestionComponent)({
        container: form,
        question: question,
        initialValue: '',
        onChange: function onChange() {},
        onHint: function onHint() {},
        onSubmit: function onSubmit(value) {
          var result = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_3__.validateAnswer)(question, value);

          if (result.valid && result.correct) {
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.recoverQuestion)(question);
            onStateChange();
            return;
          }

          form.dataset.state = 'error';
          ui.status.textContent = result.valid ? 'Ответ неверный — попробуйте ещё раз.' : result.message;
        }
      });
      ui.hintButton.hidden = true;
      ui.status.textContent = "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435: ".concat(question.prompt);
      (_ui$control = ui.control) === null || _ui$control === void 0 ? void 0 : _ui$control.focus();
    });
  });
  (_root$querySelector3 = root.querySelector('#results-title')) === null || _root$querySelector3 === void 0 ? void 0 : _root$querySelector3.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/stage-1.js":
/*!*******************************!*\
  !*** ./js/screens/stage-1.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderStageOne": () => (/* binding */ renderStageOne)
/* harmony export */ });
/* harmony import */ var _components_question__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/question */ "./js/components/question.js");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validators */ "./js/utils/validators.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "./js/state.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");




var CHOICE_ID = 'rome-02';
var HYPOTHESIS_ID = 'final-01';
var ARTIFACT_ID = 'researcher-hypothesis';

var validateHypothesis = function validateHypothesis(value) {
  var text = String(value || '').trim().toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
  if (text.length < 30) return {
    valid: false,
    message: 'Сформулируйте развёрнутую гипотезу длиной не менее 30 символов.'
  };
  var concepts = [/(счет|считать|измер)/, /(знак|символ|инструмент|материал)/, /(удоб|вычисл|расчет|задач)/].filter(function (pattern) {
    return pattern.test(text);
  }).length;
  return concepts >= 2 ? {
    valid: true,
    message: ''
  } : {
    valid: false,
    message: 'Свяжите гипотезу хотя бы с двумя идеями: задачи счёта или измерения, доступные знаки и удобство вычислений.'
  };
};

var renderStageOne = function renderStageOne(_ref) {
  var _root$querySelector;

  var root = _ref.root,
      questionBank = _ref.questionBank,
      onStateChange = _ref.onStateChange;
  var choiceQuestion = questionBank.questions.find(function (_ref2) {
    var id = _ref2.id;
    return id === CHOICE_ID;
  });
  var hypothesisQuestion = questionBank.questions.find(function (_ref3) {
    var id = _ref3.id;
    return id === HYPOTHESIS_ID;
  });
  var state = (0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)();
  root.innerHTML = "\n    <section class=\"quest-card stage-one\" aria-labelledby=\"quest-title\">\n      <header><p class=\"stage-kicker\">\u042D\u0442\u0430\u043F 1</p><h1 id=\"quest-title\" tabindex=\"-1\">\u0412\u0437\u043B\u043E\u043C \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430</h1><p class=\"eyebrow\">\u041D\u0430\u0445\u043E\u0434\u0438\u043C \u043E\u0448\u0438\u0431\u043A\u0443 \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u043E\u043C \u0448\u0438\u0444\u0440\u0435</p></header>\n      <div class=\"stage-rules\" aria-labelledby=\"rules-title\"><h2 id=\"rules-title\">\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u0438</h2><ol><li>\u0418\u0437\u0443\u0447\u0430\u0439\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u044C \u0438 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B.</li><li>\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0439\u0442\u0435 \u043E\u0442\u0432\u0435\u0442 \u044F\u0432\u043D\u043E \u2014 \u043F\u0443\u0441\u0442\u043E\u0439 \u043E\u0442\u0432\u0435\u0442 \u043D\u0435 \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u043E\u0439.</li><li>\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442, \u043D\u043E \u0443\u043C\u0435\u043D\u044C\u0448\u0430\u0435\u0442 \u043D\u0430\u0433\u0440\u0430\u0434\u0443 \u043D\u0430 \u043E\u0434\u0438\u043D \u0431\u0430\u043B\u043B.</li></ol></div>\n      <section class=\"protocol-card\" aria-labelledby=\"protocol-title\"><div><p class=\"protocol-card__label\">\u041F\u043E\u0432\u0440\u0435\u0436\u0434\u0451\u043D\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430</p><h2 id=\"protocol-title\">\u0427\u0438\u0441\u043B\u043E 99 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u043A\u0430\u043A <strong>IC</strong></h2><p>\u0410\u0440\u0445\u0438\u0432 \u0441\u043E\u043E\u0431\u0449\u0430\u0435\u0442, \u0447\u0442\u043E \u043E\u0434\u043D\u043E \u0438\u0437 \u043F\u0440\u0430\u0432\u0438\u043B \u0440\u0438\u043C\u0441\u043A\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u043E. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C.</p></div><div class=\"protocol-code\" aria-label=\"\u041E\u0448\u0438\u0431\u043E\u0447\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C: I C\"><span>I</span><span>C</span><i aria-hidden=\"true\">!</i></div></section>\n      <section class=\"stage-task\" aria-labelledby=\"violation-title\"><div class=\"stage-task__heading\"><span>01</span><div><h2 id=\"violation-title\">\u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0435</h2><p>".concat(choiceQuestion.prompt, "</p></div></div><form class=\"answer-form stage-one__choice\"></form></section>\n      <section class=\"stage-task\" aria-labelledby=\"hypothesis-title\"><div class=\"stage-task__heading\"><span>02</span><div><h2 id=\"hypothesis-title\">\u0413\u0438\u043F\u043E\u0442\u0435\u0437\u0430 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044F</h2><p>").concat(hypothesisQuestion.prompt, "</p></div></div><form class=\"hypothesis-form\" novalidate><label for=\"hypothesis\">\u0412\u0430\u0448\u0430 \u0433\u0438\u043F\u043E\u0442\u0435\u0437\u0430</label><textarea id=\"hypothesis\" rows=\"4\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0437\u0430\u043F\u0438\u0441\u0438 \u0440\u0430\u0437\u043B\u0438\u0447\u0430\u043B\u0438\u0441\u044C, \u043F\u043E\u0442\u043E\u043C\u0443 \u0447\u0442\u043E\u2026\" aria-describedby=\"hypothesis-help hypothesis-status\"></textarea><p id=\"hypothesis-help\">\u0423\u043F\u043E\u043C\u044F\u043D\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u043B\u044E\u0434\u0435\u0439, \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0437\u043D\u0430\u043A\u0438 \u0438\u043B\u0438 \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u043E \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0439.</p><button class=\"primary-button\" type=\"submit\"><span class=\"button-label\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0433\u0438\u043F\u043E\u0442\u0435\u0437\u0443</span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('navigation-forward'), "</button><p id=\"hypothesis-status\" class=\"answer-status\" role=\"status\" aria-live=\"polite\"></p></form></section>\n      <section class=\"stage-artifact ").concat(state.artifacts.includes(ARTIFACT_ID) ? 'is-unlocked' : '', "\" aria-live=\"polite\"><span class=\"stage-artifact__icon\" aria-hidden=\"true\">").concat(state.artifacts.includes(ARTIFACT_ID) ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.artifactImage)('scroll-researcher') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-locked'), "</span><div><p>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u044D\u0442\u0430\u043F\u0430</p><h2>\u0421\u0432\u0438\u0442\u043E\u043A \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044F</h2><span>").concat(state.artifacts.includes(ARTIFACT_ID) ? 'Получен — этап 2 открыт' : 'Выполните оба задания, чтобы сохранить артефакт', "</span></div></section>\n    </section>");
  var choiceUi;
  var choiceForm = root.querySelector('.stage-one__choice');

  var setChoiceState = function setChoiceState(name, message) {
    var _choiceForm$querySele;

    choiceForm.dataset.state = name;
    choiceUi.status.textContent = message;
    (_choiceForm$querySele = choiceForm.querySelector('input')) === null || _choiceForm$querySele === void 0 ? void 0 : _choiceForm$querySele.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false');
  };

  var showChoiceHint = function showChoiceHint() {
    choiceUi.hint.innerHTML = "<strong>\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430:</strong> ".concat(choiceQuestion.hint);
    choiceUi.hint.hidden = false;
    choiceUi.hintButton.setAttribute('aria-expanded', 'true');
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.openHint)(CHOICE_ID);
  };

  choiceUi = (0,_components_question__WEBPACK_IMPORTED_MODULE_0__.createQuestionComponent)({
    container: choiceForm,
    question: choiceQuestion,
    initialValue: state.answers[CHOICE_ID] || '',
    onChange: function onChange(value) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(CHOICE_ID, value);
      if (choiceForm.dataset.state !== 'success') setChoiceState('', '');
    },
    onHint: function onHint() {
      var opening = choiceUi.hint.hidden;
      choiceUi.hint.hidden = !opening;
      choiceUi.hintButton.setAttribute('aria-expanded', String(opening));
      if (opening) showChoiceHint();
    },
    onSubmit: function onSubmit(value) {
      var result = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_1__.validateAnswer)(choiceQuestion, value);

      if (!result.valid) {
        setChoiceState('error', result.message);
        return;
      }

      (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(CHOICE_ID, value);
      var attempt = (0,_state__WEBPACK_IMPORTED_MODULE_2__.registerAttempt)(CHOICE_ID);

      if (result.correct) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.completeQuestion)(choiceQuestion);
        setChoiceState('success', "\u0412\u0435\u0440\u043D\u043E! ".concat(choiceQuestion.errorExplanation));
        choiceUi.submit.querySelector('.button-label').textContent = 'Нарушение найдено';
        finishStageIfReady();
      } else {
        if (attempt === 1) showChoiceHint();
        setChoiceState('error', attempt >= 2 ? choiceQuestion.errorExplanation : 'Ответ неверный. Открыта подсказка.');
      }
    }
  });
  if (state.openedHints.includes(CHOICE_ID)) showChoiceHint();

  if (state.completedQuestions.includes(CHOICE_ID)) {
    setChoiceState('success', 'Нарушение найдено, ответ сохранён.');
    choiceUi.submit.querySelector('.button-label').textContent = 'Нарушение найдено';
  }

  var hypothesisForm = root.querySelector('.hypothesis-form');
  var hypothesis = root.querySelector('#hypothesis');
  var hypothesisStatus = root.querySelector('#hypothesis-status');
  var hypothesisButton = hypothesisForm.querySelector('button');
  hypothesis.value = state.answers[HYPOTHESIS_ID] || '';
  hypothesis.addEventListener('input', function () {
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(HYPOTHESIS_ID, hypothesis.value);
    hypothesisStatus.textContent = '';
    hypothesis.removeAttribute('aria-invalid');
  });
  hypothesisForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var result = validateHypothesis(hypothesis.value);

    if (!result.valid) {
      hypothesis.setAttribute('aria-invalid', 'true');
      hypothesisStatus.textContent = result.message;
      hypothesis.focus();
      return;
    }

    (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(HYPOTHESIS_ID, hypothesis.value);
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.registerAttempt)(HYPOTHESIS_ID);
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.completeQuestion)(hypothesisQuestion);
    hypothesisStatus.textContent = 'Гипотеза принята и сохранена в архиве.';
    hypothesisButton.querySelector('.button-label').textContent = 'Гипотеза сохранена';
    finishStageIfReady();
  });

  if (state.completedQuestions.includes(HYPOTHESIS_ID)) {
    hypothesisStatus.textContent = 'Гипотеза принята и сохранена в архиве.';
    hypothesisButton.querySelector('.button-label').textContent = 'Гипотеза сохранена';
  }

  function finishStageIfReady() {
    var latest = (0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)();

    if ([CHOICE_ID, HYPOTHESIS_ID].every(function (id) {
      return latest.completedQuestions.includes(id);
    })) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.addArtifact)(ARTIFACT_ID);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.unlockStage)(2);
      onStateChange();
    } else {
      onStateChange({
        preserveScreen: true
      });
    }
  }

  (_root$querySelector = root.querySelector('#quest-title')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/stage-2.js":
/*!*******************************!*\
  !*** ./js/screens/stage-2.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderStageTwo": () => (/* binding */ renderStageTwo)
/* harmony export */ });
/* harmony import */ var _img_egypt_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../img/egypt.png */ "./img/egypt.png");
/* harmony import */ var _img_babylon_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../img/babylon.png */ "./img/babylon.png");
/* harmony import */ var _img_rome_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../img/rome.png */ "./img/rome.png");
/* harmony import */ var _img_ancient_rus_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../img/ancient-rus.png */ "./img/ancient-rus.png");
/* harmony import */ var _components_question__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/question */ "./js/components/question.js");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/validators */ "./js/utils/validators.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state */ "./js/state.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");








var ARTIFACT_ID = 'number-passport';
var civilizations = [{
  id: 'egypt-01',
  key: 'egypt',
  name: 'Египет',
  period: 'ок. 3000–30 гг. до н. э.',
  image: _img_egypt_png__WEBPACK_IMPORTED_MODULE_0__,
  mark: '𓍢𓍢 𓎆𓎆 𓏺𓏺',
  system: 'Десятичная непозиционная',
  alphabet: 'Рисуночные знаки степеней десяти',
  example: '222',
  reason: 'Учёт урожая, налогов и строительства'
}, {
  id: 'babylon-01',
  key: 'babylon',
  name: 'Вавилон',
  period: 'ок. 1800–500 гг. до н. э.',
  image: _img_babylon_png__WEBPACK_IMPORTED_MODULE_1__,
  mark: '2,5₆₀',
  system: 'Позиционная, основание 60',
  alphabet: 'Два клинописных знака',
  example: '125',
  reason: 'Астрономия, время и торговые расчёты'
}, {
  id: 'rome-01',
  key: 'rome',
  name: 'Рим',
  period: '753 г. до н. э. — 476 г.',
  image: _img_rome_png__WEBPACK_IMPORTED_MODULE_2__,
  mark: 'DCCLIII',
  system: 'Буквенная непозиционная',
  alphabet: 'I, V, X, L, C, D, M',
  example: '753',
  reason: 'Учёт, памятные надписи и торговля'
}, {
  id: 'rus-01',
  key: 'rus',
  name: 'Древняя Русь',
  period: 'IX–XVII века',
  image: _img_ancient_rus_png__WEBPACK_IMPORTED_MODULE_3__,
  mark: 'ЦПИ',
  system: 'Алфавитная непозиционная',
  alphabet: 'Кириллические буквы под титлом',
  example: '988',
  reason: 'Летописи, даты и церковные книги'
}];
var renderStageTwo = function renderStageTwo(_ref) {
  var _state$activeQuestion, _root$querySelector;

  var root = _ref.root,
      questionBank = _ref.questionBank,
      onStateChange = _ref.onStateChange;
  var state = (0,_state__WEBPACK_IMPORTED_MODULE_6__.getState)();
  var requiredIds = civilizations.map(function (_ref2) {
    var id = _ref2.id;
    return id;
  });
  var firstIncomplete = requiredIds.find(function (id) {
    return !state.completedQuestions.includes(id);
  });
  var requested = (_state$activeQuestion = state.activeQuestionByStage) === null || _state$activeQuestion === void 0 ? void 0 : _state$activeQuestion[2];
  var activeId = requiredIds.includes(requested) ? requested : firstIncomplete || requiredIds[0];
  var activeCivilization = civilizations.find(function (_ref3) {
    var id = _ref3.id;
    return id === activeId;
  });
  var question = questionBank.questions.find(function (_ref4) {
    var id = _ref4.id;
    return id === activeId;
  });
  var completedCount = requiredIds.filter(function (id) {
    return state.completedQuestions.includes(id);
  }).length;
  var artifactUnlocked = state.artifacts.includes(ARTIFACT_ID);
  root.innerHTML = "\n    <section class=\"quest-card stage-two\" aria-labelledby=\"quest-title\">\n      <header><p class=\"stage-kicker\">\u042D\u0442\u0430\u043F 2</p><h1 id=\"quest-title\" tabindex=\"-1\">\u0410\u0440\u0445\u0438\u0432 \u041D\u0418\u0418 \u0412\u0440\u0435\u043C\u0435\u043D\u0438</h1><p class=\"eyebrow\">\u0421\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u0435\u043C \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0447\u0438\u0441\u0435\u043B</p></header>\n      <p class=\"intro\">\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0447\u0435\u0442\u044B\u0440\u0435 \u0430\u0440\u0445\u0438\u0432\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438, \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u0438 \u0441\u043E\u0431\u0435\u0440\u0438\u0442\u0435 \xAB\u041F\u0430\u0441\u043F\u043E\u0440\u0442 \u0447\u0438\u0441\u043B\u0430\xBB.</p>\n      <div class=\"civilization-tabs\" role=\"tablist\" aria-label=\"\u0426\u0438\u0432\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u0438\">".concat(civilizations.map(function (civilization) {
    var complete = state.completedQuestions.includes(civilization.id);
    var active = civilization.id === activeId;
    return "<button class=\"civilization-tab ".concat(active ? 'is-active' : '', " ").concat(complete ? 'is-complete' : '', "\" type=\"button\" role=\"tab\" aria-selected=\"").concat(active, "\" data-question=\"").concat(civilization.id, "\"><img src=\"").concat(civilization.image, "\" alt=\"\" aria-hidden=\"true\"><span class=\"civilization-tab__status\" aria-hidden=\"true\">").concat(complete ? '✓' : civilization.mark, "</span><strong>").concat(civilization.name, "</strong><small>").concat(civilization.period, "</small></button>");
  }).join(''), "</div>\n      <section class=\"archive-question\" aria-labelledby=\"archive-question-title\"><div class=\"archive-question__visual\" style=\"--archive-image:url('").concat(activeCivilization.image, "')\"><span>").concat(activeCivilization.mark, "</span><small>").concat(activeCivilization.system, "</small></div><div class=\"archive-question__body\"><p class=\"archive-question__counter\">\u0417\u0430\u0434\u0430\u043D\u0438\u0435 ").concat(completedCount + (state.completedQuestions.includes(activeId) ? 0 : 1), " \u0438\u0437 4</p><h2 id=\"archive-question-title\">").concat(question.prompt, "</h2><form class=\"answer-form stage-two__form\"></form></div></section>\n      <section class=\"number-passport\" aria-labelledby=\"passport-title\"><header><div><p class=\"stage-kicker\">\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u0437\u0430\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438</p><h2 id=\"passport-title\">\u041F\u0430\u0441\u043F\u043E\u0440\u0442 \u0447\u0438\u0441\u043B\u0430</h2></div><strong>").concat(completedCount, " / 4</strong></header><div class=\"passport-table\" role=\"table\" aria-label=\"\u041F\u0430\u0441\u043F\u043E\u0440\u0442 \u0447\u0438\u0441\u043B\u0430\"><div class=\"passport-row passport-row--header\" role=\"row\"><span>\u0426\u0438\u0432\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u044F</span><span>\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0438 \u0430\u043B\u0444\u0430\u0432\u0438\u0442</span><span>\u0427\u0438\u0441\u043B\u043E</span><span>\u0418\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430</span></div>").concat(civilizations.map(function (civilization) {
    var complete = state.completedQuestions.includes(civilization.id);
    return "<div class=\"passport-row ".concat(complete ? 'is-filled' : 'is-locked', "\" role=\"row\"><strong>").concat(civilization.name, "</strong><span>").concat(complete ? "".concat(civilization.system, "<small>").concat(civilization.alphabet, "</small>") : 'Закрыто', "</span><b>").concat(complete ? civilization.example : '—', "</b><span>").concat(complete ? civilization.reason : 'Выполните задание цивилизации', "</span></div>");
  }).join(''), "</div></section>\n      <section class=\"stage-artifact ").concat(artifactUnlocked ? 'is-unlocked' : '', "\" aria-live=\"polite\"><span class=\"stage-artifact__icon\" aria-hidden=\"true\">").concat(artifactUnlocked ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_7__.artifactImage)('papyrus-number') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_7__.icon)('status-locked'), "</span><div><p>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u044D\u0442\u0430\u043F\u0430</p><h2>\u041F\u0430\u043F\u0438\u0440\u0443\u0441 \u0447\u0438\u0441\u043B\u0430</h2><span>").concat(artifactUnlocked ? 'Заполнен — этап 3 открыт' : "\u0417\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432: ".concat(completedCount, " \u0438\u0437 4"), "</span></div></section>\n    </section>");
  root.querySelectorAll('.civilization-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_6__.setActiveQuestion)(2, tab.dataset.question);
      onStateChange();
    });
  });
  var ui;
  var form = root.querySelector('.stage-two__form');

  var target = function target() {
    return question.type === 'singleChoice' ? form.querySelector('input[name="answer"]') : ui.control;
  };

  var setState = function setState(name, message) {
    var _target;

    form.dataset.state = name;
    ui.status.textContent = message;
    (_target = target()) === null || _target === void 0 ? void 0 : _target.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false');
  };

  var showHint = function showHint() {
    var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    ui.hint.innerHTML = "<strong>\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430:</strong> ".concat(question.hint);
    ui.hint.hidden = false;
    ui.hintButton.setAttribute('aria-expanded', 'true');
    if (save) (0,_state__WEBPACK_IMPORTED_MODULE_6__.openHint)(activeId);
  };

  ui = (0,_components_question__WEBPACK_IMPORTED_MODULE_4__.createQuestionComponent)({
    container: form,
    question: question,
    initialValue: state.answers[activeId] || '',
    onChange: function onChange(value) {
      (0,_state__WEBPACK_IMPORTED_MODULE_6__.updateAnswer)(activeId, value);
      if (form.dataset.state !== 'success') setState('', '');
    },
    onHint: function onHint() {
      var opening = ui.hint.hidden;
      ui.hint.hidden = !opening;
      ui.hintButton.setAttribute('aria-expanded', String(opening));

      if (opening) {
        showHint();
        ui.hint.focus({
          preventScroll: true
        });
      }
    },
    onSubmit: function onSubmit(value) {
      var result = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_5__.validateAnswer)(question, value);

      if (!result.valid) {
        var _target2;

        setState('error', "\u041E\u0448\u0438\u0431\u043A\u0430 \u0444\u043E\u0440\u043C\u0430\u0442\u0430: ".concat(result.message));
        (_target2 = target()) === null || _target2 === void 0 ? void 0 : _target2.focus();
        return;
      }

      (0,_state__WEBPACK_IMPORTED_MODULE_6__.updateAnswer)(activeId, value);
      var attempt = (0,_state__WEBPACK_IMPORTED_MODULE_6__.registerAttempt)(activeId);
      var label = ui.submit.querySelector('.button-label');
      ui.submit.disabled = true;
      ui.submit.classList.add('is-loading');
      label.textContent = 'Проверяем';
      ui.status.textContent = 'Проверяем ответ…';
      window.setTimeout(function () {
        if (result.correct) {
          (0,_state__WEBPACK_IMPORTED_MODULE_6__.completeQuestion)(question);
          var latest = (0,_state__WEBPACK_IMPORTED_MODULE_6__.getState)();
          var allComplete = requiredIds.every(function (id) {
            return latest.completedQuestions.includes(id);
          });

          if (allComplete) {
            (0,_state__WEBPACK_IMPORTED_MODULE_6__.addArtifact)(ARTIFACT_ID);
            (0,_state__WEBPACK_IMPORTED_MODULE_6__.unlockStage)(3);
          } else {
            var next = requiredIds.find(function (id) {
              return !latest.completedQuestions.includes(id);
            });
            if (next) (0,_state__WEBPACK_IMPORTED_MODULE_6__.setActiveQuestion)(2, next);
          }

          onStateChange();
        } else {
          var _target3;

          if (attempt === 1) showHint();
          setState('error', attempt >= 2 ? "\u041E\u0442\u0432\u0435\u0442 \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439. ".concat(question.errorExplanation) : 'Ответ неверный. Открыта подсказка — попробуйте снова.');
          label.textContent = 'Проверить снова';
          ui.submit.disabled = false;
          ui.submit.classList.remove('is-loading');
          (_target3 = target()) === null || _target3 === void 0 ? void 0 : _target3.focus();
        }
      }, 450);
    }
  });
  if (state.openedHints.includes(activeId)) showHint(false);

  if (state.completedQuestions.includes(activeId)) {
    setState('success', "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E. ".concat(question.errorExplanation));
    ui.submit.querySelector('.button-label').textContent = 'Ответ принят';
  }

  (_root$querySelector = root.querySelector('#quest-title')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/stage-3.js":
/*!*******************************!*\
  !*** ./js/screens/stage-3.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderStageThree": () => (/* binding */ renderStageThree)
/* harmony export */ });
/* harmony import */ var _components_question__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/question */ "./js/components/question.js");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validators */ "./js/utils/validators.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "./js/state.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");




var ARTIFACT_ID = 'translation-table';
var tasks = [{
  id: 'rome-01',
  "short": 'Римская запись',
  mark: 'DCCLIII',
  label: '753₁₀ → римская система'
}, {
  id: 'cross-01',
  "short": 'Двоичная запись',
  mark: '1011110001₂',
  label: '753₁₀ → двоичная система'
}, {
  id: 'cross-02',
  "short": 'Делители 60',
  mark: '12',
  label: 'Найти все положительные делители'
}, {
  id: 'cross-03',
  "short": 'Сравнение',
  mark: '60 : 100',
  label: 'Сравнить количество делителей'
}];

var renderTranslationTable = function renderTranslationTable(state) {
  var romanReady = state.completedQuestions.includes('rome-01');
  var binaryReady = state.completedQuestions.includes('cross-01');

  var row = function row(system, value, ready) {
    return "<div class=\"translation-row ".concat(ready ? 'is-verified' : '', "\" role=\"row\"><strong>").concat(system, "</strong><code>").concat(ready ? value : '—', "</code><span>").concat(ready ? "".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-complete'), " \u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E") : "".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-locked'), " \u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438"), "</span></div>");
  };

  return "<section class=\"translation-table\" aria-labelledby=\"translation-title\"><header><div><p class=\"stage-kicker\">\u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432</p><h2 id=\"translation-title\">\u041E\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E \u2014 \u0442\u0440\u0438 \u0437\u0430\u043F\u0438\u0441\u0438</h2></div><strong>753</strong></header><div role=\"table\" aria-label=\"\u041F\u0435\u0440\u0435\u0432\u043E\u0434\u044B \u0447\u0438\u0441\u043B\u0430 753\"><div class=\"translation-row translation-row--header\" role=\"row\"><span>\u0421\u0438\u0441\u0442\u0435\u043C\u0430</span><span>\u0417\u0430\u043F\u0438\u0441\u044C</span><span>\u0421\u0442\u0430\u0442\u0443\u0441</span></div>".concat(row('Десятичная', '753', true)).concat(row('Римская', 'DCCLIII', romanReady)).concat(row('Двоичная', '1011110001₂', binaryReady), "</div></section>");
};

var renderDivisorComparison = function renderDivisorComparison(state) {
  var listReady = state.completedQuestions.includes('cross-02');
  var comparisonReady = state.completedQuestions.includes('cross-03');
  return "<section class=\"divisor-board\" aria-labelledby=\"divisor-title\"><header><p class=\"stage-kicker\">\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u044F 60</p><h2 id=\"divisor-title\">\u041F\u043E\u0447\u0435\u043C\u0443 60 \u0443\u0434\u043E\u0431\u043D\u043E \u0434\u043B\u044F \u0434\u0435\u043B\u0435\u043D\u0438\u044F?</h2></header><div class=\"divisor-columns\"><article class=\"".concat(listReady ? 'is-revealed' : '', "\"><strong>60</strong><span>").concat(listReady ? '12 делителей' : 'Список закрыт', "</span><p>").concat(listReady ? '1 · 2 · 3 · 4 · 5 · 6 · 10 · 12 · 15 · 20 · 30 · 60' : 'Выполните задание о делителях.', "</p></article><article class=\"").concat(comparisonReady ? 'is-revealed' : '', "\"><strong>100</strong><span>").concat(comparisonReady ? '9 делителей' : 'Сравнение закрыто', "</span><p>").concat(comparisonReady ? '1 · 2 · 4 · 5 · 10 · 20 · 25 · 50 · 100' : 'Сделайте вывод после проверки списка 60.', "</p></article></div>").concat(comparisonReady ? '<p class="divisor-conclusion">Вывод: 60 делится без остатка на большее число целых значений, поэтому шестидесятеричная система удобна для дробей, времени и углов.</p>' : '', "</section>");
};

var renderStageThree = function renderStageThree(_ref) {
  var _state$activeQuestion, _root$querySelector;

  var root = _ref.root,
      questionBank = _ref.questionBank,
      onStateChange = _ref.onStateChange;
  var state = (0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)();
  var taskIds = tasks.map(function (_ref2) {
    var id = _ref2.id;
    return id;
  });
  var firstIncomplete = taskIds.find(function (id) {
    return !state.completedQuestions.includes(id);
  });
  var requested = (_state$activeQuestion = state.activeQuestionByStage) === null || _state$activeQuestion === void 0 ? void 0 : _state$activeQuestion[3];
  var activeId = taskIds.includes(requested) ? requested : firstIncomplete || taskIds[0];
  var activeTask = tasks.find(function (_ref3) {
    var id = _ref3.id;
    return id === activeId;
  });
  var question = questionBank.questions.find(function (_ref4) {
    var id = _ref4.id;
    return id === activeId;
  });
  var completedCount = taskIds.filter(function (id) {
    return state.completedQuestions.includes(id);
  }).length;
  var artifactUnlocked = state.artifacts.includes(ARTIFACT_ID);
  root.innerHTML = "<section class=\"quest-card stage-three\" aria-labelledby=\"quest-title\">\n    <header><p class=\"stage-kicker\">\u042D\u0442\u0430\u043F 3</p><h1 id=\"quest-title\" tabindex=\"-1\">\u041A\u043E\u043C\u043F\u0438\u043B\u044F\u0446\u0438\u044F</h1><p class=\"eyebrow\">\u041F\u0435\u0440\u0435\u0432\u043E\u0434\u0438\u043C \u0434\u0430\u043D\u043D\u044B\u0435 \u043C\u0435\u0436\u0434\u0443 \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u043C\u0438</p></header>\n    <p class=\"intro\">\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u0432\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u0447\u0438\u0441\u043B\u0430 753, \u0438\u0441\u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u0434\u0435\u043B\u0438\u0442\u0435\u043B\u0438 \u0438 \u0441\u043E\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0430\u0431\u043B\u0438\u0446\u0443 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0445 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432.</p>\n    <div class=\"compiler-steps\" role=\"tablist\" aria-label=\"\u0417\u0430\u0434\u0430\u043D\u0438\u044F \u043A\u043E\u043C\u043F\u0438\u043B\u044F\u0446\u0438\u0438\">".concat(tasks.map(function (task, index) {
    var complete = state.completedQuestions.includes(task.id);
    var active = task.id === activeId;
    return "<button type=\"button\" role=\"tab\" aria-selected=\"".concat(active, "\" class=\"compiler-step ").concat(active ? 'is-active' : '', " ").concat(complete ? 'is-complete' : '', "\" data-question=\"").concat(task.id, "\"><span>").concat(complete ? '✓' : index + 1, "</span><strong>").concat(task["short"], "</strong><small>").concat(task.label, "</small></button>");
  }).join(''), "</div>\n    <section class=\"compiler-console\" aria-labelledby=\"compiler-question\"><div class=\"compiler-console__mark\"><span>").concat(activeTask.mark, "</span><small>\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C\u043D\u0430\u044F \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044F ").concat(Math.min(completedCount + (state.completedQuestions.includes(activeId) ? 0 : 1), 4), " \u0438\u0437 4</small></div><div class=\"compiler-console__body\"><h2 id=\"compiler-question\">").concat(question.prompt, "</h2><form class=\"answer-form stage-three__form\"></form></div></section>\n    ").concat(renderTranslationTable(state), "\n    ").concat(renderDivisorComparison(state), "\n    <section class=\"stage-artifact ").concat(artifactUnlocked ? 'is-unlocked' : '', "\" aria-live=\"polite\"><span class=\"stage-artifact__icon\" aria-hidden=\"true\">").concat(artifactUnlocked ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.artifactImage)('translation-tablet') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-locked'), "</span><div><p>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u044D\u0442\u0430\u043F\u0430</p><h2>\u0422\u0430\u0431\u043B\u0438\u0447\u043A\u0430 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u043E\u0432</h2><span>").concat(artifactUnlocked ? 'Проверена — этап 4 открыт' : "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439: ".concat(completedCount, " \u0438\u0437 4"), "</span></div></section>\n  </section>");
  root.querySelectorAll('.compiler-step').forEach(function (tab) {
    return tab.addEventListener('click', function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setActiveQuestion)(3, tab.dataset.question);
      onStateChange();
    });
  });
  var ui;
  var form = root.querySelector('.stage-three__form');

  var target = function target() {
    return question.type === 'singleChoice' ? form.querySelector('input[name="answer"]') : ui.control;
  };

  var setFormState = function setFormState(name, message) {
    var _target;

    form.dataset.state = name;
    ui.status.textContent = message;
    (_target = target()) === null || _target === void 0 ? void 0 : _target.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false');
  };

  var showHint = function showHint() {
    var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    ui.hint.innerHTML = "<strong>\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430:</strong> ".concat(question.hint);
    ui.hint.hidden = false;
    ui.hintButton.setAttribute('aria-expanded', 'true');
    if (save) (0,_state__WEBPACK_IMPORTED_MODULE_2__.openHint)(activeId);
  };

  ui = (0,_components_question__WEBPACK_IMPORTED_MODULE_0__.createQuestionComponent)({
    container: form,
    question: question,
    initialValue: state.answers[activeId] || '',
    onChange: function onChange(value) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(activeId, value);
      if (form.dataset.state !== 'success') setFormState('', '');
    },
    onHint: function onHint() {
      var opening = ui.hint.hidden;
      ui.hint.hidden = !opening;
      ui.hintButton.setAttribute('aria-expanded', String(opening));

      if (opening) {
        showHint();
        ui.hint.focus({
          preventScroll: true
        });
      }
    },
    onSubmit: function onSubmit(value) {
      var result = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_1__.validateAnswer)(question, value);

      if (!result.valid) {
        var _target2;

        setFormState('error', "\u041E\u0448\u0438\u0431\u043A\u0430 \u0444\u043E\u0440\u043C\u0430\u0442\u0430: ".concat(result.message));
        (_target2 = target()) === null || _target2 === void 0 ? void 0 : _target2.focus();
        return;
      }

      (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(activeId, value);
      var attempt = (0,_state__WEBPACK_IMPORTED_MODULE_2__.registerAttempt)(activeId);
      var label = ui.submit.querySelector('.button-label');
      ui.submit.disabled = true;
      ui.submit.classList.add('is-loading');
      label.textContent = 'Проверяем';
      ui.status.textContent = 'Проверяем ответ…';
      window.setTimeout(function () {
        if (result.correct) {
          (0,_state__WEBPACK_IMPORTED_MODULE_2__.completeQuestion)(question);
          var latest = (0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)();
          var allComplete = taskIds.every(function (id) {
            return latest.completedQuestions.includes(id);
          });

          if (allComplete) {
            (0,_state__WEBPACK_IMPORTED_MODULE_2__.addArtifact)(ARTIFACT_ID);
            (0,_state__WEBPACK_IMPORTED_MODULE_2__.unlockStage)(4);
          } else {
            var next = taskIds.find(function (id) {
              return !latest.completedQuestions.includes(id);
            });
            if (next) (0,_state__WEBPACK_IMPORTED_MODULE_2__.setActiveQuestion)(3, next);
          }

          onStateChange();
        } else {
          var _target3;

          if (attempt === 1) showHint();
          setFormState('error', attempt >= 2 ? "\u041E\u0442\u0432\u0435\u0442 \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439. ".concat(question.errorExplanation) : 'Ответ неверный. Открыта подсказка — попробуйте снова.');
          label.textContent = 'Проверить снова';
          ui.submit.disabled = false;
          ui.submit.classList.remove('is-loading');
          (_target3 = target()) === null || _target3 === void 0 ? void 0 : _target3.focus();
        }
      }, 450);
    }
  });
  if (state.openedHints.includes(activeId)) showHint(false);

  if (state.completedQuestions.includes(activeId)) {
    setFormState('success', "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E. ".concat(question.errorExplanation));
    ui.submit.querySelector('.button-label').textContent = 'Ответ принят';
  }

  (_root$querySelector = root.querySelector('#quest-title')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/stage-4.js":
/*!*******************************!*\
  !*** ./js/screens/stage-4.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderStageFour": () => (/* binding */ renderStageFour)
/* harmony export */ });
/* harmony import */ var _components_question__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/question */ "./js/components/question.js");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validators */ "./js/utils/validators.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "./js/state.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }





var ARTIFACT_ID = 'compatibility-card';
var TASK_IDS = ['cross-04', 'practical-01'];
var PROCESSOR_ANSWER = 'Intel 4004 — 4-битный процессор; разрядность процессора не означает размер байта.';

var renderBitDiagram = function renderBitDiagram(ready) {
  return "<section class=\"bit-lab\" aria-labelledby=\"bit-lab-title\"><header><p class=\"stage-kicker\">\u0414\u0432\u043E\u0438\u0447\u043D\u044B\u0435 \u0440\u0430\u0437\u0440\u044F\u0434\u044B</p><h2 id=\"bit-lab-title\">\u0427\u0438\u0441\u043B\u043E 3600 \u0432 \u043F\u0430\u043C\u044F\u0442\u0438</h2></header><div class=\"bit-register ".concat(ready ? 'is-verified' : '', "\" aria-label=\"").concat(ready ? 'Двоичная запись 111000010000, 12 бит' : 'Двоичная запись пока не проверена', "\">").concat((ready ? '111000010000' : '????????????').split('').map(function (digit, index) {
    return "<span><b>".concat(digit, "</b><small>").concat(11 - index, "</small></span>");
  }).join(''), "</div><p>").concat(ready ? 'Старший занятый разряд имеет индекс 11, поэтому нужны 12 бит без ведущих нулей.' : 'Соберите карточку совместимости, чтобы открыть двоичную запись и номера разрядов.', "</p></section>");
};

var renderRange = function renderRange(ready) {
  return "<section class=\"range-check\" aria-labelledby=\"range-title\"><div><p class=\"stage-kicker\">\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D 8 \u0431\u0438\u0442</p><h2 id=\"range-title\">0\u2013255</h2><p>8 \u0431\u0438\u0442 \u0434\u0430\u044E\u0442 2\u2078 = 256 \u0431\u0435\u0437\u0437\u043D\u0430\u043A\u043E\u0432\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439.</p></div><div class=\"range-check__scale\"><span>0</span><span>255</span><i style=\"--overflow:".concat(ready ? '100%' : '0%', "\"></i><strong>3600</strong></div><div class=\"range-check__result ").concat(ready ? 'is-error' : '', "\">").concat(ready ? "".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-locked'), " \u041D\u0435 \u043F\u043E\u043C\u0435\u0449\u0430\u0435\u0442\u0441\u044F") : 'Ожидает проверки', "</div></section>");
};

var renderCompatibilityCard = function renderCompatibilityCard(state) {
  var rangeReady = state.completedQuestions.includes('cross-04');
  var practicalReady = state.completedQuestions.includes('practical-01');

  var status = function status(ready) {
    return ready ? "".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-complete'), " \u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E") : "".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-locked'), " \u041D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E");
  };

  return "<section class=\"compatibility-card ".concat(practicalReady ? 'is-compatible' : '', "\" aria-labelledby=\"compatibility-title\"><header><div><p class=\"stage-kicker\">\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u0435\u0439\u0441</p><h2 id=\"compatibility-title\">\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438 \u2116 3600</h2></div><strong>").concat(practicalReady ? 'ГОТОВО' : 'ЧЕРНОВИК', "</strong></header><div class=\"compatibility-grid\"><div><span>\u0414\u0432\u043E\u0438\u0447\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C</span><b>").concat(practicalReady ? '111000010000₂' : '—', "</b><small>").concat(status(practicalReady), "</small></div><div><span>\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0451\u043C\u043A\u043E\u0441\u0442\u044C</span><b>").concat(practicalReady ? '12 бит' : '—', "</b><small>").concat(status(practicalReady), "</small></div><div><span>\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D 8 \u0431\u0438\u0442</span><b>").concat(rangeReady ? '0–255' : '—', "</b><small>").concat(status(rangeReady), "</small></div><div><span>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442</span><b>").concat(practicalReady && rangeReady ? 'Не помещается' : '—', "</b><small>").concat(status(practicalReady && rangeReady), "</small></div></div>").concat(practicalReady ? '<p class="compatibility-note">Intel 4004 — 4-битный процессор. Разрядность процессора нельзя называть «4-битным байтом».</p>' : '', "</section>");
};

var renderPracticalForm = function renderPracticalForm(container, state, question, onStateChange) {
  var saved = _typeof(state.answers[question.id]) === 'object' ? state.answers[question.id] : {};
  container.innerHTML = "<div class=\"practical-fields\"><label>\u0414\u0432\u043E\u0438\u0447\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C 3600<input name=\"binary\" inputmode=\"numeric\" autocomplete=\"off\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 1010\" value=\"".concat(saved.binary || '', "\"></label><label>\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u0431\u0438\u0442<input name=\"bits\" inputmode=\"numeric\" autocomplete=\"off\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0447\u0438\u0441\u043B\u043E\" value=\"").concat(saved.bits || '', "\"></label></div><fieldset class=\"choice-list\"><legend>\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0432\u044B\u0432\u043E\u0434 \u043E\u0431 Intel 4004</legend>").concat([PROCESSOR_ANSWER, 'Intel 4004 использовал 4-битный байт, поэтому число 3600 хранить невозможно.', 'Разрядность Intel 4004 означает, что любой двоичный код должен состоять ровно из четырёх бит.'].map(function (option) {
    return "<label class=\"choice-option\"><input type=\"radio\" name=\"processor\" value=\"".concat(option, "\" ").concat(saved.processor === option ? 'checked' : '', "><span>").concat(option, "</span></label>");
  }).join(''), "</fieldset><button class=\"primary-button\" type=\"submit\"><span class=\"button-label\">\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443</span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('navigation-forward'), "</button><button class=\"hint-button\" type=\"button\" aria-expanded=\"false\" aria-controls=\"practical-hint\">").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-hint'), " \u041D\u0443\u0436\u043D\u0430 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430?").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('navigation-forward', 'hint-toggle'), "</button><p class=\"answer-status\" role=\"status\" aria-live=\"polite\"></p><div class=\"hint\" id=\"practical-hint\" tabindex=\"-1\" hidden></div>");
  var status = container.querySelector('.answer-status');
  var hint = container.querySelector('.hint');
  var hintButton = container.querySelector('.hint-button');
  var submit = container.querySelector('.primary-button');

  var getValue = function getValue() {
    return {
      binary: container.elements.binary.value,
      bits: container.elements.bits.value,
      processor: container.elements.processor.value || ''
    };
  };

  var save = function save() {
    return (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(question.id, getValue());
  };

  container.querySelectorAll('input').forEach(function (input) {
    return input.addEventListener('change', save);
  });

  var showHint = function showHint() {
    var persist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    hint.innerHTML = "<strong>\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430:</strong> ".concat(question.hint);
    hint.hidden = false;
    hintButton.setAttribute('aria-expanded', 'true');
    if (persist) (0,_state__WEBPACK_IMPORTED_MODULE_2__.openHint)(question.id);
  };

  hintButton.addEventListener('click', function () {
    var opening = hint.hidden;
    hint.hidden = !opening;
    hintButton.setAttribute('aria-expanded', String(opening));

    if (opening) {
      showHint();
      hint.focus({
        preventScroll: true
      });
    }
  });
  container.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = getValue();
    save();

    if (!value.binary.trim() || !value.bits.trim() || !value.processor) {
      container.dataset.state = 'error';
      status.textContent = 'Заполните все три поля карточки.';
      return;
    }

    var correct = value.binary.replace(/[\s_]/g, '').replace(/\u2082$/, '') === '111000010000' && value.bits.trim() === '12' && value.processor === PROCESSOR_ANSWER;
    var attempt = (0,_state__WEBPACK_IMPORTED_MODULE_2__.registerAttempt)(question.id);
    submit.disabled = true;
    submit.classList.add('is-loading');
    submit.querySelector('.button-label').textContent = 'Проверяем';
    status.textContent = 'Проверяем совместимость…';
    window.setTimeout(function () {
      if (correct) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.completeQuestion)(question);
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.addArtifact)(ARTIFACT_ID);
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.unlockStage)(5);
        onStateChange();
      } else {
        if (attempt === 1) showHint();
        container.dataset.state = 'error';
        status.textContent = attempt >= 2 ? "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043E\u0448\u0438\u0431\u043A\u0443. ".concat(question.errorExplanation) : 'Карточка содержит ошибку. Открыта подсказка — проверьте разряды и вывод.';
        submit.disabled = false;
        submit.classList.remove('is-loading');
        submit.querySelector('.button-label').textContent = 'Проверить снова';
      }
    }, 450);
  });
  if (state.openedHints.includes(question.id)) showHint(false);

  if (state.completedQuestions.includes(question.id)) {
    container.dataset.state = 'success';
    status.textContent = "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u0430. ".concat(question.errorExplanation);
    submit.querySelector('.button-label').textContent = 'Карточка принята';
  }
};

var renderStageFour = function renderStageFour(_ref) {
  var _state$activeQuestion, _root$querySelector;

  var root = _ref.root,
      questionBank = _ref.questionBank,
      onStateChange = _ref.onStateChange;
  var state = (0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)();
  var firstIncomplete = TASK_IDS.find(function (id) {
    return !state.completedQuestions.includes(id);
  });
  var requested = (_state$activeQuestion = state.activeQuestionByStage) === null || _state$activeQuestion === void 0 ? void 0 : _state$activeQuestion[4];
  var activeId = TASK_IDS.includes(requested) ? requested : firstIncomplete || TASK_IDS[0];
  var question = questionBank.questions.find(function (_ref2) {
    var id = _ref2.id;
    return id === activeId;
  });
  var completedCount = TASK_IDS.filter(function (id) {
    return state.completedQuestions.includes(id);
  }).length;
  var practicalReady = state.completedQuestions.includes('practical-01');
  var rangeReady = state.completedQuestions.includes('cross-04');
  var artifactUnlocked = state.artifacts.includes(ARTIFACT_ID);
  root.innerHTML = "<section class=\"quest-card stage-four\" aria-labelledby=\"quest-title\"><header><p class=\"stage-kicker\">\u042D\u0442\u0430\u043F 4</p><h1 id=\"quest-title\" tabindex=\"-1\">\u0421\u0431\u043E\u0440\u043A\u0430 \u044F\u0434\u0440\u0430</h1><p class=\"eyebrow\">\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C \u0447\u0438\u0441\u0435\u043B</p></header><p class=\"intro\">\u0410\u0440\u0445\u0438\u0432 \u0445\u0440\u0430\u043D\u0438\u0442 \u0447\u0438\u0441\u043B\u043E 3600. \u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u0435 \u0435\u0433\u043E \u0434\u0432\u043E\u0438\u0447\u043D\u0443\u044E \u0451\u043C\u043A\u043E\u0441\u0442\u044C \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C \u0441 \u0431\u0435\u0437\u0437\u043D\u0430\u043A\u043E\u0432\u044B\u043C \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u043E\u043C 8 \u0431\u0438\u0442.</p><div class=\"core-tabs\" role=\"tablist\" aria-label=\"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438\"><button type=\"button\" role=\"tab\" aria-selected=\"".concat(activeId === 'cross-04', "\" class=\"core-tab ").concat(activeId === 'cross-04' ? 'is-active' : '', " ").concat(rangeReady ? 'is-complete' : '', "\" data-question=\"cross-04\"><span>").concat(rangeReady ? '✓' : '01', "</span><strong>\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D 8 \u0431\u0438\u0442</strong><small>\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0433\u0440\u0430\u043D\u0438\u0446\u044B 0\u2013255</small></button><button type=\"button\" role=\"tab\" aria-selected=\"").concat(activeId === 'practical-01', "\" class=\"core-tab ").concat(activeId === 'practical-01' ? 'is-active' : '', " ").concat(practicalReady ? 'is-complete' : '', "\" data-question=\"practical-01\"><span>").concat(practicalReady ? '✓' : '02', "</span><strong>\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u0435\u0439\u0441</strong><small>\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0447\u0438\u0441\u043B\u0430 3600</small></button></div><section class=\"core-task\" aria-labelledby=\"core-question\"><p>\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 ").concat(completedCount + (state.completedQuestions.includes(activeId) ? 0 : 1), " \u0438\u0437 2</p><h2 id=\"core-question\">").concat(question.prompt, "</h2><form class=\"answer-form stage-four__form\"></form></section>").concat(renderBitDiagram(practicalReady)).concat(renderRange(rangeReady)).concat(renderCompatibilityCard(state), "<section class=\"stage-artifact ").concat(artifactUnlocked ? 'is-unlocked' : '', "\" aria-live=\"polite\"><span class=\"stage-artifact__icon\" aria-hidden=\"true\">").concat(artifactUnlocked ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.artifactImage)('compatibility-seal') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-locked'), "</span><div><p>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442 \u044D\u0442\u0430\u043F\u0430</p><h2>\u041F\u0435\u0447\u0430\u0442\u044C \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438</h2><span>").concat(artifactUnlocked ? 'Карточка заверена — этап 5 открыт' : "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u043E\u043A: ".concat(completedCount, " \u0438\u0437 2"), "</span></div></section></section>");
  root.querySelectorAll('.core-tab').forEach(function (tab) {
    return tab.addEventListener('click', function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setActiveQuestion)(4, tab.dataset.question);
      onStateChange();
    });
  });
  var form = root.querySelector('.stage-four__form');
  if (activeId === 'practical-01') renderPracticalForm(form, state, question, onStateChange);else {
    var ui;

    var target = function target() {
      return form.querySelector('input[name="answer"]');
    };

    var setFormState = function setFormState(name, message) {
      var _target;

      form.dataset.state = name;
      ui.status.textContent = message;
      (_target = target()) === null || _target === void 0 ? void 0 : _target.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false');
    };

    var showHint = function showHint() {
      var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      ui.hint.innerHTML = "<strong>\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430:</strong> ".concat(question.hint);
      ui.hint.hidden = false;
      ui.hintButton.setAttribute('aria-expanded', 'true');
      if (save) (0,_state__WEBPACK_IMPORTED_MODULE_2__.openHint)(activeId);
    };

    ui = (0,_components_question__WEBPACK_IMPORTED_MODULE_0__.createQuestionComponent)({
      container: form,
      question: question,
      initialValue: state.answers[activeId] || '',
      onChange: function onChange(value) {
        (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(activeId, value);
        if (form.dataset.state !== 'success') setFormState('', '');
      },
      onHint: function onHint() {
        var opening = ui.hint.hidden;
        ui.hint.hidden = !opening;
        ui.hintButton.setAttribute('aria-expanded', String(opening));
        if (opening) showHint();
      },
      onSubmit: function onSubmit(value) {
        var result = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_1__.validateAnswer)(question, value);

        if (!result.valid) {
          setFormState('error', "\u041E\u0448\u0438\u0431\u043A\u0430 \u0444\u043E\u0440\u043C\u0430\u0442\u0430: ".concat(result.message));
          return;
        }

        (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(activeId, value);
        var attempt = (0,_state__WEBPACK_IMPORTED_MODULE_2__.registerAttempt)(activeId);
        ui.submit.disabled = true;
        ui.submit.classList.add('is-loading');
        ui.submit.querySelector('.button-label').textContent = 'Проверяем';
        window.setTimeout(function () {
          if (result.correct) {
            (0,_state__WEBPACK_IMPORTED_MODULE_2__.completeQuestion)(question);
            (0,_state__WEBPACK_IMPORTED_MODULE_2__.setActiveQuestion)(4, 'practical-01');
            onStateChange();
          } else {
            if (attempt === 1) showHint();
            setFormState('error', attempt >= 2 ? "\u041E\u0442\u0432\u0435\u0442 \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439. ".concat(question.errorExplanation) : 'Ответ неверный. Открыта подсказка — попробуйте снова.');
            ui.submit.disabled = false;
            ui.submit.classList.remove('is-loading');
            ui.submit.querySelector('.button-label').textContent = 'Проверить снова';
          }
        }, 450);
      }
    });
    if (state.openedHints.includes(activeId)) showHint(false);

    if (state.completedQuestions.includes(activeId)) {
      setFormState('success', "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E. ".concat(question.errorExplanation));
      ui.submit.querySelector('.button-label').textContent = 'Ответ принят';
    }
  }
  (_root$querySelector = root.querySelector('#quest-title')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/stage-5.js":
/*!*******************************!*\
  !*** ./js/screens/stage-5.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderFinalResults": () => (/* binding */ renderFinalResults),
/* harmony export */   "renderStageFive": () => (/* binding */ renderStageFive)
/* harmony export */ });
/* harmony import */ var _components_question__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/question */ "./js/components/question.js");
/* harmony import */ var _utils_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validators */ "./js/utils/validators.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "./js/state.js");
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var FINAL_IDS = ['final-02', 'final-03'];
var ARTIFACT_ID = 'core-patch';
var DEFENSE_ID = 'defense-01';
var DEFENSE_QUESTION = {
  id: DEFENSE_ID,
  points: 5
};
var mandatoryIds = ['rome-02', 'final-01', 'egypt-01', 'babylon-01', 'rome-01', 'rus-01', 'cross-01', 'cross-02', 'cross-03', 'cross-04', 'practical-01', 'final-02', 'final-03', DEFENSE_ID];

var escapeHtml = function escapeHtml(value) {
  return String(value !== null && value !== void 0 ? value : '').replace(/[&<>"']/g, function (_char) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[_char];
  });
};

var normalize = function normalize(value) {
  return String(value || '').toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
};

var validateRubric = function validateRubric(id, value) {
  var text = normalize(value);
  if (text.trim().length < 25) return {
    valid: false,
    correct: false,
    message: 'Дайте развёрнутый ответ минимум из нескольких предложений.'
  };

  if (id === 'final-02') {
    var correct = /255/.test(text) && /11111111/.test(text) && /cf/.test(text) && /(значен|одно и то же|не меня)/.test(text);
    return {
      valid: true,
      correct: correct,
      message: ''
    };
  }

  var example = /(егип|рим)/.test(text);
  var advantage = /(прост|легк|нагляд|удоб.*чита|понят)/.test(text);
  var limitation = /(громозд|неудоб|длин|сложн.*вычис|нет нул|непозицион)/.test(text);
  return {
    valid: true,
    correct: example && advantage && limitation,
    message: ''
  };
};

var timerRemaining = function timerRemaining(timer) {
  var _timer$remaining;

  if (!(timer !== null && timer !== void 0 && timer.startedAt)) return 90;
  if (timer.completed) return Math.max(0, (_timer$remaining = timer.remaining) !== null && _timer$remaining !== void 0 ? _timer$remaining : 0);
  return Math.max(0, 90 - Math.floor((Date.now() - timer.startedAt) / 1000));
};

var formatTime = function formatTime(seconds) {
  return "".concat(String(Math.floor(seconds / 60)).padStart(2, '0'), " : ").concat(String(seconds % 60).padStart(2, '0'));
};

var completeDefense = function completeDefense(onStateChange) {
  var state = (0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)();
  if (state.completedQuestions.includes(DEFENSE_ID)) return;
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateTimer)('defense', {
    completed: true,
    remaining: timerRemaining(state.timers.defense),
    finishedAt: Date.now()
  });
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.completeQuestion)(DEFENSE_QUESTION);
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.addArtifact)(ARTIFACT_ID);
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.unlockStage)(6);
  onStateChange();
};

var renderDefense = function renderDefense(state) {
  var questionsReady = FINAL_IDS.every(function (id) {
    return state.completedQuestions.includes(id);
  });
  var timer = state.timers.defense;
  var remaining = timerRemaining(timer);
  var completed = state.completedQuestions.includes(DEFENSE_ID);
  var elapsed = 90 - remaining;
  return "<section class=\"defense-room ".concat(completed ? 'is-complete' : '', "\" aria-labelledby=\"defense-title\"><div class=\"defense-room__copy\"><p class=\"stage-kicker\">\u0423\u0441\u0442\u043D\u0430\u044F \u0437\u0430\u0449\u0438\u0442\u0430</p><h2 id=\"defense-title\">90 \u0441\u0435\u043A\u0443\u043D\u0434 \u043F\u0435\u0440\u0435\u0434 \u0421\u043E\u0432\u0435\u0442\u043E\u043C</h2><p>").concat(completed ? 'Защита завершена. Протокол выступления сохранён.' : 'Кратко представьте путь числа через эпохи и объясните выводы исследования.', "</p><ul><li>\u041D\u0430\u0437\u043E\u0432\u0438\u0442\u0435 \u0434\u0432\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u0447\u0438\u0441\u043B\u0430 753.</li><li>\u041E\u0431\u044A\u044F\u0441\u043D\u0438\u0442\u0435 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E \u0434\u0435\u043B\u0438\u0442\u0435\u043B\u0435\u0439 60.</li><li>\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435, \u043F\u043E\u0447\u0435\u043C\u0443 3600 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 12 \u0431\u0438\u0442.</li></ul></div><div class=\"defense-clock\"><time datetime=\"PT").concat(remaining, "S\">").concat(formatTime(remaining), "</time><span>").concat(completed ? 'Протокол принят' : timer !== null && timer !== void 0 && timer.startedAt ? 'Защита идёт' : 'Таймер готов', "</span>").concat(!completed ? timer !== null && timer !== void 0 && timer.startedAt ? "<button class=\"primary-button defense-finish\" type=\"button\" ".concat(elapsed < 60 ? 'disabled' : '', ">\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u0443").concat(elapsed < 60 ? " \u0447\u0435\u0440\u0435\u0437 ".concat(60 - elapsed, " \u0441\u0435\u043A.") : '', "</button>") : "<button class=\"primary-button defense-start\" type=\"button\" ".concat(questionsReady ? '' : 'disabled', ">\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u0449\u0438\u0442\u0443</button>") : '', "</div></section>");
};

var renderStageFive = function renderStageFive(_ref) {
  var _state$activeQuestion, _root$querySelector, _root$querySelector2, _state$timers$defense, _root$querySelector3;

  var root = _ref.root,
      questionBank = _ref.questionBank,
      onStateChange = _ref.onStateChange;
  var state = (0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)();
  var firstIncomplete = FINAL_IDS.find(function (id) {
    return !state.completedQuestions.includes(id);
  });
  var requested = (_state$activeQuestion = state.activeQuestionByStage) === null || _state$activeQuestion === void 0 ? void 0 : _state$activeQuestion[5];
  var activeId = FINAL_IDS.includes(requested) ? requested : firstIncomplete || FINAL_IDS[0];
  var question = questionBank.questions.find(function (_ref2) {
    var id = _ref2.id;
    return id === activeId;
  });
  var completedCount = FINAL_IDS.filter(function (id) {
    return state.completedQuestions.includes(id);
  }).length;
  var defenseComplete = state.completedQuestions.includes(DEFENSE_ID);
  var artifactUnlocked = state.artifacts.includes(ARTIFACT_ID);
  root.innerHTML = "<section class=\"quest-card stage-five\" aria-labelledby=\"quest-title\"><header><p class=\"stage-kicker\">\u042D\u0442\u0430\u043F 5</p><h1 id=\"quest-title\" tabindex=\"-1\">\u0417\u0430\u0449\u0438\u0442\u0430 \u043F\u0435\u0440\u0435\u0434 \u0421\u043E\u0432\u0435\u0442\u043E\u043C</h1><p class=\"eyebrow\">\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u043C \u043F\u043E\u043B\u043D\u044B\u0439 \u0434\u043E\u043F\u0443\u0441\u043A</p></header><p class=\"intro\">\u0421\u0444\u043E\u0440\u043C\u0443\u043B\u0438\u0440\u0443\u0439\u0442\u0435 \u0434\u0432\u0430 \u0438\u0442\u043E\u0433\u043E\u0432\u044B\u0445 \u0432\u044B\u0432\u043E\u0434\u0430, \u0437\u0430\u0442\u0435\u043C \u043F\u0440\u043E\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u043E\u0442\u043A\u0443\u044E \u0437\u0430\u0449\u0438\u0442\u0443 \u043F\u0440\u043E\u0435\u043A\u0442\u0430.</p><div class=\"council-tabs\" role=\"tablist\" aria-label=\"\u0424\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B\">".concat(FINAL_IDS.map(function (id, index) {
    var item = questionBank.questions.find(function (entry) {
      return entry.id === id;
    });
    var done = state.completedQuestions.includes(id);
    return "<button type=\"button\" role=\"tab\" aria-selected=\"".concat(id === activeId, "\" class=\"council-tab ").concat(id === activeId ? 'is-active' : '', " ").concat(done ? 'is-complete' : '', "\" data-question=\"").concat(id, "\"><span>").concat(done ? '✓' : "0".concat(index + 1), "</span><strong>").concat(index ? 'Сильные и слабые стороны' : 'Значение и форма записи', "</strong><small>").concat(item.prompt, "</small></button>");
  }).join(''), "</div><section class=\"council-question\" aria-labelledby=\"council-question\"><p>\u0424\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 ").concat(completedCount + (state.completedQuestions.includes(activeId) ? 0 : 1), " \u0438\u0437 2</p><h2 id=\"council-question\">").concat(question.prompt, "</h2><form class=\"answer-form council-form\"></form></section>").concat(renderDefense(state), "<section class=\"stage-artifact ").concat(artifactUnlocked ? 'is-unlocked' : '', "\" aria-live=\"polite\"><span class=\"stage-artifact__icon\" aria-hidden=\"true\">").concat(artifactUnlocked ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.artifactImage)('time-core-key') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-locked'), "</span><div><p>\u0424\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442</p><h2>\u041A\u043B\u044E\u0447 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u044F\u0434\u0440\u0430</h2><span>").concat(artifactUnlocked ? 'Полный допуск получен — итоговая карточка открыта' : defenseComplete ? 'Формируется итоговый протокол' : 'Ответьте на вопросы и завершите защиту', "</span></div></section></section>");
  root.querySelectorAll('.council-tab').forEach(function (tab) {
    return tab.addEventListener('click', function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setActiveQuestion)(5, tab.dataset.question);
      onStateChange();
    });
  });
  var ui;
  var form = root.querySelector('.council-form');

  var setFormState = function setFormState(name, message) {
    var _ui$control;

    form.dataset.state = name;
    ui.status.textContent = message;
    (_ui$control = ui.control) === null || _ui$control === void 0 ? void 0 : _ui$control.setAttribute('aria-invalid', name === 'error' ? 'true' : 'false');
  };

  var showHint = function showHint() {
    var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    ui.hint.innerHTML = "<strong>\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430:</strong> ".concat(question.hint);
    ui.hint.hidden = false;
    ui.hintButton.setAttribute('aria-expanded', 'true');
    if (save) (0,_state__WEBPACK_IMPORTED_MODULE_2__.openHint)(activeId);
  };

  ui = (0,_components_question__WEBPACK_IMPORTED_MODULE_0__.createQuestionComponent)({
    container: form,
    question: _objectSpread(_objectSpread({}, question), {}, {
      type: 'text'
    }),
    initialValue: state.answers[activeId] || '',
    onChange: function onChange(value) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(activeId, value);
      if (form.dataset.state !== 'success') setFormState('', '');
    },
    onHint: function onHint() {
      var opening = ui.hint.hidden;
      ui.hint.hidden = !opening;
      ui.hintButton.setAttribute('aria-expanded', String(opening));
      if (opening) showHint();
    },
    onSubmit: function onSubmit(value) {
      var result = validateRubric(activeId, value);

      if (!result.valid) {
        setFormState('error', result.message);
        return;
      }

      (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateAnswer)(activeId, value);
      var attempt = (0,_state__WEBPACK_IMPORTED_MODULE_2__.registerAttempt)(activeId);
      ui.submit.disabled = true;
      ui.submit.classList.add('is-loading');
      ui.submit.querySelector('.button-label').textContent = 'Проверяем';
      window.setTimeout(function () {
        if (result.correct) {
          (0,_state__WEBPACK_IMPORTED_MODULE_2__.completeQuestion)(question);
          var next = FINAL_IDS.find(function (id) {
            return !(0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)().completedQuestions.includes(id);
          });
          if (next) (0,_state__WEBPACK_IMPORTED_MODULE_2__.setActiveQuestion)(5, next);
          onStateChange();
        } else {
          if (attempt === 1) showHint();
          setFormState('error', attempt >= 2 ? "\u041E\u0442\u0432\u0435\u0442 \u043F\u043E\u043A\u0430 \u043D\u0435\u043F\u043E\u043B\u043D\u044B\u0439. ".concat(question.errorExplanation) : 'Не хватает одного из обязательных элементов. Открыта подсказка.');
          ui.submit.disabled = false;
          ui.submit.classList.remove('is-loading');
          ui.submit.querySelector('.button-label').textContent = 'Проверить снова';
        }
      }, 450);
    }
  });
  if (state.openedHints.includes(activeId)) showHint(false);

  if (state.completedQuestions.includes(activeId)) {
    setFormState('success', 'Вывод принят Советом и добавлен в итоговый протокол.');
    ui.submit.querySelector('.button-label').textContent = 'Ответ принят';
  }

  (_root$querySelector = root.querySelector('.defense-start')) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.addEventListener('click', function () {
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.updateTimer)('defense', {
      startedAt: Date.now(),
      duration: 90,
      completed: false,
      remaining: 90
    });
    onStateChange();
  });
  (_root$querySelector2 = root.querySelector('.defense-finish')) === null || _root$querySelector2 === void 0 ? void 0 : _root$querySelector2.addEventListener('click', function () {
    return completeDefense(onStateChange);
  });
  var timerNode = root.querySelector('.defense-clock time');
  var sideTimer = document.querySelector('.timer time');
  var sideLabel = document.querySelector('#timer-label');
  if (sideTimer) sideTimer.textContent = formatTime(timerRemaining(state.timers.defense));
  if (sideLabel) sideLabel.textContent = defenseComplete ? 'Защита завершена' : 'До конца защиты';
  var interval;

  if ((_state$timers$defense = state.timers.defense) !== null && _state$timers$defense !== void 0 && _state$timers$defense.startedAt && !defenseComplete) {
    var tick = function tick() {
      var remaining = timerRemaining((0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)().timers.defense);

      if (timerNode) {
        timerNode.textContent = formatTime(remaining);
        timerNode.setAttribute('datetime', "PT".concat(remaining, "S"));
      }

      if (sideTimer) sideTimer.textContent = formatTime(remaining);
      if (sideLabel) sideLabel.textContent = 'До конца защиты';

      if (remaining <= 0) {
        window.clearInterval(interval);
        completeDefense(onStateChange);
      } else if (remaining <= 30) {
        var button = root.querySelector('.defense-finish');

        if (button) {
          button.disabled = false;
          button.textContent = 'Завершить защиту';
        }
      }
    };

    tick();
    interval = window.setInterval(tick, 250);
  }

  (_root$querySelector3 = root.querySelector('#quest-title')) === null || _root$querySelector3 === void 0 ? void 0 : _root$querySelector3.focus({
    preventScroll: true
  });
  return function () {
    if (interval) window.clearInterval(interval);
  };
};

var lostPoints = function lostPoints(state, question) {
  var attempts = state.attempts[question.id] || 1;
  var practical = question.id === 'practical-01';
  var loss = (attempts === 2 ? practical ? 2 : 1 : attempts >= 3 ? practical ? 4 : 2 : 0) + (state.openedHints.includes(question.id) ? practical ? 2 : 1 : 0);
  return Math.min(practical ? 4 : 2, loss);
};

var renderFinalResults = function renderFinalResults(_ref3) {
  var _root$querySelector4, _root$querySelector5;

  var root = _ref3.root,
      questionBank = _ref3.questionBank,
      onStateChange = _ref3.onStateChange;
  var state = (0,_state__WEBPACK_IMPORTED_MODULE_2__.getState)();
  var allRequired = mandatoryIds.every(function (id) {
    return state.completedQuestions.includes(id);
  });
  var allArtifacts = state.artifacts.length >= 5;
  var success = allRequired && allArtifacts && state.score >= 60;
  var recovered = state.recoveredQuestions || [];
  var recoverable = questionBank.questions.filter(function (question) {
    return state.completedQuestions.includes(question.id) && !recovered.includes(question.id) && !['rubricText', 'rubricCase'].includes(question.type) && lostPoints(state, question) > 0;
  });
  var hypothesis = escapeHtml(state.answers['final-01'] || 'Не заполнено');
  var achievementTitles = _state__WEBPACK_IMPORTED_MODULE_2__.ACHIEVEMENT_DEFINITIONS.filter(function (_ref4) {
    var id = _ref4.id;
    return state.achievements.includes(id);
  }).map(function (_ref5) {
    var title = _ref5.title;
    return title;
  });
  root.innerHTML = "<section class=\"quest-card final-results\" aria-labelledby=\"quest-title\"><header><p class=\"stage-kicker\">\u0418\u0442\u043E\u0433\u0438 \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u0438</p><h1 id=\"quest-title\" tabindex=\"-1\">".concat(success ? 'Полный допуск получен' : 'Требуется восстановление', "</h1><p class=\"eyebrow\">\u041B\u0438\u0447\u043D\u044B\u0439 \u0430\u0440\u0445\u0438\u0432 \u0425\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044F \u0432\u0440\u0435\u043C\u0435\u043D\u0438</p></header><div class=\"result-hero ").concat(success ? 'is-success' : '', "\"><span>").concat(success ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-reward') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-time'), "</span><div><strong>").concat(state.score, "<small> / 100 \u0431\u0430\u043B\u043B\u043E\u0432</small></strong><p>").concat(success ? 'Все обязательные испытания завершены, пять артефактов собраны.' : 'Маршрут завершён, но для допуска необходимо набрать не менее 60 баллов.', "</p></div></div><section class=\"reward-summary\" aria-labelledby=\"reward-title\"><header><div><p class=\"stage-kicker\">\u0418\u0433\u0440\u043E\u0432\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435</p><h2 id=\"reward-title\">\u041D\u0430\u0433\u0440\u0430\u0434\u044B \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u0438</h2></div><strong>").concat(state.achievements.length, " / ").concat(_state__WEBPACK_IMPORTED_MODULE_2__.ACHIEVEMENT_DEFINITIONS.length, "</strong></header><div><span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-score'), " ").concat(state.score, " \u0431\u0430\u043B\u043B\u043E\u0432</span><span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-complete'), " ").concat(Object.values(state.attempts).reduce(function (sum, count) {
    return sum + count;
  }, 0), " \u043F\u043E\u043F\u044B\u0442\u043E\u043A</span><span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-hint'), " ").concat(state.openedHints.length, " \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043E\u043A</span><span>").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('navigation-passport'), " ").concat(state.artifacts.length, " \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u043E\u0432</span></div><ul>").concat(_state__WEBPACK_IMPORTED_MODULE_2__.ACHIEVEMENT_DEFINITIONS.map(function (achievement) {
    return "<li class=\"".concat(state.achievements.includes(achievement.id) ? 'is-earned' : '', "\">").concat(state.achievements.includes(achievement.id) ? (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-reward') : (0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('status-locked'), "<span><strong>").concat(achievement.title, "</strong><small>").concat(achievement.description, "</small></span></li>");
  }).join(''), "</ul></section><article class=\"print-card\" id=\"print-card\"><header><div><p>\u041D\u0418\u0418 \u0412\u0440\u0435\u043C\u0435\u043D\u0438 \xB7 \u0438\u0442\u043E\u0433\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442</p><h2>\u041F\u0430\u0442\u0447 \u0434\u043B\u044F \u044F\u0434\u0440\u0430</h2></div><strong>\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \xAB\u0425\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u0438 \u0432\u0440\u0435\u043C\u0435\u043D\u0438\xBB</strong></header><section><h3>\u041F\u0430\u0441\u043F\u043E\u0440\u0442 \u0447\u0438\u0441\u043B\u0430</h3><div class=\"print-passport\"><span>\u0415\u0433\u0438\u043F\u0435\u0442 \u2014 222</span><span>\u0412\u0430\u0432\u0438\u043B\u043E\u043D \u2014 125</span><span>\u0420\u0438\u043C \u2014 DCCLIII</span><span>\u0414\u0440\u0435\u0432\u043D\u044F\u044F \u0420\u0443\u0441\u044C \u2014 \u0426\u041F\u0418 (988)</span></div></section><section><h3>\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u044B</h3><p>753\u2081\u2080 = DCCLIII = 1011110001\u2082</p><p>3600\u2081\u2080 = 111000010000\u2082 \xB7 12 \u0431\u0438\u0442 \xB7 \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D 0\u2013255 \u043D\u0435 \u043F\u043E\u043C\u0435\u0449\u0430\u0435\u0442\u0441\u044F.</p></section><section><h3>\u0413\u0438\u043F\u043E\u0442\u0435\u0437\u0430 \u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044F</h3><p>").concat(hypothesis, "</p></section><section><h3>\u0424\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u044B\u0432\u043E\u0434\u044B</h3><p>").concat(escapeHtml(state.answers['final-02']), "</p><p>").concat(escapeHtml(state.answers['final-03']), "</p></section><section><h3>\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F</h3><p>").concat(achievementTitles.length ? achievementTitles.join(' · ') : 'Пока не получены', "</p></section><footer><span>\u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B: ").concat(state.artifacts.length, " \u0438\u0437 5</span><strong>\u0418\u0442\u043E\u0433: ").concat(state.score, " / 100</strong></footer></article><div class=\"result-actions\"><button class=\"primary-button print-button\" type=\"button\">").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_3__.icon)('navigation-passport'), " \u0420\u0430\u0441\u043F\u0435\u0447\u0430\u0442\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443</button></div>").concat(!success ? "<section class=\"recovery-mode\"><p class=\"stage-kicker\">\u0420\u0435\u0436\u0438\u043C \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F</p><h2>\u0412\u0435\u0440\u043D\u0438\u0442\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u043D\u044B\u0435 \u0431\u0430\u043B\u043B\u044B</h2><p>\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F, \u0433\u0434\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438\u0441\u044C \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 \u0438\u043B\u0438 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u043F\u044B\u0442\u043E\u043A.</p>".concat(recoverable.length ? "<div class=\"recovery-list\">".concat(recoverable.map(function (question) {
    return "<button type=\"button\" data-recovery=\"".concat(question.id, "\"><strong>").concat(question.prompt, "</strong><span>\u041C\u043E\u0436\u043D\u043E \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0434\u043E ").concat(lostPoints(state, question), " \u0431\u0430\u043B\u043B\u043E\u0432</span></button>");
  }).join(''), "</div><form class=\"answer-form recovery-form\" hidden></form>") : '<p>Доступных заданий восстановления нет.</p>', "</section>") : '', "</section>");
  var printedTeamName = root.querySelector('.print-card > header > strong');
  if (printedTeamName) printedTeamName.textContent = "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \xAB".concat(state.teamName || 'Хранители времени', "\xBB");
  (_root$querySelector4 = root.querySelector('.print-button')) === null || _root$querySelector4 === void 0 ? void 0 : _root$querySelector4.addEventListener('click', function () {
    return window.print();
  });
  root.querySelectorAll('[data-recovery]').forEach(function (button) {
    return button.addEventListener('click', function () {
      var _ui$control2;

      var question = questionBank.questions.find(function (_ref6) {
        var id = _ref6.id;
        return id === button.dataset.recovery;
      });
      var form = root.querySelector('.recovery-form');
      form.hidden = false;
      var ui = (0,_components_question__WEBPACK_IMPORTED_MODULE_0__.createQuestionComponent)({
        container: form,
        question: question,
        initialValue: '',
        onChange: function onChange() {},
        onHint: function onHint() {},
        onSubmit: function onSubmit(value) {
          var result = (0,_utils_validators__WEBPACK_IMPORTED_MODULE_1__.validateAnswer)(question, value);

          if (result.valid && result.correct) {
            (0,_state__WEBPACK_IMPORTED_MODULE_2__.recoverQuestion)(question);
            onStateChange();
          } else {
            form.dataset.state = 'error';
            ui.status.textContent = result.valid ? 'Ответ неверный — попробуйте ещё раз.' : result.message;
          }
        }
      });
      ui.hintButton.hidden = true;
      ui.status.textContent = "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435: ".concat(question.prompt);
      (_ui$control2 = ui.control) === null || _ui$control2 === void 0 ? void 0 : _ui$control2.focus();
    });
  });
  (_root$querySelector5 = root.querySelector('#quest-title')) === null || _root$querySelector5 === void 0 ? void 0 : _root$querySelector5.focus({
    preventScroll: true
  });
};

/***/ }),

/***/ "./js/screens/start.js":
/*!*****************************!*\
  !*** ./js/screens/start.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderStartScreen": () => (/* binding */ renderStartScreen)
/* harmony export */ });
/* harmony import */ var _components_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/icons */ "./js/components/icons.js");

var MAX_TEAM_NAME_LENGTH = 24;
var renderStartScreen = function renderStartScreen(_ref) {
  var root = _ref.root,
      onStart = _ref.onStart;
  root.innerHTML = "\n    <main class=\"welcome-screen\" aria-labelledby=\"welcome-title\">\n      <section class=\"welcome-card\">\n        <div class=\"welcome-card__seal\" aria-hidden=\"true\">".concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('status-reward'), "</div>\n        <p class=\"stage-kicker\">\u041D\u0418\u0418 \u0412\u0440\u0435\u043C\u0435\u043D\u0438 \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0430\u0435\u0442</p>\n        <h1 id=\"welcome-title\">\u041A\u043E\u0434 \u0434\u043E\u0441\u0442\u0443\u043F\u0430: \u042D\u043F\u043E\u0445\u0438</h1>\n        <p class=\"welcome-card__lead\">\u0421\u043E\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0443, \u0438\u0441\u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0441\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0440\u0430\u0437\u043D\u044B\u0445 \u0446\u0438\u0432\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u0439 \u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0435 \u044F\u0434\u0440\u043E.</p>\n        <form class=\"welcome-form\" novalidate>\n          <label for=\"team-name\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B</label>\n          <div class=\"welcome-form__field\">\n            <input id=\"team-name\" name=\"teamName\" type=\"text\" maxlength=\"").concat(MAX_TEAM_NAME_LENGTH, "\" autocomplete=\"organization\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0425\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u0438 \u0432\u0440\u0435\u043C\u0435\u043D\u0438\" aria-describedby=\"team-name-help team-name-error\" autofocus>\n            <span class=\"welcome-form__counter\" aria-live=\"polite\"><b>0</b> / ").concat(MAX_TEAM_NAME_LENGTH, "</span>\n          </div>\n          <p id=\"team-name-help\">\u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u0438\u043D\u043E\u0439 \u0434\u043E ").concat(MAX_TEAM_NAME_LENGTH, " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432.</p>\n          <p id=\"team-name-error\" class=\"welcome-form__error\" role=\"alert\"></p>\n          <button class=\"primary-button welcome-form__submit\" type=\"submit\">\u041D\u0430\u0447\u0430\u0442\u044C \u0438\u0433\u0440\u0443 ").concat((0,_components_icons__WEBPACK_IMPORTED_MODULE_0__.icon)('navigation-forward'), "</button>\n        </form>\n      </section>\n    </main>");
  var form = root.querySelector('.welcome-form');
  var input = form.querySelector('#team-name');
  var counter = form.querySelector('.welcome-form__counter b');
  var error = form.querySelector('.welcome-form__error');
  input.addEventListener('input', function () {
    counter.textContent = input.value.length;
    error.textContent = '';
    input.removeAttribute('aria-invalid');
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var teamName = input.value.trim();

    if (!teamName) {
      error.textContent = 'Введите название команды, чтобы начать игру.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }

    onStart(teamName);
  });
};

/***/ }),

/***/ "./js/services/storage.js":
/*!********************************!*\
  !*** ./js/services/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearState": () => (/* binding */ clearState),
/* harmony export */   "loadState": () => (/* binding */ loadState),
/* harmony export */   "saveState": () => (/* binding */ saveState)
/* harmony export */ });
var STORAGE_KEY = 'access-code-epochs-state';
var loadState = function loadState() {
  try {
    var saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Не удалось восстановить прогресс:', error);
    return null;
  }
};
var saveState = function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Не удалось сохранить прогресс:', error);
  }
};
var clearState = function clearState() {
  return window.localStorage.removeItem(STORAGE_KEY);
};

/***/ }),

/***/ "./js/state.js":
/*!*********************!*\
  !*** ./js/state.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ACHIEVEMENT_DEFINITIONS": () => (/* binding */ ACHIEVEMENT_DEFINITIONS),
/* harmony export */   "addArtifact": () => (/* binding */ addArtifact),
/* harmony export */   "completeQuestion": () => (/* binding */ completeQuestion),
/* harmony export */   "getState": () => (/* binding */ getState),
/* harmony export */   "openHint": () => (/* binding */ openHint),
/* harmony export */   "recoverQuestion": () => (/* binding */ recoverQuestion),
/* harmony export */   "registerAttempt": () => (/* binding */ registerAttempt),
/* harmony export */   "registerTeam": () => (/* binding */ registerTeam),
/* harmony export */   "setActiveQuestion": () => (/* binding */ setActiveQuestion),
/* harmony export */   "setCurrentStage": () => (/* binding */ setCurrentStage),
/* harmony export */   "startGame": () => (/* binding */ startGame),
/* harmony export */   "unlockStage": () => (/* binding */ unlockStage),
/* harmony export */   "updateAnswer": () => (/* binding */ updateAnswer),
/* harmony export */   "updateState": () => (/* binding */ updateState),
/* harmony export */   "updateTimer": () => (/* binding */ updateTimer)
/* harmony export */ });
/* harmony import */ var _services_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/storage */ "./js/services/storage.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var ACHIEVEMENT_DEFINITIONS = [{
  id: 'archive-keeper',
  title: 'Архивист эпох',
  description: 'Засчитано задание каждой из четырёх цивилизаций'
}, {
  id: 'flawless-decoder',
  title: 'Безошибочный дешифровщик',
  description: 'Этапы 2–3 пройдены с первой попытки без подсказок'
}, {
  id: 'master-sixty',
  title: 'Мастер шестидесяти',
  description: 'Исследованы делители 60 и дополнительное задание Вавилона'
}, {
  id: 'bit-keeper',
  title: 'Хранитель разрядов',
  description: 'Проверены двоичная запись 753 и диапазон 8 бит'
}, {
  id: 'full-access',
  title: 'Полный допуск',
  description: 'Собраны все артефакты и набрано не менее 90 баллов'
}];

var achievementIdsFor = function achievementIdsFor(candidate) {
  var completed = candidate.completedQuestions || [];
  var hints = candidate.openedHints || [];
  var attempts = candidate.attempts || {};
  var unlocked = [];
  if (['egypt-01', 'babylon-01', 'rome-01', 'rus-01'].every(function (id) {
    return completed.includes(id);
  })) unlocked.push('archive-keeper');
  var flawlessIds = ['egypt-01', 'babylon-01', 'rome-01', 'rus-01', 'cross-01', 'cross-02', 'cross-03'];
  if (flawlessIds.every(function (id) {
    return completed.includes(id) && attempts[id] === 1 && !hints.includes(id);
  })) unlocked.push('flawless-decoder');
  if (['babylon-03', 'cross-02'].every(function (id) {
    return completed.includes(id);
  })) unlocked.push('master-sixty');
  if (['cross-01', 'cross-04'].every(function (id) {
    return completed.includes(id);
  })) unlocked.push('bit-keeper');
  if ((candidate.artifacts || []).length >= 5 && candidate.score >= 90) unlocked.push('full-access');
  return unlocked;
};

var initialState = {
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
  recoveredQuestions: []
};
var restoredState = (0,_services_storage__WEBPACK_IMPORTED_MODULE_0__.loadState)();
var state = (restoredState === null || restoredState === void 0 ? void 0 : restoredState.schemaVersion) === initialState.schemaVersion ? _objectSpread(_objectSpread({}, initialState), restoredState) : _objectSpread({}, initialState);
state = _objectSpread(_objectSpread({}, state), {}, {
  achievements: achievementIdsFor(state)
});
var getState = function getState() {
  return state;
};
var registerTeam = function registerTeam(teamName) {
  return updateState({
    teamName: String(teamName).trim().slice(0, 24)
  });
};
var startGame = function startGame() {
  var _state$timers$expedit;

  return updateState({
    hasStarted: true,
    currentStage: 1,
    timers: _objectSpread(_objectSpread({}, state.timers), {}, {
      expedition: (_state$timers$expedit = state.timers.expedition) !== null && _state$timers$expedit !== void 0 && _state$timers$expedit.startedAt ? state.timers.expedition : {
        startedAt: Date.now()
      }
    })
  });
};
var updateState = function updateState(changes) {
  var next = _objectSpread(_objectSpread({}, state), changes);

  state = _objectSpread(_objectSpread({}, next), {}, {
    achievements: achievementIdsFor(next)
  });
  (0,_services_storage__WEBPACK_IMPORTED_MODULE_0__.saveState)(state);
  return state;
};
var updateAnswer = function updateAnswer(questionId, value) {
  return updateState({
    answers: _objectSpread(_objectSpread({}, state.answers), {}, _defineProperty({}, questionId, value))
  });
};
var registerAttempt = function registerAttempt(questionId) {
  var attempts = (state.attempts[questionId] || 0) + 1;
  updateState({
    attempts: _objectSpread(_objectSpread({}, state.attempts), {}, _defineProperty({}, questionId, attempts))
  });
  return attempts;
};
var openHint = function openHint(questionId) {
  if (!state.openedHints.includes(questionId)) {
    updateState({
      openedHints: [].concat(_toConsumableArray(state.openedHints), [questionId])
    });
  }
};
var completeQuestion = function completeQuestion(question) {
  if (state.completedQuestions.includes(question.id)) return state;
  var attempts = state.attempts[question.id] || 1;
  var practical = question.id === 'practical-01';
  var attemptPenalty = attempts === 2 ? practical ? 2 : 1 : attempts >= 3 ? practical ? 4 : 2 : 0;
  var hintPenalty = state.openedHints.includes(question.id) ? practical ? 2 : 1 : 0;
  var earned = Math.max(practical ? 2 : 1, question.points - attemptPenalty - hintPenalty);
  return updateState({
    score: Math.min(100, state.score + earned),
    completedQuestions: [].concat(_toConsumableArray(state.completedQuestions), [question.id])
  });
};
var setCurrentStage = function setCurrentStage(stage) {
  if (stage < 1 || stage > 6 || stage > state.unlockedStage) return state;
  return updateState({
    currentStage: stage
  });
};
var unlockStage = function unlockStage(stage) {
  var unlockedStage = Math.max(state.unlockedStage, Math.min(6, stage));
  return updateState({
    unlockedStage: unlockedStage
  });
};
var addArtifact = function addArtifact(artifactId) {
  if (state.artifacts.includes(artifactId)) return state;
  return updateState({
    artifacts: [].concat(_toConsumableArray(state.artifacts), [artifactId])
  });
};
var setActiveQuestion = function setActiveQuestion(stage, questionId) {
  return updateState({
    activeQuestionByStage: _objectSpread(_objectSpread({}, state.activeQuestionByStage), {}, _defineProperty({}, stage, questionId))
  });
};
var updateTimer = function updateTimer(timerId, value) {
  return updateState({
    timers: _objectSpread(_objectSpread({}, state.timers), {}, _defineProperty({}, timerId, _objectSpread(_objectSpread({}, state.timers[timerId] || {}), value)))
  });
};
var recoverQuestion = function recoverQuestion(question) {
  var recovered = state.recoveredQuestions || [];
  if (recovered.includes(question.id)) return state;
  var attempts = state.attempts[question.id] || 1;
  var practical = question.id === 'practical-01';
  var attemptLoss = attempts === 2 ? practical ? 2 : 1 : attempts >= 3 ? practical ? 4 : 2 : 0;
  var hintLoss = state.openedHints.includes(question.id) ? practical ? 2 : 1 : 0;
  var restored = Math.min(practical ? 4 : 2, attemptLoss + hintLoss);
  return updateState({
    score: Math.min(100, state.score + restored),
    recoveredQuestions: [].concat(_toConsumableArray(recovered), [question.id])
  });
};

/***/ }),

/***/ "./js/utils/normalization.js":
/*!***********************************!*\
  !*** ./js/utils/normalization.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeBinary": () => (/* binding */ normalizeBinary),
/* harmony export */   "normalizeByType": () => (/* binding */ normalizeByType),
/* harmony export */   "normalizeInteger": () => (/* binding */ normalizeInteger),
/* harmony export */   "normalizeIntegerList": () => (/* binding */ normalizeIntegerList),
/* harmony export */   "normalizeRoman": () => (/* binding */ normalizeRoman),
/* harmony export */   "normalizeText": () => (/* binding */ normalizeText)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var collapseSpaces = function collapseSpaces(value) {
  return String(value !== null && value !== void 0 ? value : '').trim().replace(/\s+/g, ' ');
};

var normalizeText = function normalizeText(value) {
  return collapseSpaces(value).toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
};
var normalizeRoman = function normalizeRoman(value) {
  return String(value !== null && value !== void 0 ? value : '').replace(/\s+/g, '').toUpperCase();
};
var normalizeInteger = function normalizeInteger(value) {
  var source = String(value !== null && value !== void 0 ? value : '').replace(/[\s\u00a0]/g, '');
  return /^[-+]?\d+$/.test(source) ? String(Number.parseInt(source, 10)) : null;
};
var normalizeBinary = function normalizeBinary(value) {
  return String(value !== null && value !== void 0 ? value : '').trim().replace(/^0b/i, '').replace(/[\s_]/g, '').replace(/\u2082$/, '');
};
var normalizeIntegerList = function normalizeIntegerList(value) {
  var parts = Array.isArray(value) ? value : String(value !== null && value !== void 0 ? value : '').trim().split(/[\s,;]+/);
  if (!parts.length || parts.some(function (part) {
    return !/^[-+]?\d+$/.test(String(part));
  })) return null;
  return _toConsumableArray(new Set(parts.map(Number))).sort(function (a, b) {
    return a - b;
  }).join(',');
};
var normalizeByType = function normalizeByType(type, value) {
  switch (type) {
    case 'integer':
      return normalizeInteger(value);

    case 'roman':
      return normalizeRoman(value);

    case 'binary':
      return normalizeBinary(value);

    case 'listOfIntegers':
      return normalizeIntegerList(value);

    case 'singleChoice':
    case 'text':
    default:
      return normalizeText(value);
  }
};

/***/ }),

/***/ "./js/utils/validators.js":
/*!********************************!*\
  !*** ./js/utils/validators.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateAnswer": () => (/* binding */ validateAnswer)
/* harmony export */ });
/* harmony import */ var _normalization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalization */ "./js/utils/normalization.js");

var ROMAN_PATTERN = /^(?=[MDCLXVI]+$)M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
var BINARY_PATTERN = /^[01]+$/;

var formatError = function formatError(type) {
  var messages = {
    integer: 'Введите целое число арабскими цифрами.',
    roman: 'Используйте корректную римскую запись буквами I, V, X, L, C, D и M.',
    binary: 'Используйте только нули и единицы.',
    listOfIntegers: 'Введите целые числа через пробел, запятую или точку с запятой.',
    singleChoice: 'Выберите один вариант ответа.',
    text: 'Введите ответ.'
  };
  return messages[type] || 'Заполните ответ.';
};

var getAcceptedAnswers = function getAcceptedAnswers(question) {
  var _question$acceptedAns;

  var accepted = (_question$acceptedAns = question.acceptedAnswers) !== null && _question$acceptedAns !== void 0 && _question$acceptedAns.length ? question.acceptedAnswers : [question.correctAnswer];
  return accepted.map(function (answer) {
    return (0,_normalization__WEBPACK_IMPORTED_MODULE_0__.normalizeByType)(question.type, answer);
  });
};

var validateAnswer = function validateAnswer(question, value) {
  var normalized = (0,_normalization__WEBPACK_IMPORTED_MODULE_0__.normalizeByType)(question.type, value);
  var empty = value == null || (Array.isArray(value) ? value.length === 0 : String(value).trim() === '');
  if (empty) return {
    valid: false,
    correct: false,
    normalized: normalized,
    message: formatError(question.type)
  };

  if (normalized == null) {
    return {
      valid: false,
      correct: false,
      normalized: normalized,
      message: formatError(question.type)
    };
  }

  if (question.type === 'roman' && !ROMAN_PATTERN.test(normalized)) {
    return {
      valid: false,
      correct: false,
      normalized: normalized,
      message: formatError(question.type)
    };
  }

  if (question.type === 'binary' && !BINARY_PATTERN.test(normalized)) {
    return {
      valid: false,
      correct: false,
      normalized: normalized,
      message: formatError(question.type)
    };
  }

  var correct = getAcceptedAnswers(question).includes(normalized);
  return {
    valid: true,
    correct: correct,
    normalized: normalized,
    message: ''
  };
};

/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./img/ancient-rus.png":
/*!*****************************!*\
  !*** ./img/ancient-rus.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "img/ancient-rus.cebb9941aa4ff0aaeebb.png";

/***/ }),

/***/ "./img/babylon.png":
/*!*************************!*\
  !*** ./img/babylon.png ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "img/babylon.db775b44ad8c8d27acc2.png";

/***/ }),

/***/ "./img/egypt.png":
/*!***********************!*\
  !*** ./img/egypt.png ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "img/egypt.ead5d147576245b12707.png";

/***/ }),

/***/ "./img/rome.png":
/*!**********************!*\
  !*** ./img/rome.png ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "img/rome.4ae01385ccc39580aa0f.png";

/***/ }),

/***/ "../docs/content/question-bank.json":
/*!******************************************!*\
  !*** ../docs/content/question-bank.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"schemaVersion":1,"title":"Код доступа: Эпохи","normalization":{"text":["trim","collapseSpaces","lowercase","replaceYoWithE"],"roman":["trim","removeSpaces","uppercase"],"integer":["trim","removeSpaces","parseBase10"],"listOfIntegers":["trim","splitOnCommaSpaceOrSemicolon","parseBase10","sortAscending","unique"]},"questions":[{"id":"egypt-01","civilization":"egypt","stage":2,"required":true,"type":"integer","points":5,"prompt":"Расшифруй египетскую запись 𓍢𓍢𓎆𓎆𓏺𓏺.","correctAnswer":222,"acceptedAnswers":["222"],"hint":"Сложи значения всех знаков: сотни, десятки и единицы.","errorExplanation":"Это непозиционная запись: 2 × 100 + 2 × 10 + 2 × 1 = 222."},{"id":"egypt-02","civilization":"egypt","stage":2,"required":false,"type":"singleChoice","points":5,"prompt":"Какой набор знаков нужен для числа 142?","options":["1 сотня, 4 десятка, 2 единицы","4 сотни, 1 десяток, 2 единицы","1 сотня, 2 десятка, 4 единицы"],"correctAnswer":"1 сотня, 4 десятка, 2 единицы","acceptedAnswers":["1 сотня, 4 десятка, 2 единицы"],"hint":"Разложи 142 на сотни, десятки и единицы.","errorExplanation":"142 = 100 + 40 + 2, поэтому нужны один знак 100, четыре знака 10 и два знака 1."},{"id":"egypt-03","civilization":"egypt","stage":2,"required":false,"type":"singleChoice","points":5,"prompt":"Почему перестановка египетских числовых знаков не меняет значение учебной записи?","options":["Значения знаков складываются и не зависят от позиции","Каждая позиция умножает знак на 10","В записи всегда только один знак"],"correctAnswer":"Значения знаков складываются и не зависят от позиции","acceptedAnswers":["Значения знаков складываются и не зависят от позиции"],"hint":"Вспомни различие позиционной и непозиционной систем.","errorExplanation":"Египетская система непозиционная: каждый знак сохраняет собственное значение, а итог получают сложением."},{"id":"babylon-01","civilization":"babylon","stage":2,"required":true,"type":"integer","points":5,"prompt":"В учебной шестидесятеричной записи 2,5 стоят два разряда. Какое это десятичное число?","correctAnswer":125,"acceptedAnswers":["125"],"hint":"Левый разряд означает количество шестидесятков.","errorExplanation":"2,5 = 2 × 60 + 5 = 125."},{"id":"babylon-02","civilization":"babylon","stage":2,"required":false,"type":"text","points":5,"prompt":"Запиши число 3600 в учебной шестидесятеричной форме с разрядами через запятую.","correctAnswer":"1,0,0","acceptedAnswers":["1,0,0","1, 0, 0"],"hint":"3600 = 60².","errorExplanation":"Одна единица в третьем разряде означает 1 × 60², а два нулевых разряда сохраняют её место: 1,0,0."},{"id":"babylon-03","civilization":"babylon","stage":3,"required":false,"type":"multiChoice","points":5,"prompt":"Выбери все числа, на которые 60 делится без остатка.","options":[2,3,4,5,6,7],"correctAnswer":[2,3,4,5,6],"acceptedAnswers":["2,3,4,5,6","2, 3, 4, 5, 6"],"hint":"Проверь каждое деление; один вариант лишний.","errorExplanation":"60 делится на 2, 3, 4, 5 и 6, но не делится на 7."},{"id":"rome-01","civilization":"rome","stage":2,"required":true,"type":"roman","points":5,"prompt":"Запиши число 753 римскими цифрами.","correctAnswer":"DCCLIII","acceptedAnswers":["DCCLIII"],"hint":"Разложи число как 500 + 200 + 50 + 3.","errorExplanation":"753 = D (500) + CC (200) + L (50) + III (3), поэтому DCCLIII."},{"id":"rome-02","civilization":"rome","stage":1,"required":true,"type":"singleChoice","points":5,"prompt":"Какая запись числа 99 каноническая?","options":["IC","XCIX","LXXXXVIIII"],"correctAnswer":"XCIX","acceptedAnswers":["XCIX"],"hint":"Используй только разрешённые вычитательные пары.","errorExplanation":"99 = 90 + 9 = XC + IX. Пара IC не входит в канонический набор IV, IX, XL, XC, CD, CM."},{"id":"rome-03","civilization":"rome","stage":2,"required":false,"type":"integer","points":5,"prompt":"Расшифруй римское число CMXC.","correctAnswer":990,"acceptedAnswers":["990"],"hint":"Раздели запись на две разрешённые пары.","errorExplanation":"CM = 900, XC = 90; вместе 990."},{"id":"rus-01","civilization":"ancient-rus","stage":2,"required":true,"type":"integer","points":5,"prompt":"Расшифруй запись ЦПИ под титлом, если Ц=900, П=80, И=8.","correctAnswer":988,"acceptedAnswers":["988"],"hint":"Сложи значения трёх букв.","errorExplanation":"ЦПИ под титлом = 900 + 80 + 8 = 988, традиционная дата Крещения Руси."},{"id":"rus-02","civilization":"ancient-rus","stage":2,"required":false,"type":"singleChoice","points":5,"prompt":"Для чего над буквенной числовой записью ставили титло?","options":["Чтобы показать, что буквы имеют числовое значение","Чтобы умножить число на тысячу","Чтобы обозначить отрицательное число"],"correctAnswer":"Чтобы показать, что буквы имеют числовое значение","acceptedAnswers":["Чтобы показать, что буквы имеют числовое значение"],"hint":"Одна и та же буква могла участвовать и в слове, и в записи числа.","errorExplanation":"Титло помогало распознать буквенную последовательность как число, а не как обычный текст."},{"id":"rus-03","civilization":"ancient-rus","stage":2,"required":false,"type":"text","points":5,"prompt":"Запиши число 23 буквами из набора К=20, Г=3 и укажи знак над записью.","correctAnswer":"КГ под титлом","acceptedAnswers":["КГ под титлом","КГ, под титлом","КГ с титлом"],"hint":"Сначала десятки, затем единицы; над всей записью нужен специальный знак.","errorExplanation":"23 = 20 + 3, поэтому КГ; числовое значение отмечается титлом."},{"id":"cross-01","civilization":"cross-system","stage":3,"required":true,"type":"binary","points":5,"prompt":"Запиши десятичное число 753 в двоичной системе без ведущих нулей.","correctAnswer":"1011110001","acceptedAnswers":["1011110001","1011110001₂"],"hint":"753 = 512 + 128 + 64 + 32 + 16 + 1.","errorExplanation":"Единицы стоят в разрядах 512, 128, 64, 32, 16 и 1: 1011110001₂."},{"id":"cross-02","civilization":"cross-system","stage":3,"required":true,"type":"listOfIntegers","points":5,"prompt":"Перечисли все положительные делители 60 по возрастанию.","correctAnswer":[1,2,3,4,5,6,10,12,15,20,30,60],"acceptedAnswers":["1,2,3,4,5,6,10,12,15,20,30,60","1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60"],"hint":"Ищи пары множителей: 1×60, 2×30, 3×20, 4×15, 5×12, 6×10.","errorExplanation":"У 60 двенадцать положительных делителей: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60."},{"id":"cross-03","civilization":"cross-system","stage":3,"required":true,"type":"singleChoice","points":5,"prompt":"Какой вывод корректен при сравнении делителей 60 и 100?","options":["У 60 больше делителей: 12 против 9","У 100 больше делителей: 12 против 9","У обоих чисел по 10 делителей"],"correctAnswer":"У 60 больше делителей: 12 против 9","acceptedAnswers":["У 60 больше делителей: 12 против 9"],"hint":"Сосчитай элементы в двух списках, а не сравнивай величину чисел.","errorExplanation":"У 60 — 12 положительных делителей, у 100 — 9; поэтому 60 удобно делить на большее число малых целых частей."},{"id":"cross-04","civilization":"cross-system","stage":4,"required":true,"type":"singleChoice","points":5,"prompt":"Почему число 3600 не помещается в один беззнаковый 8-битный разряд?","options":["Максимум такого разряда — 255, а 3600 больше","В двоичной системе нельзя записать 3600","Intel 4004 использовал 4-битный байт"],"correctAnswer":"Максимум такого разряда — 255, а 3600 больше","acceptedAnswers":["Максимум такого разряда — 255, а 3600 больше"],"hint":"Для n бит без знака максимум равен 2ⁿ − 1.","errorExplanation":"8 бит дают 2⁸ = 256 комбинаций, то есть значения 0–255. Числу 3600 нужно 12 бит; разрядность Intel 4004 здесь не является размером байта."},{"id":"final-01","civilization":"final","stage":1,"required":true,"type":"rubricText","points":5,"prompt":"Сформулируй гипотезу: от каких практических условий мог зависеть выбор способа записи чисел?","correctAnswer":"Упоминание задач счёта или измерения, доступных знаков или инструментов и удобства вычислений.","acceptedAnswers":[],"requiredConcepts":["практическая задача счёта или измерения","доступные знаки или инструменты","удобство записи или вычислений"],"hint":"Свяжи систему не только с пальцами, но и с тем, что считали, чем записывали и какие действия выполняли.","errorExplanation":"Сильная гипотеза связывает систему с практикой, носителем записи и удобством операций; одну недоказанную причину нельзя выдавать за единственную."},{"id":"final-02","civilization":"final","stage":5,"required":true,"type":"rubricText","points":5,"prompt":"Почему основание системы меняет длину записи, но не само значение числа? Приведи пример с числом 255.","correctAnswer":"255₁₀ = 11111111₂ = CF₂₀: меняются алфавит и число разрядов, значение остаётся 255.","acceptedAnswers":[],"requiredConcepts":["одно значение","разные алфавиты или разряды","255 = 11111111₂","255 = CF₂₀"],"hint":"Сравни количество символов в двоичной, десятичной и двадцатеричной записи.","errorExplanation":"Основание задаёт веса разрядов и набор цифр, а не изменяет количество объектов, представленное числом."},{"id":"final-03","civilization":"final","stage":5,"required":true,"type":"rubricText","points":5,"prompt":"Назови одно преимущество и одно ограничение непозиционной системы на примере Египта или Рима.","correctAnswer":"Пример: значение отдельных знаков легко складывать, но длинные числа громоздки и письменные вычисления неудобны.","acceptedAnswers":[],"requiredConcepts":["корректное преимущество","корректное ограничение","пример Египта или Рима"],"hint":"Подумай отдельно о чтении короткой записи и о вычислениях с большими числами.","errorExplanation":"Ответ должен содержать обе стороны сравнения и связывать их с конкретной системой, а не объявлять одну систему просто «хуже»."},{"id":"practical-01","civilization":"practical","stage":4,"required":true,"type":"rubricCase","points":10,"prompt":"Архив хранит число 3600. Подготовь карточку совместимости: двоичная запись, минимальное число бит, результат проверки для диапазона 0–255 и корректный вывод об Intel 4004.","correctAnswer":"111000010000₂; 12 бит; в 8 бит не помещается; Intel 4004 — 4-битный процессор, но это не означает «4-битный байт».","acceptedAnswers":[],"requiredConcepts":["111000010000","12 бит","не помещается в 0–255","4004 — 4-битный процессор","не называть 4-битным байтом"],"hint":"Сначала переведи 3600, затем найди старший занятый разряд и отдельно сравни значение с 255.","errorExplanation":"3600 = 2048 + 1024 + 512 + 16 = 111000010000₂. Нужно 12 бит. Диапазон 8 бит заканчивается на 255, а 4-битная разрядность 4004 описывает процессор, не размер байта."}]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_focus-visible_dist_focus-visible_js"], () => (__webpack_require__("./js/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;