import React from 'react';
import styles from './response-message.module.css';

export const ResponseMessage = ({ message }: {message: string}) => {
  return <p className={styles.message}>{message}</p>;
};
