interface ModalProps {
  modalId: string;
  overlayId: string;
}

export const createModal = (props: ModalProps) => {
  const { modalId, overlayId } = props;

  const modalElement = document.getElementById(modalId);
  const overlayElement = document.getElementById(overlayId);

  const openModal = () => {
    modalElement?.classList.add('modal--open');
    document.body.style.overflowY = 'hidden';
  };

  const closeModal = () => {
    modalElement?.classList.remove('modal--open');
    document.body.style.overflowY = 'auto';
  };

  modalElement?.addEventListener('click', (e) => {
    e.preventDefault();
  });

  overlayElement?.addEventListener('click', closeModal);

  return {
    openModal,
    closeModal,
  };
};
