import { IIngredient } from '../../utils/types';
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
} from '../constants/ingredientContstants';

export interface IGetAddSelectedBunAction {
  readonly type: typeof ADD_SELECTED_BUN;
  readonly payload: IIngredient;
}

export interface IGetFetchIngredientsSuccessAction {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}

export interface IGetFetchIngredientsFailAction {
  readonly type: typeof FETCH_INGREDIENTS_FAIL;
  readonly payload: String;
}

export interface IGetAddSelectedIngredientsAction {
  readonly type: typeof ADD_SELECTED_INGREDIENTS;
  readonly payload: IIngredient[];
}

export interface IGetIncrementIngredientCountAction {
  readonly type: typeof INCREMENT_INGREDIENT_COUNT;
  readonly payload: string;
}

export interface IGetDecrementIngredientCountAction {
  readonly type: typeof DECREMENT_INGREDIENT_COUNT;
  readonly payload: string;
}

export interface IGetAddSelectedIngredientAction {
  readonly type: typeof ADD_SELECTED_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IGetRemoveSelectedIngredientsAction {
  readonly type: typeof REMOVE_SELECTED_INGREDIENTS;
}
export interface IGetRemoveSelectedBunAction {
  readonly type: typeof REMOVE_SELECTED_BUN;
}

export interface IGetRemoveSelectedIngredientAction {
  readonly type: typeof REMOVE_SELECTED_INGREDIENT;
  readonly payload?: string;
}

export interface IGetAddDetailedIngredientAction {
  readonly type: typeof ADD_DETAILED_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IGetRemoveDetailedIngredientAction {
  readonly type: typeof REMOVE_DETAILED_INGREDIENT;
}

export type TIngredientsActions =
  | IGetAddSelectedBunAction
  | IGetFetchIngredientsSuccessAction
  | IGetFetchIngredientsFailAction
  | IGetAddSelectedIngredientsAction
  | IGetIncrementIngredientCountAction
  | IGetDecrementIngredientCountAction
  | IGetAddSelectedIngredientAction
  | IGetRemoveSelectedIngredientsAction
  | IGetRemoveSelectedBunAction
  | IGetRemoveSelectedIngredientAction
  | IGetAddDetailedIngredientAction
  | IGetRemoveDetailedIngredientAction;
