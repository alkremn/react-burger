import {
  IGetAddDetailedIngredientAction,
  IGetAddSelectedBunAction,
  IGetAddSelectedIngredientAction,
  IGetAddSelectedIngredientsAction,
  IGetDecrementIngredientCountAction,
  IGetFetchIngredientsFailAction,
  IGetFetchIngredientsSuccessAction,
  IGetIncrementIngredientCountAction,
  IGetRemoveDetailedIngredientAction,
  IGetRemoveSelectedBunAction,
  IGetRemoveSelectedIngredientAction,
  IGetRemoveSelectedIngredientsAction,
} from './../types/ingredientsTypes';
import { IIngredient } from './../../utils/types';

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
} from '../constants/ingredientConstants';

export function getAddSelectedBunAction(selectedBun: IIngredient): IGetAddSelectedBunAction {
  return { type: ADD_SELECTED_BUN, payload: selectedBun };
}

export function getFetchIngredientsSuccessAction(
  ingredients: IIngredient[]
): IGetFetchIngredientsSuccessAction {
  return { type: FETCH_INGREDIENTS_SUCCESS, payload: ingredients };
}

export function getFetchIngredientsFailAction(error: string): IGetFetchIngredientsFailAction {
  return { type: FETCH_INGREDIENTS_FAIL, payload: error };
}

export function getAddSelectedIngredientsAction(
  ingredients: IIngredient[]
): IGetAddSelectedIngredientsAction {
  return { type: ADD_SELECTED_INGREDIENTS, payload: ingredients };
}

export function getIncrementIngredientCountAction(
  ingredient: IIngredient
): IGetIncrementIngredientCountAction {
  return { type: INCREMENT_INGREDIENT_COUNT, payload: ingredient._id };
}

export function getDecrementIngredientCountAction(
  ingredient: IIngredient
): IGetDecrementIngredientCountAction {
  return { type: DECREMENT_INGREDIENT_COUNT, payload: ingredient._id };
}

export function getAddSelectedIngredientAction(
  updatedIngredient: IIngredient
): IGetAddSelectedIngredientAction {
  return { type: ADD_SELECTED_INGREDIENT, payload: updatedIngredient };
}

export function getRemoveSelectedIngredientsAction(): IGetRemoveSelectedIngredientsAction {
  return { type: REMOVE_SELECTED_INGREDIENTS };
}
export function getRemoveSelectedBunAction(): IGetRemoveSelectedBunAction {
  return { type: REMOVE_SELECTED_BUN };
}

export function getRemoveSelectedIngredientAction(
  ingredient: IIngredient
): IGetRemoveSelectedIngredientAction {
  return { type: REMOVE_SELECTED_INGREDIENT, payload: ingredient.uniqueId };
}

export function getAddDetailedIngredientAction(
  ingredient: IIngredient
): IGetAddDetailedIngredientAction {
  return { type: ADD_DETAILED_INGREDIENT, payload: ingredient };
}

export function getRemoveDetailedIngredientAction(): IGetRemoveDetailedIngredientAction {
  return { type: REMOVE_DETAILED_INGREDIENT };
}
