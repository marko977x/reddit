import * as saga from "redux-saga/effects";
import { UiActionTypes } from "./types";
import { apiFetch } from "../../services";
import { loadPosts } from "../post/action";
import { setShownPosts } from "./action";
import { loadComments } from "../comment/action";
import { loadUsers } from "../user/action";

export const ENTITIES_URL = "http://localhost:4000/entities/";

function* fetchData() {
  const json = yield apiFetch('GET', ENTITIES_URL, "");
  yield saga.put(loadPosts(json.posts));
  yield saga.put(loadComments(json.comments));
  yield saga.put(loadUsers(json.users));
  yield saga.put(setShownPosts(json.posts.allIds));
}

function* watchRequests() {
  yield saga.takeLatest(UiActionTypes.FETCH_DATA, fetchData);
}

export function* uiSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}