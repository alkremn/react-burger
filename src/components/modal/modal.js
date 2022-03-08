import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
const modalRoot = document.getElementById('react-modals');

export default function Modal({ children, onClose }) {
  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`popup ${modalStyles.container}`}>
        <h3 className={`text text_type_main-large {modalStyles.title}`}>
          Детали ингредиента
        </h3>
        <button className={modalStyles.closeButton} onClick={onClose}>
          <CloseIcon type='primary' />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}
