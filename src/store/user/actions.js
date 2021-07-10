import * as types from './types';

export const login = (token, email, name, imageUrl) => ({
  type: types.USER_LOGIN,
  payload: {
    token,
    email,
    name,
    imageUrl,
  }
});

export const logout = () => ({
  type: types.USER_LOGOUT,
});
