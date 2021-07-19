export const getMessagesByDiscussionId = (state, id) => {
  if (!state.discussionChat[id]) {
    return [];
  }

  return [...state.discussionChat[id]];
};