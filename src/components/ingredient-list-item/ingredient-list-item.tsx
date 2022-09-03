import React from 'react';
import styles from './ingredient-list-item.module.css';
import { IOrderIngredient } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IIngredientListItemProps {
  orderIngredient: IOrderIngredient;
}

export const IngredientListItem = ({ orderIngredient }: IIngredientListItemProps) => {
  return (
    <li className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={orderIngredient.ingredient.image}
            alt='ingredient icon'
          />
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>
          {orderIngredient.ingredient.name}
        </p>
      </div>
      <p className={styles.price}>
        <span className={styles.countPrice}>
          {orderIngredient.count} x {orderIngredient.ingredient.price}
        </span>
        <CurrencyIcon type='primary' />
      </p>
    </li>
  );
};
