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

import { baseURL, checkResponse } from '../../utils/utils';

import {
  getLoginSuccessAction,
  getRegisterSuccessAction,
} from '../actionCreators/authActionCreator';
import { AppDispatch, AppThunk } from '../types';
import { ILoginForm, IRegisterForm, IUser } from '../../utils/types';
import { TRootState } from '../reducers';
import { Dispatch } from 'redux';

export const loginAction = (form: ILoginForm) => async (dispatch: AppDispatch) => {
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
      const userInfo = getUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));

      dispatch(getLoginSuccessAction(userInfo));
    })
    .catch(error => {
      dispatch(getLoginFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const registerAction = (form: IRegisterForm) => async (dispatch: AppDispatch) => {
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
      const userInfo = getUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));

      dispatch(getRegisterSuccessAction(userInfo));
    })
    .catch(error => {
      dispatch(getRegisterFailAction(error));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const refreshTokenAction = (next: any, user?: IUser) => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    dispatch(getStartLoadingAction());

    fetch(`${baseURL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: JSON.parse(refreshToken) }),
    })
      .then(res => checkResponse(res))
      .then(data => {
        if (!data.success) {
          return Promise.reject(data.message);
        }
        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
        const accessToken = data.accessToken.split(' ')[1];
        const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '');
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, accessToken }));

        dispatch(getUpdateTokenAction(accessToken));
        if (user) {
          dispatch(next(user));
        }
        dispatch(next());
      })
      .catch(error => {
        dispatch(getRegisterFailAction(error));
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  }
};

export const getUserAction = () => async (dispatch: AppThunk, getState: () => any) => {
  dispatch(getStartLoadingAction());

  fetch(`${baseURL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${getState().auth.user.accessToken}`,
    },
  })
    .then(res => checkResponse(res))
    .then(data => {
      if (!data.success) {
        return Promise.reject(data.message);
      }
      dispatch(getUpdateUserSuccessAction(data));
    })
    .catch(() => {
      dispatch(refreshTokenAction(getUserAction));
    })
    .finally(() => dispatch(getFinishLoadingAction()));
};

export const updateUserAction =
  (user: IUser) => async (dispatch: AppThunk, getState: () => TRootState) => {
    dispatch(getStartLoadingAction());
    fetch(`${baseURL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user?.accessToken}`,
      },
      body: JSON.stringify(user),
    })
      .then(res => checkResponse(res))
      .then(data => {
        if (!data.success) {
          return Promise.reject(data.message);
        }
        const accessToken = JSON.parse(localStorage.getItem('userInfo') ?? '').accessToken;
        localStorage.setItem('userInfo', JSON.stringify({ ...data.user, accessToken }));
        dispatch(getUpdateUserSuccessAction(data));
      })
      .catch(_ => {
        dispatch(refreshTokenAction(updateUserAction, user));
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  };

export const logoutAction = () => async (dispatch: AppThunk) => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    dispatch(getStartLoadingAction());

    fetch(`${baseURL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: JSON.parse(refreshToken) }),
    })
      .then(res => checkResponse(res))
      .then(data => {
        if (!data.success) {
          return Promise.reject(data.message);
        }
        localStorage.removeItem('userInfo');
        localStorage.removeItem('refreshToken');
        dispatch(getLogoutSuccessAction(data));
      })
      .catch(error => {
        dispatch(getLogoutFailAction(error));
      })
      .finally(() => dispatch(getFinishLoadingAction()));
  }
};

function getUserInfo(data: { user: IUser; accessToken: string }) {
  return {
    ...data.user,
    accessToken: data.accessToken.split(' ')[1],
  };
}