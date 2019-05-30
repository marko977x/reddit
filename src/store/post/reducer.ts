import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { PostState, PostActionTypes } from "./types";

const initialState: NormalizedObjects<PostState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<PostState>> = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.ADD_POST: {
      return state;
    }
    case PostActionTypes.LOAD_POSTS: {
      return action.payload;
    }
    case PostActionTypes.ADD_COMMENT_TO_POST: {
      const commentId = action.payload.id;
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.postId]: {
            ...state.byId[action.payload.postId],
            comments: [ ...state.byId[action.payload.postId].comments, commentId ]
          }
        }
      }
    }
    default: return state;
  }
}

export { reducer as postReducer }