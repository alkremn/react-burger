import React from 'react';
import styles from './response-message.module.css';
import { PropTypes } from 'prop-types';

export const ResponseMessage = ({ message }) => {
  return <p className={styles.message}>{message}</p>;
};

ResponseMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
