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
import { useDrag } from 'react-dnd';

export default function BurgerIngredient({ ingredient, onPopupOpen }) {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ingredient },
  });

  return (
    <li
      className={listItemStyles.listItem}
      onClick={() => onPopupOpen(ingredient._id)}
      ref={dragRef}
    >
      {ingredient.count > 0 && (
        <Counter count={ingredient.count} size='default' />
      )}
      <img
        className={listItemStyles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p className={listItemStyles.price}>
        <span className={listItemStyles.priceDigits}>{ingredient.price}</span>
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
  onPopupOpen: PropTypes.func.isRequired,
};
