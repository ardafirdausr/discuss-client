import * as type from './type';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {...action.payload}
    case type.LOGOUT:
      return null
    default:
      return state;
  }
}

export default userReducer