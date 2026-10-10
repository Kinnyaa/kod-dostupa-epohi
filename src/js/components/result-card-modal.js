import { icon } from './icons';

export const openResultCardModal = (sourceCard) => {
  if (!sourceCard) return;
  document.querySelector('.result-card-modal')?.remove();

  const dialog = document.createElement('dialog');
  dialog.className = 'result-card-modal';
  dialog.setAttribute('aria-labelledby', 'result-card-modal-title');
  dialog.innerHTML = `<div class="result-card-modal__header"><div><p>Итоговый документ</p><h2 id="result-card-modal-title">Карточка команды</h2></div><button type="button" class="result-card-modal__close" aria-label="Закрыть окно">×</button></div><div class="result-card-modal__body"></div><div class="result-card-modal__actions"><button type="button" class="stage-nav-button result-card-modal__cancel">Закрыть</button></div>`;

  const card = sourceCard.cloneNode(true);
  card.removeAttribute('id');
  card.classList.remove('results-print-card');
  card.classList.add('result-card-modal__card');
  dialog.querySelector('.result-card-modal__body').append(card);
  document.body.append(dialog);

  const close = () => dialog.close();
  dialog.querySelector('.result-card-modal__close').addEventListener('click', close);
  dialog.querySelector('.result-card-modal__cancel').addEventListener('click', close);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => dialog.remove(), { once: true });
  dialog.showModal();
  dialog.querySelector('.result-card-modal__close').focus();
};
