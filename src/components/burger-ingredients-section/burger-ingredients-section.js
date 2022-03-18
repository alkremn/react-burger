import React from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientsSectionStyles from './burger-ingredients-section.module.css';
import { PropTypes } from 'prop-types';
import { ingredientPropTypes } from './../../utils/commonPropTypes';

export default function BurgerIngredientsSection({
  title,
  ingredients,
  onPopupOpen,
  listRef,
  headerRef,
}) {
  return (
    <li className={ingredientsSectionStyles.sectionContainer}>
      <h2
        className={`text text_type_main-default ${ingredientsSectionStyles.title}`}
        ref={headerRef}
      >
        {title}
      </h2>
      <ul className={ingredientsSectionStyles.list} ref={listRef}>
        {ingredients.map(item => (
          <BurgerIngredient
            key={item._id}
            ingredient={item}
            onPopupOpen={onPopupOpen}
          />
        ))}
      </ul>
    </li>
  );
}

BurgerIngredientsSection.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  onPopupOpen: PropTypes.func.isRequired,
  listRef: PropTypes.func.isRequired,
  headerRef: PropTypes.object.isRequired,
};
