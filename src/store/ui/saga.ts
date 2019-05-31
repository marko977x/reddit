import * as saga from "redux-saga/effects";
import { UiActionTypes } from "./types";
import { apiFetch } from "../../services/auth";
import { loadPosts } from "../post/action";
import { setShownPosts, setTopics } from "./action";
import { loadComments } from "../comment/action";
import { loadUsers } from "../user/action";
import { NormalizedObjects } from "..";

export const DATABASE_URL = "http://localhost:4000/";

function* fetchData() {
  let postsJson = yield apiFetch('GET', DATABASE_URL + "posts", "");
  yield saga.put(loadPosts(normalize(postsJson)));
  let json = yield apiFetch('GET', DATABASE_URL + "comments", "");
  yield saga.put(loadComments(normalize(json)));
  json = yield apiFetch('GET', DATABASE_URL + "users", "");
  yield saga.put(loadUsers(normalize(json)));
  json = yield apiFetch('GET', DATABASE_URL + "topics", "");
  yield saga.put(setTopics(json));
  yield saga.put(setShownPosts(normalize(postsJson).allIds));
}

function normalize(json: any): any {
  let result: NormalizedObjects<any> = {
    byId: {},
    allIds: []
  }
  json.forEach((element: any, index: number) => {
    result.byId[element.id] = element;
    result.allIds[index] = element.id;
  });
  console.log(result);
  return result;
}

function* watchRequests() {
  yield saga.takeLatest(UiActionTypes.FETCH_DATA, fetchData);
}

export function* uiSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}