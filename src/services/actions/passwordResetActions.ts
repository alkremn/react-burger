import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from '../actionCreators/asyncActionCreator';
import { baseURL, checkResponse } from '../../utils/utils';
import { AppDispatch, AppThunk } from '../types';

export const resetPasswordRequestAction =
  (email: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(getStartLoadingAction());

    return fetch(`${baseURL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(res => checkResponse(res))
      .then(data => {
        if (data.success) {
          return Promise.resolve(data);
        }
        return Promise.reject(data);
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  };

export const resetPasswordAction =
  (form: { password: string; token: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(getStartLoadingAction());

    return fetch(`${baseURL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          return Promise.resolve(data);
        }
        return Promise.reject(data);
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  };
