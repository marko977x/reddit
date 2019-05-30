import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { UserActionTypes, UserState } from "./types";

const initialState: NormalizedObjects<UserState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<UserState>> = (state = initialState, action) => {
  switch (action.type) {
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
          comments: []
        },
        allIds: {
          ...state.allIds, userId
        }
      }
    }
    case UserActionTypes.LOAD_USERS: {
      return action.payload;
    }
    default: return state;
  }
}

export { reducer as userReducer }