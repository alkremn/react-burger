import { ingredientsReducer, initialState } from './ingredientsReducer';
import * as types from '../constants/ingredientConstants';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.FETCH_INGREDIENTS_SUCCESS,
        payload: [],
      })
    ).toEqual(initialState);
  });

  it('should handle FETCH_INGREDIENTS_FAIL', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.FETCH_INGREDIENTS_FAIL,
        payload: 'error message',
      })
    ).toEqual({
      ...initialState,
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
      ...initialState,
      selectedBun: {},
    });
  });

  it('should handle REMOVE_SELECTED_BUN', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.REMOVE_SELECTED_BUN,
      })
    ).toEqual(initialState);
  });

  it('should handle ADD_SELECTED_INGREDIENT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.ADD_SELECTED_INGREDIENT,
        payload: {},
      })
    ).toEqual({
      ...initialState,
      selectedIngredients: [{}],
    });
  });

  it('should handle ADD_SELECTED_INGREDIENTS', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.ADD_SELECTED_INGREDIENTS,
        payload: [],
      })
    ).toEqual(initialState);
  });

  it('should handle REMOVE_SELECTED_INGREDIENTS', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.REMOVE_SELECTED_INGREDIENTS,
      })
    ).toEqual(initialState);
  });

  it('should handle REMOVE_SELECTED_INGREDIENT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.REMOVE_SELECTED_INGREDIENT,
      })
    ).toEqual(initialState);
  });

  it('should handle INCREMENT_INGREDIENT_COUNT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.INCREMENT_INGREDIENT_COUNT,
        payload: 'id',
      })
    ).toEqual(initialState);
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
      ...initialState,
      detailedIngredient: {},
    });
  });

  it('should handle REMOVE_DETAILED_INGREDIENT', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.REMOVE_DETAILED_INGREDIENT,
      })
    ).toEqual(initialState);
  });
});
