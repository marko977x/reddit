import { CommentActionTypes, CommentState } from "./types";
import { Reducer } from "redux";
import { NormalizedObjects } from "..";

const initialState: NormalizedObjects<CommentState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<CommentState>> = (state = initialState, action) => {
  switch (action.type) {
    case CommentActionTypes.CREATE_COMMENT: {
      const id = action.payload.id;
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: action.payload
        },
        allIds: { ...state.allIds, id }
      }
    }
    case CommentActionTypes.LOAD_COMMENTS: {
      return action.payload;
    }
    case CommentActionTypes.ADD_COMMENT_TO_COMMENT: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.parentCommentId]: {
            ...state.byId[action.payload.parentCommentId],
            comments: [...state.byId[action.payload.parentCommentId].comments, action.payload.id]
          }
        }
      }
    }
    default: return state;
  }
}

export { reducer as commentReducer };