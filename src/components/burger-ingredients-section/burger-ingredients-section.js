import React from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import ingredientsSectionStyles from './burger-ingredients-section.module.css';

export default function BurgerIngredientsSection({
  onScroll,
  title,
  ingredients,
  onPopupOpen,
}) {
  return (
    <li className={ingredientsSectionStyles.sectionContainer}>
      <h2
        className={`text text_type_main-default ${ingredientsSectionStyles.title}`}
        onScroll={e => onScroll(e)}
      >
        {title}
      </h2>
      <ul className={ingredientsSectionStyles.list}>
        {ingredients.map((item, i) => (
          <BurgerIngredient
            key={item._id}
            ingredient={item}
            count={1}
            onPopupOpen={onPopupOpen}
          />
        ))}
      </ul>
    </li>
  );
}
