import React from 'react';
import listItemStyles from './burger-ingredient.module.css';

// components
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// PropTypes
import { ingredientPropTypes } from '../../utils/commonPropTypes';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

export default function BurgerIngredient({ ingredient }) {
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  return (
    <li className={listItemStyles.listItem} ref={dragRef}>
      <Link
        key={ingredient._id}
        style={{ textDecoration: 'none' }}
        to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}
      >
        {ingredient.count > 0 && <Counter count={ingredient.count} size='default' />}
        <img className={listItemStyles.image} src={ingredient.image} alt={ingredient.name} />
        <p className={listItemStyles.price}>
          <span className={listItemStyles.priceDigits}>{ingredient.price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={`text text_type_main-default ${listItemStyles.name}`}>{ingredient.name}</p>
      </Link>
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};
