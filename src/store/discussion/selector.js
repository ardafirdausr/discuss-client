export const getDiscussions = (state) => state.discussions;
export const getDiscussionById = (state, id) => state.discussions.find((discussion) => discussion.id === id);
export const getDiscussionByCode = (state, code) => state.discussions.find((discussion) => discussion.code === code);