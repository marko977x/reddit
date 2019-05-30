import * as saga from "redux-saga/effects";
import { UserActionTypes } from "./types";

function* addUser(userData: any) {
  console.log(userData);
  yield null;
}

function* watchRequests() {
  yield saga.takeEvery(UserActionTypes.SIGN_UP, addUser);
}

export function* userSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}