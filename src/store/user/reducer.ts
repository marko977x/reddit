import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { UserActionTypes, UserState } from "./types";
const initialState: NormalizedObjects<UserState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<UserState>> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return state;
    }
    case UserActionTypes.LOGOUT: {
      return state;
    }
    case UserActionTypes.SIGN_UP: {
      return state;
    }
    case UserActionTypes.LOAD_USERS: {
      return action.payload;
    }
    default: return state;
  }
}

export { reducer as userReducer }