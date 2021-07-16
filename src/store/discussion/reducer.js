import * as type from './type';
import * as actionMaker from './action';

const discussionsReducer = (state = [], action) => {
  switch (action.type) {
    case type.POPULATE_DISCUSSION:
      let discussions = action.payload.map(discussion => {
        return discussionReducer(null, actionMaker.addDiscussion(discussion))
      })
      return [...discussions];
    case type.ADD_DISCUSSION:
      let discussion = discussionReducer(null, action);
      return [...state, discussion];
    default:
      return state;
  }
}

const discussionReducer = (state = null, action) => {
  switch (action.type) {
    case type.ADD_DISCUSSION:
      return { ...action.payload }
    default:
      return state;
  }
}

export default discussionsReducer