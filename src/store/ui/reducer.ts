import { UiState, UiActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: UiState = {
  isOpenedSinglePost: false,
  loggedUserId: "",
  openedPostId: "",
  shownPosts: []
}

const reducer: Reducer<UiState> = (state = initialState, action) => {
  switch (action.type) {
    case UiActionTypes.SET_LOGGED_USER: {
      return {
        ...state, loggedUserId: action.payload
      }
    }
    case UiActionTypes.FETCH_DATA: { 
      return state; 
    }
    case UiActionTypes.SET_SHOWN_POSTS: {
      return {
        ...state, shownPosts: action.payload
      }
    }
    default: return state;
  }
}

export { reducer as uiReducer }