import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import listItemStyles from './burger-ingredient.module.css';

export default function BurgerIngredient({ ingredient }) {
  return (
    <li className={listItemStyles.list_item}>
      <img
        className={listItemStyles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p className={listItemStyles.price}>
        <span className={listItemStyles.price_digits}>{ingredient.price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={listItemStyles.name}>{ingredient.name}</p>
    </li>
  );
}
