import { baseURL } from '../../utils/utils';
import { LOADING_START, LOADING_FINISH } from '../constants/asyncConstants';
import {
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAIL,
} from './../constants/ingredientsContstants';

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
    })
    .catch(error => {
      dispatch({ type: FETCH_INGREDIENTS_FAIL, payload: error.message });
    })
    .finally(() => dispatch({ type: LOADING_FINISH }));
};
