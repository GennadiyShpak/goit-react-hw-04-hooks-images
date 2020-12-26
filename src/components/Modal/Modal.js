import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  function handleBackdropClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className="Modal__backdrop" onClick={handleBackdropClick}>
      <div className="Modal__content">{children}</div>
    </div>,
    modalRoot,
  );
}
