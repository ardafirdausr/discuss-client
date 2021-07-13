export const getDiscussions = (state) => state.discussions;
export const getDiscussion = (state, id) => state.discussions.find((discussion) => discussion.id === id);