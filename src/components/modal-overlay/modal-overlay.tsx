import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
  children?: React.ReactNode;
  onClose: () => void;
}

export default function ModalOverlay({ children, onClose }: IModalOverlayProps) {
  return (
    <div className={`popup ${modalOverlayStyles.button}`} onClick={onClose}>
      {children}
    </div>
  );
}
