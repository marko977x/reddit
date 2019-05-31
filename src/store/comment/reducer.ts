import { CommentActionTypes, CommentState } from "./types";
import { Reducer } from "redux";
import { NormalizedObjects } from "..";
import { PostActionTypes } from "../post/types";

const initialState: NormalizedObjects<CommentState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<CommentState>> = (state = initialState, action) => {
  switch (action.type) {
    case CommentActionTypes.LOAD_COMMENTS: {
      return action.payload;
    }
    case PostActionTypes.ADD_COMMENT_TO_POST: {
      const id = action.payload.id;
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: action.payload
        },
        allIds: [...state.allIds, id]
      }
    }
    case CommentActionTypes.REPLY_TO_COMMENT: {
      const { id, parentCommentId } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [parentCommentId]: {
            ...state.byId[parentCommentId],
            comments: [...state.byId[parentCommentId].comments, id]
          },
          [id]: action.payload
        },
        allIds: [...state.allIds, id]
      }
    }
    default: return state;
  }
}

export { reducer as commentReducer };