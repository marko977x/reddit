import * as saga from "redux-saga/effects";
import { apiFetch } from "../../services/auth";
import { AppActionTypes } from "../app/types";
import { setTopics } from "../ui/action";
import { loadCommentsSuccess } from "../comment/action";
import normalize from "../../services/normalizer";
import { loadPostsSuccess } from "../post/action";
import { loadUsersSuccess } from "../user/action";
import { TOPICS_RESOURCE_URL, COMMENTS_RESOURCE_URL, POSTS_RESOURCE_URL, USERS_RESOURCE_URL } from "..";

export function* appSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}

function* watchRequests() {
  yield saga.takeLatest(AppActionTypes.FETCH_DATA, fetchData);
}

function* fetchData() {
  let topics = yield apiFetch('GET', TOPICS_RESOURCE_URL, "");
  let comments = yield apiFetch('GET', COMMENTS_RESOURCE_URL, "");
  let posts = yield apiFetch('GET', POSTS_RESOURCE_URL, "");
  const users = yield apiFetch('GET', USERS_RESOURCE_URL, "");
  
  yield saga.put(setTopics(topics));
  yield saga.put(loadUsersSuccess(normalize(users)));
  yield saga.put(loadPostsSuccess(normalize(posts)));
  yield saga.put(loadCommentsSuccess(normalize(comments)));
} 