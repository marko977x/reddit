import * as saga from "redux-saga/effects";
import { apiFetch } from "../../services/auth";
import { AppActionTypes } from "../app/types";
import { setTopics } from "../ui/action";
import { loadComments } from "../comment/action";
import normalize from "../../services/normalizer";
import { loadPosts } from "../post/action";
import { loadUsers } from "../user/action";
import { DATABASE_URL, TOPICS_RESOURCE_URL, COMMENTS_RESOURCE_URL, POSTS_RESOURCE_URL, USERS_RESOURCE_URL } from "..";

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
  yield saga.put(loadUsers(normalize(users)));
  yield saga.put(loadPosts(normalize(posts)));
  yield saga.put(loadComments(normalize(comments)));
} 