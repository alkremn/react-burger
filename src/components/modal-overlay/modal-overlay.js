import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import { PropTypes } from 'prop-types';

export default function ModalOverlay({ children, onClose }) {
  return (
    <div className={`popup ${modalOverlayStyles.button}`} onClick={onClose}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
