import { useReducer, createContext } from 'react';

import userReducer from './user/reducer';
import discussionsReducer from './discussion/reducer';
import discussionChatReducer from './discussion-chat/reducer'

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  }
}

const getInitialState = () => ({
  user: JSON.parse(localStorage.getItem('user')),
  discussions: [],
  discussionChat: {},
})


const reducer = combineReducers({
  user: userReducer,
  discussions: discussionsReducer,
  discussionChat: discussionChatReducer,
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