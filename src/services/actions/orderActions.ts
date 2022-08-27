import { baseURL, checkResponse } from '../../utils/utils';

import {
  getStartLoadingAction,
  getFinishLoadingAction,
} from '../actionCreators/asyncActionCreator';

import {
  getPostOrderSuccessAction,
  getPostOrderFailAction,
} from '../actionCreators/orderActionCreators';
import { TRootState } from '../reducers';
import { AppThunk } from '../types';

export const postOrderAction =
  (ingredientIds: string[]) => async (dispatch: AppThunk, getState: () => TRootState) => {
    dispatch(getStartLoadingAction());

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    if (getState().user?.accessToken) {
      requestHeaders.set('Authorization', getState().user?.accessToken!);
    }

    fetch(`${baseURL}/orders`, {
      method: 'POST',
      headers: requestHeaders,
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
