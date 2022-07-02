import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from '../actionCreators/asyncActionCreator';

import {
  getLoginFailAction,
  getLogoutFailAction,
  getLogoutSuccessAction,
  getRegisterFailAction,
  getUpdateTokenAction,
  getUpdateUserSuccessAction,
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
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          ...data,
          accessToken: data.accessToken.split(' ')[1],
        })
      );
      dispatch(getLoginSuccessAction({ ...data, accessToken: data.accessToken.split(' ')[1] }));
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
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          user: data.user,
          refreshToken: data.refreshToken,
        })
      );
      dispatch(getRegisterSuccessAction({ ...data, accessToken: data.accessToken.split(' ')[1] }));
    })
    .catch(error => {
      dispatch(getRegisterFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const refreshTokenAction = next => async dispatch => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.refreshToken) {
    dispatch(getStartLoadingAction());

    fetch(`${baseURL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: userInfo.refreshToken }),
    })
      .then(res => checkResponse(res))
      .then(data => {
        if (!data.success) {
          return Promise.reject(data.message);
        }
        localStorage.setItem('token', data.refreshToken);
        const token = data.accessToken.split(' ')[0];
        dispatch(getUpdateTokenAction(token));
        next();
      })
      .catch(error => {
        dispatch(getRegisterFailAction(error));
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  }
};

export const getUserAction = () => async (dispatch, getState) => {
  dispatch(getStartLoadingAction());

  fetch(`${baseURL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`,
    },
  })
    .then(res => checkResponse(res))
    .then(data => {
      if (!data.success) {
        return Promise.reject(data.message);
      }
      dispatch(getUpdateUserSuccessAction(data));
    })
    .catch(error => {
      dispatch(refreshTokenAction(getUserAction));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const updateUserAction = user => async (dispatch, getState) => {
  dispatch(getStartLoadingAction());
  fetch(`${baseURL}/auth/user`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`,
    },
    body: JSON.stringify(user),
  })
    .then(res => checkResponse(res))
    .then(data => {
      if (!data.success) {
        return Promise.reject(data.message);
      }
      dispatch(getUpdateUserSuccessAction(data));
    })
    .catch(error => {
      dispatch(refreshTokenAction(updateUserAction));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const logoutAction = () => async dispatch => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    dispatch(getStartLoadingAction());

    fetch(`${baseURL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: JSON.parse(userInfo).refreshToken }),
    })
      .then(res => checkResponse(res))
      .then(data => {
        if (!data.success) {
          return Promise.reject(data.message);
        }
        localStorage.removeItem('userInfo');
        dispatch(getLogoutSuccessAction(data));
      })
      .catch(error => {
        dispatch(getLogoutFailAction(error));
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  }
};
