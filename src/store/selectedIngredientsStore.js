import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  REMOVE_INGREDIENT,
  REMOVE_ALL,
} from '../utils/constants';

export const selectedIngredientsInitialState = {
  selectedIngredients: [],
};

export const selectedIngredientsReducer = (state, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS:
      return { selectedIngredients: action.payload };
    case ADD_INGREDIENT:
      return { selectedIngredients: [...state, action.payload] };
    case REMOVE_INGREDIENT:
      return {
        ingredients: [
          ...state.selectedIngredients.filter(i => i !== action.payload),
        ],
      };
    case REMOVE_ALL:
      return { selectedIngredients: selectedIngredientsInitialState };
    default:
      throw new Error(`Invalid action type${action.type}`);
  }
};
