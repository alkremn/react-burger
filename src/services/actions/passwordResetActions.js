import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from '../actionCreators/asyncActionCreator';
import { baseURL, checkResponse } from '../../utils/utils';

export const resetPasswordRequestAction = email => dispatch => {
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

export const resetPasswordAction = form => dispatch => {
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
