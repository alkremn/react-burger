import React, { useEffect, useState } from 'react';
import { IngredientListItem } from '../ingredient-list-item/ingredient-list-item';
import styles from './ingredient-list.module.css';
import { useSelector } from '../../utils/hooks';
import { TIngredientsState } from '../../services/reducers/ingredientsReducer';
import { IOrderIngredient } from '../../utils/types';

interface IIngredientListProps {
  ingredientIds: string[] | undefined;
}

export const IngredientList = ({ ingredientIds }: IIngredientListProps) => {
  const { ingredients } = useSelector<TIngredientsState>(store => store.ingredients);
  const [orderIngredients, setOrderIngredients] = useState<IOrderIngredient[] | null>(null);

  useEffect(() => {
    const uniqueIds = new Set(ingredientIds);
    const orderIngredients: IOrderIngredient[] = [];

    uniqueIds.forEach(id => {
      const matchedIds = ingredientIds?.filter(ingredientId => ingredientId !== id);
      const foundIngredient = ingredients.filter(ingredient => ingredient._id === id);
      orderIngredients.push({ ingredient: foundIngredient[0], count: matchedIds?.length });
    });
    setOrderIngredients(orderIngredients);
  }, [ingredientIds, ingredients]);

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
