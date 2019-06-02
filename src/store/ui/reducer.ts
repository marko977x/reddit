import { UiState, UiActionTypes } from "./types";
import { Reducer } from "redux";
import { PostActionTypes } from "../post/types";
import { UserActionTypes } from "../user/types";

const initialState: UiState = {
  isOpenedSinglePost: false,
  loggedUser: {
    comments: [],
    email: "",
    id: "",
    password: "",
    posts: [],
    username: "",
    likedPosts: [],
    dislikedPosts: [],
    likedComments: [],
    dislikedComments: []
  },
  openedPostId: "",
  shownPosts: [],
  isLoginDialogOpened: false,
  isSignupDialogOpened: false,
  topics: []
}

const reducer: Reducer<UiState> = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.ADD_POST: {
      return {
        ...state, 
        shownPosts: [...state.shownPosts, action.payload.id]
      }
    }
    case UiActionTypes.SET_LOGGED_USER: {
      return {
        ...state, loggedUser: action.payload
      }
    }
    case UiActionTypes.LOGOUT_USER: {
      return {
        ...state,
        loggedUser: {
          comments: [],
          posts: [],
          email: "",
          id: "",
          password: "",
          username: "",
          likedPosts: [],
          dislikedPosts: [],
          likedComments: [],
          dislikedComments: []
        }
      }
    }
    case PostActionTypes.LOAD_POSTS: {
      return {
        ...state, shownPosts: action.payload.allIds
      }
    }
    case UiActionTypes.SET_TOPICS: {
      return {
        ...state, topics: action.payload
      }
    }
    case UiActionTypes.OPEN_LOGIN_DIALOG: {
      return {...state, isLoginDialogOpened: true}
    }
    case UiActionTypes.CLOSE_LOGIN_DIALOG: {
      return {...state, isLoginDialogOpened: false}
    }
    case UiActionTypes.OPEN_SIGNUP_DIALOG: {
      return {...state, isSignupDialogOpened: true}
    }
    case UiActionTypes.CLOSE_SIGNUP_DIALOG: {
      return {...state, isSignupDialogOpened: false}
    }
    case UserActionTypes.LIKE_POST: {
      const {postId} = action.payload;
      const likes = state.loggedUser.likedPosts.includes(postId) ?
        state.loggedUser.likedPosts.filter(id => id !== postId) :
        [...state.loggedUser.likedPosts, postId];
      const dislikes = state.loggedUser.dislikedPosts.filter(id => id !== postId);
      return {...state, loggedUser: {
        ...state.loggedUser,
        likedPosts: likes,
        dislikedPosts: dislikes
      }}
    }
    case UserActionTypes.DISLIKE_POST: {
      const { postId } = action.payload;
      const dislikes = state.loggedUser.dislikedPosts.includes(postId) ?
        state.loggedUser.dislikedPosts.filter(id => id !== postId) :
        [...state.loggedUser.dislikedPosts, postId];
      const likes = state.loggedUser.likedPosts.filter(id => id !== postId);
      return {
        ...state, loggedUser: {
          ...state.loggedUser,
          dislikedPosts: dislikes,
          likedPosts: likes
        }
      }
    }
    case UserActionTypes.LIKE_COMMENT: {
      const { commentId } = action.payload;
      const likes = state.loggedUser.likedComments.includes(commentId) ?
        state.loggedUser.likedComments.filter(id => id !== commentId) :
        [...state.loggedUser.likedComments, commentId];
      const dislikes = state.loggedUser.dislikedComments.filter(id => id !== commentId);
      return {
        ...state, loggedUser: {
          ...state.loggedUser,
          likedComments: likes,
          dislikedComments: dislikes
        }
      }
    }
    case UserActionTypes.DISLIKE_COMMENT: {
      const { commentId } = action.payload;
      const dislikes = state.loggedUser.dislikedComments.includes(commentId) ?
        state.loggedUser.dislikedComments.filter(id => id !== commentId) :
        [...state.loggedUser.dislikedComments, commentId];
      const likes = state.loggedUser.likedComments.filter(id => id !== commentId);
      return {
        ...state, loggedUser: {
          ...state.loggedUser,
          dislikedComments: dislikes,
          likedComments: likes
        }
      }
    }
    default: return state;
  }
}

export { reducer as uiReducer }