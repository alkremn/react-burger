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
  getUpdateUserFailAction,
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
      localStorage.setItem('token', data.refreshToken);
      const token = data.accessToken.split(' ')[0];

      dispatch(getLoginSuccessAction(data.user, token));
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
      localStorage.setItem('token', data.refreshToken);
      const token = data.accessToken.split(' ')[0];
      dispatch(getRegisterSuccessAction(data.user, token));
    })
    .catch(error => {
      dispatch(getRegisterFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const refreshTokenAction = () => async dispatch => {
  const refreshToken = localStorage.getItem('token');
  if (refreshToken) {
    dispatch(getStartLoadingAction());

    fetch(`${baseURL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then(res => checkResponse(res))
      .then(data => {
        if (!data.success) {
          return Promise.reject(data.message);
        }

        localStorage.setItem('token', data.refreshToken);
        const token = data.accessToken.split(' ')[0];
        dispatch(getUpdateTokenAction(token));
      })
      .catch(error => {
        dispatch(getRegisterFailAction(error));
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  }
};

export const logoutAction = () => async dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(getStartLoadingAction());

    fetch(`${baseURL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    })
      .then(res => checkResponse(res))
      .then(data => {
        if (!data.success) {
          return Promise.reject(data.message);
        }
        localStorage.removeItem('token');
        dispatch(getLogoutSuccessAction(data));
      })
      .catch(error => {
        dispatch(getLogoutFailAction(error));
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  }
};

export const getUserAction = () => async (dispatch, getState) => {
  dispatch(getStartLoadingAction());

  fetch(`${baseURL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${getState().auth.user.token}`,
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
      dispatch(getUpdateUserFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const updateUserAction = user => async (dispatch, getState) => {
  dispatch(getStartLoadingAction());

  fetch(`${baseURL}/auth/user`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${getState().auth.user.token}`,
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
      dispatch(getUpdateUserFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};
