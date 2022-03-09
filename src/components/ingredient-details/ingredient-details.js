import React from 'react';
import NutritionFact from '../nutrition-fact/nutrition-fact';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { ingredientPropTypes } from './../../utils/commonPropTypes';

export default function IngredientDetails({ ingredient }) {
  return (
    <div className={ingredientDetailsStyles.container}>
      <h2
        className={`text text_type_main-large ${ingredientDetailsStyles.title}`}
      >
        Детали ингредиента
      </h2>
      <img src={ingredient?.image_large} alt={ingredient?.name} />
      <p
        className={`text text_type_main-large ${ingredientDetailsStyles.name}`}
      >
        {ingredient?.name}
      </p>
      <div className={ingredientDetailsStyles.nutritionList}>
        <NutritionFact title='Калории,ккал' value={ingredient?.calories} />
        <NutritionFact title='Белки, г' value={ingredient?.proteins} />
        <NutritionFact title='Жиры, г' value={ingredient?.fat} />
        <NutritionFact title='Углеводы, г' value={ingredient?.carbohydrates} />
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};
