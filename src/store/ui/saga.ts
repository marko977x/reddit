import * as saga from "redux-saga/effects";
import { apiFetch } from "../../services/auth";
import { setTopics } from "./action";
import { AppActionTypes } from "../app/types";

export const DATABASE_URL = "http://localhost:4000/";
export const TOPICS_RESOURCE_URL = DATABASE_URL + "topics/";

function* fetchData() {
  const json = yield apiFetch('GET', TOPICS_RESOURCE_URL, "");
  yield saga.put(setTopics(json));
}

function* watchRequests() {
  yield saga.takeLatest(AppActionTypes.FETCH_DATA, fetchData);
}

export function* uiSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}