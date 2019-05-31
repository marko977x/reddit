import * as saga from "redux-saga/effects";
import { UserActionTypes, SignUpData, UserState } from "./types";
import { apiFetch } from "../../services/auth";
import { DATABASE_URL } from "../ui/saga";

function* addUser(action: any) {
  let user: UserState = {
    ...action.payload,
    comments: [],
    posts: []
  }
  yield apiFetch('POST', DATABASE_URL + "users", user);
}

function* watchRequests() {
  yield saga.takeEvery(UserActionTypes.SIGN_UP, addUser);
}

export function* userSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}