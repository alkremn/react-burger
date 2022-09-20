import { ingredientsReducer } from './ingredientsReducer';
import * as types from '../constants/ingredientConstants';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.FETCH_INGREDIENTS_SUCCESS,
        payload: [],
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle FETCH_INGREDIENTS_FAIL', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.FETCH_INGREDIENTS_FAIL,
        payload: 'error message',
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: 'error message',
    });
  });

  it('should handle ADD_SELECTED_BUN', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.ADD_SELECTED_BUN,
        payload: {},
      })
    ).toEqual({
      ingredients: [],
      selectedBun: {},
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle REMOVE_SELECTED_BUN', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.REMOVE_SELECTED_BUN,
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle ADD_SELECTED_INGREDIENT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.ADD_SELECTED_INGREDIENT,
        payload: {},
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [{}],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle ADD_SELECTED_INGREDIENTS', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.ADD_SELECTED_INGREDIENTS,
        payload: [],
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle REMOVE_SELECTED_INGREDIENTS', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.REMOVE_SELECTED_INGREDIENTS,
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });
  it('should handle REMOVE_SELECTED_INGREDIENT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.REMOVE_SELECTED_INGREDIENT,
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle INCREMENT_INGREDIENT_COUNT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.INCREMENT_INGREDIENT_COUNT,
        payload: 'id',
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle DECREMENT_INGREDIENT_COUNT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.DECREMENT_INGREDIENT_COUNT,
        payload: 'id',
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });

  it('should handle ADD_DETAILED_INGREDIENT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.ADD_DETAILED_INGREDIENT,
        payload: {},
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: {},
      error: null,
    });
  });

  it('should handle REMOVE_DETAILED_INGREDIENT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.REMOVE_DETAILED_INGREDIENT,
      })
    ).toEqual({
      ingredients: [],
      selectedBun: null,
      selectedIngredients: [],
      detailedIngredient: null,
      error: null,
    });
  });
});
