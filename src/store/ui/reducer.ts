import { UiState, UiActionTypes } from "./types";
import { Reducer } from "redux";
import { PostActionTypes } from "../post/types";

const initialState: UiState = {
  isOpenedSinglePost: false,
  loggedUser: {
    comments: [],
    email: "",
    id: "",
    password: "",
    posts: [],
    username: ""
  },
  openedPostId: "",
  shownPosts: [],
  isLoginDialogOpened: false,
  isSignupDialogOpened: false,
  topics: []
}

const reducer: Reducer<UiState> = (state = initialState, action) => {
  switch (action.type) {
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
          username: ""
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
    default: return state;
  }
}

export { reducer as uiReducer }