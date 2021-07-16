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
