import { CommentActionTypes, CommentState } from "./types";
import { Reducer } from "redux";
import { NormalizedObjects } from "..";

const initialState: NormalizedObjects<CommentState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<CommentState>> = (state = initialState, action) => {
  switch (action.type) {
    case CommentActionTypes.ADD_COMMENT: {
      return state;
    }
    case CommentActionTypes.LOAD_COMMENTS: {
      return action.payload;
    }
    default: return state;
  }
}

export { reducer as commentReducer };