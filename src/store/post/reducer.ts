import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { PostState, PostActionTypes } from "./types";

const initialState: NormalizedObjects<PostState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<PostState>> = (state = initialState, action) => {
  switch(action.type) {
    case PostActionTypes.ADD_POST: {
      return state;
    }
    case PostActionTypes.LOAD_POSTS: {
      return action.payload;
    }
    default: return state;
  }
}

export { reducer as postReducer }