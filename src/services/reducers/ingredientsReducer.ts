import { TIngredientsActions } from '../types/ingredientsTypes';
import { IIngredient } from './../../utils/types';

import {
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAIL,
  ADD_SELECTED_BUN,
  ADD_SELECTED_INGREDIENT,
  ADD_SELECTED_INGREDIENTS,
  REMOVE_SELECTED_INGREDIENT,
  REMOVE_SELECTED_INGREDIENTS,
  ADD_DETAILED_INGREDIENT,
  REMOVE_DETAILED_INGREDIENT,
  INCREMENT_INGREDIENT_COUNT,
  DECREMENT_INGREDIENT_COUNT,
  REMOVE_SELECTED_BUN,
} from '../constants/ingredientsContstants';

export type TIngredientsState = {
  ingredients: IIngredient[];
  selectedBun: IIngredient | null;
  selectedIngredients: IIngredient[];
  detailedIngredient: IIngredient | null;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  selectedBun: null,
  selectedIngredients: [],
  detailedIngredient: null,
  error: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients.map(item => {
          item.count = 0;
          return item;
        }),
        error: null,
      };
    case FETCH_INGREDIENTS_FAIL:
      return { ...state, error: action.error };
    case ADD_SELECTED_BUN:
      return { ...state, selectedBun: action.selectedBun };
    case REMOVE_SELECTED_BUN:
      return { ...state, selectedBun: null };
    case ADD_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.ingredient],
      };
    case ADD_SELECTED_INGREDIENTS:
      return { ...state, selectedIngredients: action.ingredients };
    case REMOVE_SELECTED_INGREDIENTS:
      return {
        ...state,
        selectedIngredients: [],
        ingredients: state.ingredients.map(item => {
          if (item._id === state.selectedBun?._id) {
            return item;
          }
          item.count = 0;
          return item;
        }),
      };
    case REMOVE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients].filter(
          item => item.uniqueId !== action.uniqueId
        ),
      };
    case INCREMENT_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map(item => {
          if (item._id === action.ingredientId) {
            ++item.count;
            return item;
          } else {
            return item;
          }
        }),
      };
    case DECREMENT_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map(item => {
          if (item._id === action.ingredientId) {
            --item.count;
            return item;
          } else {
            return item;
          }
        }),
      };
    case ADD_DETAILED_INGREDIENT:
      return {
        ...state,
        detailedIngredient: action.ingredient,
      };
    case REMOVE_DETAILED_INGREDIENT:
      return {
        ...state,
        detailedIngredient: null,
      };
    default:
      return state;
  }
};
