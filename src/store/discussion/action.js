import * as type from './type';

export const populateDiscussion = (discussions) => ({
  type: type.POPULATE_DISCUSSION,
  payload: [...discussions],
})

export const addDiscussion = ({
  id,
  name,
  code,
  imageUrl,
  description,
  creatorId,
  members,
  createdAt,
  updatedAt }) => ({
  type: type.ADD_DISCUSSION,
  payload: {
    id,
    name,
    code,
    imageUrl,
    description,
    creatorId,
    createdAt,
    updatedAt,
    members: members || [],
  }
});

export const updateDiscussion = ({
  id,
  name,
  code,
  imageUrl,
  description,
  creatorId,
  members,
  createdAt,
  updatedAt }) => ({
  type: type.UPDATE_DISCUSSION,
  payload: {
    id,
    name,
    code,
    imageUrl,
    description,
    creatorId,
    createdAt,
    updatedAt,
    members: members,
  }
});

export const updateFetchDiscussionMeta = (id, payload) => ({
  type: type.UPDATE_DISCUSSION_META,
  payload: {
    id,
    ...payload
  }
});

export const removeDiscussion = ({ id }) => ({
  type: type.REMOVE_DISCUSSION,
  payload: {
    id
  }
})