import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { UserActionTypes, UserState } from "./types";
import { AppActionTypes } from "../app/types";
import { PostActionTypes } from "../post/types";

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
      let {likedPosts, dislikedPosts} = state.byId[userId];

      likedPosts = alreadyLiked(likedPosts, postId) ? 
        removeFrom(likedPosts, postId) :
        addTo(likedPosts, postId);

      dislikedPosts = removeFrom(dislikedPosts, postId);

      return { ...state,
        byId: { ...state.byId,
          [userId]: { ...state.byId[userId], 
            likedPosts, 
            dislikedPosts
          }
        }
      }
    }
    case UserActionTypes.DISLIKE_POST: {
      const { userId, postId } = action.payload;
      let { likedPosts, dislikedPosts } = state.byId[userId];

      dislikedPosts = alreadyDisliked(dislikedPosts, postId) ?
        removeFrom(dislikedPosts, postId) :
        addTo(dislikedPosts, postId);

      likedPosts = removeFrom(likedPosts, postId);

      return { ...state,
        byId: { ...state.byId,
          [userId]: { ...state.byId[userId],
            dislikedPosts, likedPosts
          }
        }
      }
    }
    case UserActionTypes.LIKE_COMMENT: {
      const { userId, commentId } = action.payload;
      let { likedComments, dislikedComments } = state.byId[userId];

      likedComments = alreadyLiked(likedComments, commentId) ?
        removeFrom(likedComments, commentId) :
        addTo(likedComments, commentId);

      dislikedComments = removeFrom(dislikedComments, commentId);

      return { ...state,
        byId: { ...state.byId,
          [userId]: { ...state.byId[userId],
            dislikedComments, likedComments
          }
        }
      }
    }
    case UserActionTypes.DISLIKE_COMMENT: {
      const { userId, commentId } = action.payload;
      let { likedComments, dislikedComments } = state.byId[userId];

      dislikedComments = alreadyDisliked(dislikedComments, commentId) ?
        removeFrom(dislikedComments, commentId) : 
        addTo(dislikedComments, commentId);

      likedComments = removeFrom(likedComments, commentId);

      return { ...state,
        byId: { ...state.byId,
          [userId]: { ...state.byId[userId],
            dislikedComments, likedComments
          }
        }
      }
    }
    case PostActionTypes.ADD_POST: {
      const post = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [post.authorId]: {
            ...state.byId[post.authorId],
            posts: [...state.byId[post.authorId].posts, post.id]
          }
        }
      }
    }
    default: return state;
  }
}

export const removeFrom = (source: string[], target: string): string[] => {
  return source.filter(id => id !== target)
}

export const addTo = (source: string[], data: string): string[] => {
  return [...source, data];
}

export const alreadyDisliked = (source: string[], target: string): boolean => {
  return source.includes(target);
}

export const alreadyLiked = (source: string[], target: string): boolean => {
  return source.includes(target);
}

export { reducer as userReducer }