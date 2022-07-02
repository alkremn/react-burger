import {
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAIL,
  ADD_SELECTED_BUN,
  ADD_SELECTED_INGREDIENT,
  ADD_SELECTED_INGREDIENTS,
  INCREMENT_INGREDIENT_COUNT,
  DECREMENT_INGREDIENT_COUNT,
  REMOVE_SELECTED_INGREDIENT,
  REMOVE_SELECTED_INGREDIENTS,
  REMOVE_SELECTED_BUN,
  ADD_DETAILED_INGREDIENT,
  REMOVE_DETAILED_INGREDIENT,
} from './../constants/ingredientsContstants';

export function getAddSelectedBunAction(selectedBun) {
  return { type: ADD_SELECTED_BUN, payload: selectedBun };
}

export function getFetchIngredientsSuccessAction(resonse) {
  return { type: FETCH_INGREDIENTS_SUCCESS, payload: resonse.data };
}

export function getFetchIngredientsFailAction(resonse) {
  return { type: FETCH_INGREDIENTS_FAIL, payload: resonse.message };
}

export function getAddSelectedIngredientsAction(ingredients) {
  return { type: ADD_SELECTED_INGREDIENTS, payload: ingredients };
}

export function getIncrementIngredientCountAction(ingredient) {
  return { type: INCREMENT_INGREDIENT_COUNT, payload: ingredient._id };
}

export function getDecrementIngredientCountAction(ingredient) {
  return { type: DECREMENT_INGREDIENT_COUNT, payload: ingredient._id };
}

export function getAddSelectedIngredientAction(updatedIngredient) {
  return { type: ADD_SELECTED_INGREDIENT, payload: updatedIngredient };
}

export function getRemoveSelectedIngredientsAction() {
  return { type: REMOVE_SELECTED_INGREDIENTS };
}
export function getRemoveSelectedBunAction() {
  return { type: REMOVE_SELECTED_BUN };
}

export function getRemoveSelectedIngredientAction(ingredient) {
  return { type: REMOVE_SELECTED_INGREDIENT, payload: ingredient.uniqueId };
}

export function getAddDetailedIngredientAction(ingredient) {
  return { type: ADD_DETAILED_INGREDIENT, payload: ingredient };
}

export function getARemoveDetailedIngredientAction() {
  return { type: REMOVE_DETAILED_INGREDIENT };
}
