import * as type from './type';

export const login = ({id, email, name, imageUrl, token}) => ({
  type: type.LOGIN,
  payload: {
    id,
    email,
    name,
    imageUrl,
    token,
  }
});

export const logout = () => ({
  type: type.LOGOUT,
});
