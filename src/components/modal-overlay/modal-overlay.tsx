import React, { MouseEvent, ReactNode } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
  children?: ReactNode;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function ModalOverlay({ children, onClose }: IModalOverlayProps) {
  return (
    <div className={`popup ${modalOverlayStyles.button}`} onClick={onClose}>
      {children}
    </div>
  );
}
