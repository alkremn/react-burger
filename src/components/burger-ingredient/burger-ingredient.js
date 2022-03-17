import React from 'react';
import listItemStyles from './burger-ingredient.module.css';

// components
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

// PropTypes
import { ingredientPropTypes } from '../../utils/commonPropTypes';
import { PropTypes } from 'prop-types';

export default function BurgerIngredient({ ingredient, count, onPopupOpen }) {
  return (
    <li
      className={listItemStyles.list_item}
      onClick={() => onPopupOpen(ingredient._id)}
    >
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
      <p className={`text text_type_main-default ${listItemStyles.name}`}>
        {ingredient.name}
      </p>
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  count: PropTypes.number,
  onPopupOpen: PropTypes.func.isRequired,
};
