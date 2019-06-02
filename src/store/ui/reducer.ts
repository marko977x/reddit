import { UiState, UiActionTypes } from "./types";
import { Reducer } from "redux";
import { PostActionTypes, LoadPostsAction, AddPostAction } from "../post/types";
import { SetTopicsAction, SetLoggedUserAction } from "./action";
import { AppActionTypes } from "../app/types";
import { getItemFromLocalStorage, LOGGED_USER_KEY } from "../../services/local-storage";

const initialState: UiState = {
  isOpenedSinglePost: false,
  loggedUser: "",
  openedPostId: "",
  shownPosts: [],
  isLoginDialogOpened: false,
  isSignupDialogOpened: false,
  topics: []
}

const reducer: Reducer<UiState> = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.FETCH_DATA: {
      const loggedUser: string | null = getItemFromLocalStorage<string>(LOGGED_USER_KEY);
      if(loggedUser) return { ...state, loggedUser }
      else return state;
    }
    case PostActionTypes.ADD_POST: {
      return {
        ...state, 
        shownPosts: [...state.shownPosts, (action as AddPostAction).post.id]
      }
    }
    case UiActionTypes.SET_LOGGED_USER: {
      return {
        ...state, loggedUser: (action as SetLoggedUserAction).user
      }
    }
    case UiActionTypes.LOGOUT_USER: {
      return {
        ...state,
        loggedUser: ""
      }
    }
    case PostActionTypes.LOAD_POSTS_SUCCESS: {
      return {
        ...state, shownPosts: (action as LoadPostsAction).posts.allIds
      }
    }
    case UiActionTypes.SET_TOPICS: {
      return {
        ...state, topics: (action as SetTopicsAction).topics
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