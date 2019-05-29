import * as saga from "redux-saga/effects";
import { CommentActionTypes } from "./types";

function* fetchComments() {
  yield null;
}

function* watchFetchRequest() {
  yield null;
}

export function* commentsSaga() {
  yield saga.all([saga.fork(watchFetchRequest)]);
}