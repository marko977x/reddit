import * as saga from "redux-saga/effects";
import { UserActionTypes, UserState } from "./types";
import { apiFetch } from "../../services/auth";

export const DATABASE_URL = "http://localhost:4000/";
export const USERS_RESOURCE_URL = DATABASE_URL + "users/";

export function* userSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}

function* watchRequests() {
  yield saga.takeEvery(UserActionTypes.SIGN_UP, addUser);
}

function* addUser(action: any) {
  let user: UserState = {
    ...action.payload,
    comments: [],
    posts: [],
    likedPosts: [],
    likedComments: [],
    dislikedPosts: [],
    dislikedComments: []
  }
  yield apiFetch('POST', DATABASE_URL + "users", user);
}