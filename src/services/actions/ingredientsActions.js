import { baseURL } from '../../utils/utils';
import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
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
} from './../constants/ingredientsContstants';

export const updateSelectedBun = selectedBun => async dispatch => {
  if (selectedBun.type === 'bun') {
    selectedBun.count += 1;
    dispatch({ type: ADD_SELECTED_BUN, payload: selectedBun });
  }
};

export const fetchIngredientsAction = () => async dispatch => {
  dispatch({ type: LOADING_START });

  fetch(`${baseURL}/ingredients`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();
    })
    .then(dataJson => {
      dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: dataJson.data });
      dispatch(
        updateSelectedBun(dataJson.data.find(item => item.type === 'bun'))
      );
    })
    .catch(error => {
      dispatch({ type: FETCH_INGREDIENTS_FAIL, payload: error.message });
    })
    .finally(() => dispatch({ type: LOADING_FINISH }));
};

export const addSelectedIngredients = ingredients => async dispatch => {
  dispatch({ type: ADD_SELECTED_INGREDIENTS, payload: ingredients });
};

export const addSelectedIngredient = (ingredient, index) => async dispatch => {
  if (ingredient.type === 'bun') {
    dispatch(updateSelectedBun(ingredient));
    dispatch({ type: DECREMENT_INGREDIENT_COUNT, payload: ingredient._id });
  } else {
    const updatedIngredient = {
      ...ingredient,
      uniqueId: Date.now(),
      idx: index,
    };
    dispatch({ type: ADD_SELECTED_INGREDIENT, payload: updatedIngredient });
    dispatch({ type: INCREMENT_INGREDIENT_COUNT, payload: ingredient._id });
  }
};

export const removeSelectedIngredients = () => async dispatch => {
  dispatch({ type: REMOVE_SELECTED_INGREDIENTS });
};

export const removeSelectedIngredient = ingredient => async dispatch => {
  dispatch({ type: REMOVE_SELECTED_INGREDIENT, payload: ingredient.uniqueId });
  dispatch({ type: DECREMENT_INGREDIENT_COUNT, payload: ingredient._id });
};
