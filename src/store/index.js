import { useReducer, createContext } from 'react';

import userReducer from './user/reducers';

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  }
}

const getInitialState = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return { user };
}


const reducer = combineReducers({
  user: userReducer
})


export const StoreContext = createContext(getInitialState());

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
    return (
      <StoreContext.Provider value={{state, dispatch}}>
        {children}
      </StoreContext.Provider>
    )
}

export default Store;