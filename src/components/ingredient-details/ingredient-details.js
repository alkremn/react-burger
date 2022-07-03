import React, { useEffect, useState } from 'react';
import NutritionFact from '../nutrition-fact/nutrition-fact';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function IngredientDetails() {
  const { ingredients } = useSelector(store => store.ingredients);
  const { id } = useParams();

  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    if (ingredients.length > 0) {
      const selectedIngredient = ingredients.find(i => i._id === id);
      setIngredient(selectedIngredient);
    }
  }, [id, ingredients]);

  return (
    <div className={ingredientDetailsStyles.container}>
      <h2 className={`text text_type_main-large ${ingredientDetailsStyles.title}`}>
        Детали ингредиента
      </h2>
      <img src={ingredient?.image_large} alt={ingredient?.name} />
      <p className={`text text_type_main-large ${ingredientDetailsStyles.name}`}>
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
