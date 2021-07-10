import * as types from './types';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {...action.payload}
    case types.USER_LOGOUT:
      return null
    default:
      return state;
  }
}

export default userReducer