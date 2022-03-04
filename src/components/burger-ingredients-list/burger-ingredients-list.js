import React, { useState } from 'react';
import BurgerIngredient from './../burger-ingredient/burger-ingredient';
import { ingredientPropTypes } from '../../utils/commonPropTypes';
import listStyles from './burger-ingredients-list.module.css';
import { PropTypes } from 'prop-types';

export default function BurgerIngredientsList({ title, ingredients }) {
  const [countArray] = useState([1, 4, 1, 0, 5, 1, 0, 0]);
  return (
    <>
      <h2 className={`text text_type_main-default ${listStyles.title}`}>
        {title}
      </h2>
      <ul className={listStyles.list}>
        {ingredients &&
          ingredients.map((item, i) => (
            <BurgerIngredient
              key={item._id}
              ingredient={item}
              count={countArray[i]}
            />
          ))}
      </ul>
    </>
  );
}

BurgerIngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};
