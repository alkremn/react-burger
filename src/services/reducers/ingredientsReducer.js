import {
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAIL,
  ADD_SELECTED_BUN,
  ADD_SELECTED_INGREDIENT,
  REMOVE_SELECTED_INGREDIENT,
  ADD_DETAILED_INGREDIENT,
  REMOVE_DETAILED_INGREDIENT,
} from '../constants/ingredientsContstants';

const initialState = {
  ingredients: [],
  selectedBun: null,
  selectedIngredients: [],
  detailedIngredient: null,
  error: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_SUCCESS:
      return { ...state, ingredients: action.payload, error: null };
    case FETCH_INGREDIENTS_FAIL:
      return { ...state, error: action.payload };
    case ADD_SELECTED_BUN:
      return { ...state, selectedBun: action.payload };
    case ADD_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.item],
      };
    case REMOVE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients].filter(
          item => item.id !== action.id
        ),
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
