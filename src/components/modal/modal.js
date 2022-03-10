import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { PropTypes } from 'prop-types';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, onClose }) {
  const handleClosePopup = useCallback(
    e => {
      if (
        e.target.classList.contains('popup') ||
        e.target.classList.contains('closeButton')
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const closeByEscape = e => {
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
        <button
          className={`closeButton ${modalStyles.closeButton}`}
          onClick={handleClosePopup}
        />
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
