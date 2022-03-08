import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay({ children, onClose }) {
  return (
    <div className={modalOverlayStyles.button} onClick={onClose}>
      {children}
    </div>
  );
}
