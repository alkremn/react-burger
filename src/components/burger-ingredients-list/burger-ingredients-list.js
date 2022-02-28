import React from 'react';
import BurgerIngredient from './../burger-ingredient/burger-ingredient';
import listStyles from './burger-ingredients-list.module.css';

export default function BurgerIngredientsList({ title, ingredients }) {
  return (
    <>
      <h2 className={listStyles.title}>{title}</h2>
      <ul className={listStyles.list}>
        {ingredients.map(item => (
          <BurgerIngredient key={item._id} ingredient={item} />
        ))}
      </ul>
    </>
  );
}
