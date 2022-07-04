import React from 'react';
import styles from './ingredient.module.css';
import NutritionFact from '../components/nutrition-fact/nutrition-fact';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

export const IngredientPage = () => {
  const { ingredients } = useSelector(store => store.ingredients);
  const [ingredient, setIngredient] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (ingredients.length > 0) {
      const foundIngredient = ingredients.find(i => i._id === id);
      if (foundIngredient) {
        setIngredient(foundIngredient);
      } else {
        history.push('/not-found');
      }
    }
  }, [id, ingredients, history]);

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h2>
      <img src={ingredient?.image_large} alt={ingredient?.name} />
      <p className={`text text_type_main-large ${styles.name}`}>{ingredient?.name}</p>
      <div className={styles.nutritionList}>
        <NutritionFact title='Калории,ккал' value={ingredient?.calories} />
        <NutritionFact title='Белки, г' value={ingredient?.proteins} />
        <NutritionFact title='Жиры, г' value={ingredient?.fat} />
        <NutritionFact title='Углеводы, г' value={ingredient?.carbohydrates} />
      </div>
    </div>
  );
};
