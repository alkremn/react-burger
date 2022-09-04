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
import { AppDispatch, AppThunk } from '../types';

export const postOrderAction =
  (ingredientIds: string[]): AppThunk =>
  async (dispatch: AppDispatch, getState: () => TRootState) => {
    dispatch(getStartLoadingAction());

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    if (getState().auth.user?.accessToken) {
      requestHeaders.set('Authorization', getState().auth.user!.accessToken!);
    }

    fetch(`${baseURL}/orders`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ ingredients: ingredientIds }),
    })
      .then(res => checkResponse(res))
      .then(data => {
        console.log(data);
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
