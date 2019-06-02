import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { UserActionTypes, UserState } from "./types";
import { AppActionTypes } from "../app/types";

const initialState: NormalizedObjects<UserState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<UserState>> = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.FETCH_DATA: { return state; }
    case UserActionTypes.SIGN_UP: {
      const userId = action.payload.id;
      return {
        ...state,
        [userId]: {
          id: userId,
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
          posts: [],
          comments: [],
          likedPosts: [],
          dislikedPosts: [],
          likedComments: [],
          dislikedComments: []
        },
        allIds: {
          ...state.allIds, userId
        }
      }
    }
    case UserActionTypes.LOAD_USERS: {
      return action.payload;
    }
    case UserActionTypes.LIKE_POST: {
      const { userId, postId } = action.payload;
      const likedPosts = state.byId[userId].likedPosts.includes(postId) ? 
        state.byId[userId].likedPosts.filter(id => id !== postId) :
        [...state.byId[userId].likedPosts, postId];
      const dislikedPosts = state.byId[userId].dislikedPosts.filter(post => post !== postId);
      console.log(likedPosts);
      return {
        ...state,
        byId: {
          ...state.byId,
          [userId]: {
            ...state.byId[userId],
            likedPosts: likedPosts,
            dislikedPosts: dislikedPosts
          }
        }
      }
    }
    case UserActionTypes.DISLIKE_POST: {
      const { userId, postId } = action.payload;
      const dislikedPosts = state.byId[userId].dislikedPosts.includes(postId) ?
        state.byId[userId].dislikedPosts.filter(id => id !== postId) :
        [...state.byId[userId].dislikedPosts, postId];
      const likedPosts = state.byId[userId].likedPosts.filter(post => post !== postId);
      return {
        ...state,
        byId: {
          ...state.byId,
          [userId]: {
            ...state.byId[userId],
            dislikedPosts: dislikedPosts,
            likedPosts: likedPosts
          }
        }
      }
    }
    case UserActionTypes.LIKE_COMMENT: {
      const { userId, commentId } = action.payload;
      const likedComments = state.byId[userId].likedComments.includes(commentId) ?
        state.byId[userId].likedComments.filter(id => id !== commentId) :
        [...state.byId[userId].likedComments, commentId];
      const dislikedComments = state.byId[userId].dislikedComments.filter(comment => comment !== commentId);
      return {
        ...state,
        byId: {
          ...state.byId,
          [userId]: {
            ...state.byId[userId],
            likedComments: likedComments,
            dislikedComments: dislikedComments
          }
        }
      }
    }
    case UserActionTypes.DISLIKE_COMMENT: {
      const { userId, commentId } = action.payload;
      const dislikedComments = state.byId[userId].dislikedComments.includes(commentId) ?
        state.byId[userId].dislikedComments.filter(id => id !== commentId) : 
        [...state.byId[userId].dislikedComments, commentId];
      const likedComments = state.byId[userId].likedComments.filter(comment => comment !== commentId);
      return {
        ...state,
        byId: {
          ...state.byId,
          [userId]: {
            ...state.byId[userId],
            dislikedComments: dislikedComments,
            likedComments: likedComments
          }
        }
      }
    }
    default: return state;
  }
}

export { reducer as userReducer }