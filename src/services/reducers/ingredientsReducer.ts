import { TIngredientsActions } from '../types/ingredientsTypes';
import { IIngredient } from '../../utils/types';

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
} from '../constants/ingredientContstants';

export interface TIngredientsState {
  ingredients: IIngredient[];
  selectedBun: IIngredient | null;
  selectedIngredients: IIngredient[];
  detailedIngredient: IIngredient | null;
  error: string | null;
}

const initialState: TIngredientsState = {
  ingredients: [],
  selectedBun: null,
  selectedIngredients: [],
  detailedIngredient: null,
  error: null,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload.map(item => {
          item.count = 0;
          return item;
        }),
        error: null,
      };
    case FETCH_INGREDIENTS_FAIL:
      return { ...state, error: action.payload };
    case ADD_SELECTED_BUN:
      return { ...state, selectedBun: action.payload };
    case REMOVE_SELECTED_BUN:
      return { ...state, selectedBun: null };
    case ADD_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    case ADD_SELECTED_INGREDIENTS:
      return { ...state, selectedIngredients: action.payload };
    case REMOVE_SELECTED_INGREDIENTS:
      return {
        ...state,
        selectedIngredients: [],
        ingredients: state.ingredients?.map(item => {
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
          item => item.uniqueId !== action.payload
        ),
      };
    case INCREMENT_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map(item => {
          if (item._id === action.payload) {
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
          if (item._id === action.payload) {
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
        detailedIngredient: action.payload,
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
