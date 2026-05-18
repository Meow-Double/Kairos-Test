import { createModal } from '../shared/ui/Modal';

export const uploadLearMoreModal = () => {
  const { openModal, closeModal } = createModal({
    modalId: `learnmore-modal`,
    overlayId: `learnmore-overlay`,
  });

  const learMoreBtn = document.querySelector('#btn-learnmore');
  const closeBtn = document.querySelector('#learnmore-modal-close');
  const modalBody = document.querySelector('.modal__learnmore');

  learMoreBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  modalBody?.addEventListener('click', (e) => e.stopPropagation());
};

export const uploadVideoModal = () => {
  const { openModal, closeModal } = createModal({
    modalId: `modal-player`,
    overlayId: `overlay-player`,
  });

  const playerBtn = document.querySelector('#btn-videoplay');
  const closeBtn = document.querySelector('#player-modal-close');
  const modalBody = document.querySelector('.modal__player');

  playerBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  modalBody?.addEventListener('click', (e) => e.stopPropagation());
};
