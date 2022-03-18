import { baseURL, checkResponse } from './../../utils/utils';

import {
  getStartLoadingAction,
  getFinishLoadingAction,
} from '../actionCreators/asyncActionCreator';

import {
  getPostOrderSuccessAction,
  getPostOrderFailAction,
} from './../actionCreators/orderActionCreators';

export const postOrder = ingredientIds => async dispatch => {
  dispatch(getStartLoadingAction());

  fetch(`${baseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  })
    .then(res => checkResponse(res))
    .then(data => {
      if (!data.success) {
        return Promise.reject(data.message);
      }
      dispatch(getPostOrderSuccessAction(data));
    })
    .catch(error => {
      dispatch(getPostOrderFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};
