import { baseURL } from '../../utils/utils';
import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAIL,
  ADD_SELECTED_BUN,
} from './../constants/ingredientsContstants';

export const updateSelectedBun = selectedBun => async dispatch => {
  if (selectedBun.type === 'bun') {
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
