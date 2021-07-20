import * as type from './type';

export const addOldMessages = (id, messages) => ({
  type: type.ADD_OLD_MESSAGES,
  payload: { id, messages },
});

export const addMessage = ({
  id,
  contentType,
  content,
  receiverType,
  receiverId,
  sender,
  createdAt
}) => ({
  type: type.ADD_NEW_MESSAGE,
  payload: {
    id,
    contentType,
    content,
    receiverType,
    receiverId,
    sender,
    createdAt
  }
});
