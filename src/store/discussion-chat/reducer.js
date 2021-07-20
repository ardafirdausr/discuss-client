import * as discussionChatType from './type';
import * as actionMaker from './action';

const messagesReducer = (state = {}, action) => {
  let prevMessages = [];
  switch (action.type) {
    case discussionChatType.ADD_OLD_MESSAGES:
      prevMessages = state[action.payload.id] ? [...state[action.payload.id]] : [];
      let messages = [];
      action.payload.messages.forEach(message => {
        const addMessageAction = actionMaker.addMessage(message)
        messages.unshift(messageReducer(null, addMessageAction));
      })
      return {
        ...state,
        [action.payload.id]: [...messages, ...prevMessages]
      };
    case discussionChatType.ADD_NEW_MESSAGE:
      prevMessages = state[action.payload.receiverId] ? [...state[action.payload.receiverId]] : [];
      let message = messageReducer(null, action);
      return {
        ...state,
        [action.payload.receiverId]: [...prevMessages, message]
      };
    default:
      return state;
  }
}

const messageReducer = (state = null, { type, payload }) => {
  switch (type) {
    case discussionChatType.ADD_NEW_MESSAGE:
      return { ...payload }
    default:
      return state;
  }
}

export default messagesReducer