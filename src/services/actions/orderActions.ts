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

    fetch(`${baseURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.user!.accessToken!}`,
      },
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
