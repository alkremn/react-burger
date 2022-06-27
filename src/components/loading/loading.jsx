import React from 'react';
import styles from './loading.module.css';

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingGear}></div>
    </div>
  );
};