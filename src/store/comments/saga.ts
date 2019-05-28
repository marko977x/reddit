import * as saga from "redux-saga/effects";
import { CommentActionTypes } from "./types";
import { apiFetch } from "../../services";
import { ENTITIES_URL } from "../home/saga";
import { loadComments } from "./action";

function* fetchComments() {
  const json = yield apiFetch('GET', ENTITIES_URL, "");
  yield saga.put(loadComments(json));
}

function* watchFetchRequest() {
  yield saga.takeLatest(CommentActionTypes.FETCH_COMMENTS, fetchComments);
}

export function* commentsSaga() {
  yield saga.all([saga.fork(watchFetchRequest)]);
}