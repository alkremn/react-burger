import React from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { PropTypes } from 'prop-types';

const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, onClose }) {
  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`${modalStyles.container}`}>
        <button
          className={`closeButton ${modalStyles.closeButton}`}
          onClick={onClose}
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
