import { CommentActionTypes, CommentState } from "./types";
import { Reducer } from "redux";
import { NormalizedObjects } from "..";
import { PostActionTypes } from "../post/types";
import { AppActionTypes } from "../app/types";
import { UserActionTypes } from "../user/types";

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
      const likes = state.byId[commentId].likes.includes(userId) ?
        state.byId[commentId].likes.filter(id => id !== userId) :
        [...state.byId[commentId].likes, userId];
      const dislikes = state.byId[commentId].dislikes.filter(id => id !== userId);
      return {
        ...state,
        byId: {
          ...state.byId,
          [commentId]: {
            ...state.byId[commentId],
            likes: likes,
            dislikes: dislikes,
            likesCount: likes.length - dislikes.length
          }
        }
      }
    }
    case UserActionTypes.DISLIKE_COMMENT: {
      const { commentId, userId } = action.payload;
      const dislikes = state.byId[commentId].dislikes.includes(userId) ?
        state.byId[commentId].dislikes.filter(id => id !== userId) :
        [...state.byId[commentId].dislikes, userId];
      const likes = state.byId[commentId].likes.filter(id => id !== userId);
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
    default: return state;
  }
}

export { reducer as commentReducer };