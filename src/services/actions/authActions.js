import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from '../actionCreators/asyncActionCreator';
import {
  getLoginFailAction,
  getRegisterFailAction,
} from '../actionCreators/authActionCreator';
import { baseURL, checkResponse } from './../../utils/utils';
import {
  getLoginSuccessAction,
  getRegisterSuccessAction,
} from './../actionCreators/authActionCreator';

export const loginAction = form => async dispatch => {
  dispatch(getStartLoadingAction());

  fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(res => checkResponse(res))
    .then(data => {
      if (!data.success) {
        return Promise.reject(data.message);
      }
      dispatch(getLoginSuccessAction(data));
    })
    .catch(error => {
      dispatch(getLoginFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const registerAction = form => async dispatch => {
  dispatch(getStartLoadingAction());

  fetch(`${baseURL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(res => checkResponse(res))
    .then(data => {
      if (!data.success) {
        return Promise.reject(data.message);
      }
      dispatch(getRegisterSuccessAction(data));
    })
    .catch(error => {
      dispatch(getRegisterFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};
