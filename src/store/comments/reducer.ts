import { CommentActionTypes, CommentsState } from "./types";
import { Reducer } from "redux";

const initialState: CommentsState = {
  comment: {
    authorId: "",
    comments: [],
    content: "",
    id: "",
    likes: 0,
    postId: ""
  },
  user: {
    comments: [],
    email: "",
    id: "",
    password: "",
    posts: [],
    username: ""
  }
}

const reducer: Reducer<CommentsState> = (state = initialState, action) => {
  switch (action.type) {
    case CommentActionTypes.ADD_COMMENT: {
      return state;
    }
    case CommentActionTypes.LOAD_COMMENTS: {
      return state;
    }
    case CommentActionTypes.FETCH_COMMENTS: { return state; }
    default: return state;
  }
}

export { reducer as commentsReducer };