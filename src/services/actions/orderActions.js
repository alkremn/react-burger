import { baseURL, checkResponse } from './../../utils/utils';

import {
  getStartLoadingAction,
  getFinishLoadingAction,
} from '../actionCreators/asyncActionCreator';

import {
  getPostOrderSuccessAction,
  getPostOrderFailAction,
} from './../actionCreators/orderActionCreators';

export const postOrderAction = ingredientIds => async (dispatch, getState) => {
  dispatch(getStartLoadingAction());
  fetch(`${baseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getState().auth.user.accessToken,
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
