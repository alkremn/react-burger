import { authReducer } from './authReducer';
import * as types from '../constants/authConstants';

describe('auth reducer', () => {
  const user = {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      user: null,
      message: null,
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    expect(
      authReducer(undefined, {
        type: types.REGISTER_SUCCESS,
        payload: user,
      })
    ).toEqual({
      user,
      message: null,
    });
  });

  it('should handle REGISTER_FAIL', () => {
    expect(
      authReducer(undefined, {
        type: types.REGISTER_FAIL,
        payload: 'Error message',
      })
    ).toEqual({
      user: null,
      message: 'Error message',
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      authReducer(undefined, {
        type: types.LOGIN_SUCCESS,
        payload: user,
      })
    ).toEqual({
      user,
      message: null,
    });
  });

  it('should handle LOGIN_FAIL', () => {
    expect(
      authReducer(undefined, {
        type: types.LOGIN_FAIL,
        payload: 'Error message',
      })
    ).toEqual({
      user: null,
      message: 'Error message',
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      authReducer(undefined, {
        type: types.LOGOUT_SUCCESS,
        payload: 'Success',
      })
    ).toEqual({
      user: null,
      message: 'Success',
    });
  });

  it('should handle LOGOUT_FAIL', () => {
    expect(
      authReducer(undefined, {
        type: types.LOGOUT_FAIL,
        payload: 'Error message',
      })
    ).toEqual({
      user: null,
      message: 'Error message',
    });
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(
      authReducer(undefined, {
        type: types.UPDATE_USER_SUCCESS,
        payload: user,
      })
    ).toEqual({
      user,
      message: null,
    });
  });

  it('should handle UPDATE_USER_FAIL', () => {
    expect(
      authReducer(undefined, {
        type: types.UPDATE_USER_FAIL,
        payload: 'Error message',
      })
    ).toEqual({
      user: null,
      message: 'Error message',
    });
  });

  it('should handle UPDATE_TOKEN', () => {
    expect(
      authReducer(
        { user, message: null },
        {
          type: types.UPDATE_TOKEN,
          payload: 'token',
        }
      )
    ).toEqual({
      user: { ...user, accessToken: 'token' },
      message: null,
    });
  });
});
