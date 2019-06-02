import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { UserActionTypes, UserState, SignUpAction, LikePostAction, LikeCommentAction, DislikePostAction, DislikeCommentAction, LoadUsersSuccessAction } from "./types";
import { PostActionTypes, AddPostAction } from "../post/types";

const initialState: NormalizedObjects<UserState> = {
  byId: {},
  allIds: [],
  isLoaded: false
}

const reducer: Reducer<NormalizedObjects<UserState>> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP: {
      const signUpData = (action as SignUpAction).signUpData;
      return {
        ...state,
        byId: {
          ...state.byId,
          [signUpData.id]: {
            ...state.byId[signUpData.id],
            id: signUpData.id,
            username: signUpData.username,
            email: signUpData.email,
            password: signUpData.password,
            posts: [],
            comments: [],
            likedPosts: [],
            dislikedPosts: [],
            likedComments: [],
            dislikedComments: []
          }
        },
        allIds: [ ...state.allIds, signUpData.id ]
      }
    }
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        ...(action as LoadUsersSuccessAction).users,
        isLoaded: true
      }
    }
    case UserActionTypes.LIKE_POST: {
      const { userId, postId } = (action as LikePostAction);
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
      const { userId, postId } = (action as DislikePostAction);
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
      const { userId, commentId } = (action as LikeCommentAction);
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
      const { userId, commentId } = (action as DislikeCommentAction);
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
      const post = (action as AddPostAction).post;
      console.log(post);
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