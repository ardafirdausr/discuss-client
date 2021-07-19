import * as discussionType from './type';
import * as actionMaker from './action';

const discussionsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case discussionType.POPULATE_DISCUSSION:
      return payload.map(discussion => {
        return discussionReducer(null, actionMaker.addDiscussion(discussion))
      })
    case discussionType.ADD_DISCUSSION:
      let discussion = discussionReducer(null, { type, payload });
      return [...state, discussion];
    case discussionType.UPDATE_DISCUSSION:
      return state.map(discussion => {
        if (discussion.id === payload.id) {
          return discussionReducer(null, { type, payload })
        }

        return discussion;
      })
    case discussionType.REMOVE_DISCUSSION:
      return state.filter(discussion => discussion.id !== payload.id);
    default:
      return state;
  }
}

const discussionReducer = (state = null, { type, payload }) => {
  switch (type) {
    case discussionType.ADD_DISCUSSION:
      return { ...payload }
    case discussionType.UPDATE_DISCUSSION:
      return { ...payload }
    default:
      return state;
  }
}

export default discussionsReducer