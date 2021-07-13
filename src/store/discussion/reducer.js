import * as type from './type';

const discussionsReducer = (state = [], action) => {
  switch (action.type) {
    case type.ADD_DISCUSSION:
      const discussion = discussionReducer(null, action);
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