import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { PostState, PostActionTypes } from "./types";
import { AppActionTypes } from "../app/types";
import { UserActionTypes } from "../user/types";

const initialState: NormalizedObjects<PostState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<PostState>> = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.FETCH_DATA: { return state; }
    case PostActionTypes.ADD_POST: {
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
            comments: [...state.byId[action.payload.postId].comments, commentId]
          }
        }
      }
    }
    case UserActionTypes.LIKE_POST: {
      const {postId, userId} = action.payload;
      const likes = state.byId[postId].likes.includes(userId) ? 
        state.byId[postId].likes.filter(id => id !== userId) : 
        [...state.byId[postId].likes, userId];
      const dislikes = state.byId[postId].dislikes.filter(id => id !== userId);
      return {
        ...state,
        byId: {
          ...state.byId,
          [postId]: {
            ...state.byId[postId],
            likes: likes,
            dislikes: dislikes,
            likesCount: likes.length - dislikes.length
          }
        }
      }
    }
    case UserActionTypes.DISLIKE_POST: {
      const {postId, userId} = action.payload;
      const dislikes = state.byId[postId].dislikes.includes(userId) ?
        state.byId[postId].dislikes.filter(id => id !== userId) :
        [...state.byId[postId].dislikes, userId];
      const likes = state.byId[postId].likes.filter(id => id !== userId);
      return {
        ...state,
        byId: {
          ...state.byId,
          [postId]: {
            ...state.byId[postId],
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

export { reducer as postReducer }