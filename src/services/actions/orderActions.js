import { LOADING_FINISH, LOADING_START } from '../constants/asyncConstants';
import {
  POST_ORDER_FAIL,
  POST_ORDER_SUCCESS,
} from '../constants/orderConstants';
import { baseURL } from './../../utils/utils';

export const postOrder = ingredientIds => async dispatch => {
  dispatch({ type: LOADING_START });

  fetch(`${baseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (!data.success) {
        return Promise.reject(data.message);
      }
      dispatch({
        type: POST_ORDER_SUCCESS,
        payload: { name: data.name, number: data.order.number },
      });
    })
    .catch(error => {
      dispatch({ type: POST_ORDER_FAIL, payload: error.message });
    })
    .finally(() => dispatch({ type: LOADING_FINISH }));
};
