import React from 'react';
import styles from './not-found.module.css';
import imageFile from '../../images/not_found.png';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageFile} alt="sad face" />
      <h2 className={`text text_type_main-large ${styles.title}`}>
        404 Не найдено
      </h2>
    </div>
  );
};
