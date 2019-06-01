import * as saga from "redux-saga/effects";
import { UserActionTypes, UserState } from "./types";
import { apiFetch } from "../../services/auth";
import { DATABASE_URL } from "../ui/saga";
import { AppActionTypes } from "../app/types";
import { loadUsers } from "./action";
import normalize from "../../services/normalizer";

export const USERS_RESOURCE_URL = DATABASE_URL + "users/";

export function* userSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}

function* watchRequests() {
  yield saga.takeLatest(AppActionTypes.FETCH_DATA, fetchData);
  yield saga.takeEvery(UserActionTypes.SIGN_UP, addUser);
}

function* fetchData() {
  const json = yield apiFetch('GET', DATABASE_URL + "users", "");
  yield saga.put(loadUsers(normalize(json)));
}

function* addUser(action: any) {
  let user: UserState = {
    ...action.payload,
    comments: [],
    posts: []
  }
  yield apiFetch('POST', DATABASE_URL + "users", user);
}