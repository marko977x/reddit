import { CommentActionTypes, CommentState } from "./types";
import { Reducer } from "redux";
import { NormalizedObjects } from "..";
import { PostActionTypes } from "../post/types";
import { AppActionTypes } from "../app/types";
import { UserActionTypes } from "../user/types";
import { alreadyLiked, removeFrom, addTo, alreadyDisliked } from "../user/reducer";

const initialState: NormalizedObjects<CommentState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<CommentState>> = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.FETCH_DATA: { return state; }
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
    case UserActionTypes.LIKE_COMMENT: {
      const { commentId, userId } = action.payload;
      let {likes, dislikes} = state.byId[commentId];

      likes = alreadyLiked(likes, userId) ?
        removeFrom(likes, userId) : addTo(likes, userId);

      dislikes = removeFrom(dislikes, userId);

      return setState(state, commentId, likes, dislikes);
    }
    case UserActionTypes.DISLIKE_COMMENT: {
      const { commentId, userId } = action.payload;
      let {likes, dislikes} = state.byId[commentId];

      dislikes = alreadyDisliked(dislikes, userId) ?
        removeFrom(dislikes, userId) : addTo(dislikes, userId);

      likes = removeFrom(likes, userId);

      return setState(state, commentId, likes, dislikes);
    }
    default: return state;
  }
}

const setState = (state:any, commentId: string, likes: string[], dislikes: string[]) => {
  return {
    ...state,
    byId: {
      ...state.byId,
      [commentId]: {
        ...state.byId[commentId],
        dislikes: dislikes,
        likes: likes,
        likesCount: likes.length - dislikes.length
      }
    }
  }
}

export { reducer as commentReducer };