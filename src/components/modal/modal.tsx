import React, { KeyboardEvent, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

interface IModelProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: IModelProps) {
  const handleClosePopup = useCallback(
    (e: MouseEvent) => {
      if (e.target.classList.contains('popup') || e.target.classList.contains('closeButton')) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClose={handleClosePopup}>
      <div className={`${modalStyles.container}`}>
        <button className={`closeButton ${modalStyles.closeButton}`} onClick={handleClosePopup} />
        {children}
      </div>
    </ModalOverlay>,
    modalRoot!
  );
}
