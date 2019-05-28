import { PostsActionTypes } from "./types";
import { Reducer } from "redux";
import { AppState } from "..";

const initialState: AppState = {
  posts: {
    byId: {},
    allIds: []
  },
  users: {
    byId: {},
    allIds: []
  },
  comments: {
    byId: {},
    allIds: []
  },
  ui: {
    shownPosts: [],
    openedPostId: "",
    isOpenedSignlePost: false
  }
}

const reducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_APP_STATE: {
      return state;
    }
    case PostsActionTypes.LOAD_APP_STATE: {
      return {
        ...state,
        posts: action.payload.posts,
        users: action.payload.users,
        comments: action.payload.comments,
        ui: {
          shownPosts: action.payload.posts.allIds.slice(0, 2),
          openedPostId: "",
          isOpenedSignlePost: false
        }
      }
    }
    case PostsActionTypes.LIKE_POST: {
      return state;
    }
    case PostsActionTypes.DISLIKE_POST: {
      return state;
    }
    default: return state;
  }
}

export { reducer as appReducer };