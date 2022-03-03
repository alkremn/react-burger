import React from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientPropTypes } from '../../utils/commonPropTypes';
import listItemStyles from './burger-ingredient.module.css';
import { PropTypes } from 'prop-types';

export default function BurgerIngredient({ ingredient, count }) {
  return (
    <li className={listItemStyles.list_item}>
      {count > 0 && <Counter count={count} size='default' />}
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

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  count: PropTypes.number,
};
