import React from 'react';
import { IngredientListItem } from '../ingredient-list-item/ingredient-list-item';
import styles from './ingredient-list.module.css';
import { IOrderIngredient } from '../../utils/types';

interface IIngredientListProps {
  orderIngredients: IOrderIngredient[] | null;
}

export const IngredientList = ({ orderIngredients }: IIngredientListProps) => {
  return (
    <ul className={styles.ingredientList}>
      {orderIngredients?.map(orderIngredient => (
        <IngredientListItem
          key={orderIngredient.ingredient._id}
          orderIngredient={orderIngredient}
        />
      ))}
    </ul>
  );
};
