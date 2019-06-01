import * as saga from "redux-saga/effects";
import { CommentActionTypes } from "./types";
import { DATABASE_URL } from "../ui/saga";
import { apiFetch } from "../../services/auth";
import { AppActionTypes } from "../app/types";
import normalize from "../../services/normalizer";
import { loadComments } from "./action";

export const COMMENTS_RESOURCE_URL = DATABASE_URL + "comments/";

function* replyToComment(action: any) {
  yield addCommentToDb(action.payload);
  yield updateParentComment(action.payload);
}

export default function* addCommentToDb(comment: any) {
  yield apiFetch('POST', COMMENTS_RESOURCE_URL, comment);
}

function* updateParentComment(comment: any) {
  const parentComment = yield apiFetch(
    'GET', COMMENTS_RESOURCE_URL + comment.parentCommentId, "");
  parentComment.comments.push(comment.id);
  yield apiFetch('PUT', COMMENTS_RESOURCE_URL + parentComment.id, parentComment);
}

function* fetchData() {
  let json = yield apiFetch('GET', COMMENTS_RESOURCE_URL, "");
  yield saga.put(loadComments(normalize(json)));
}

function* watchFetchRequest() {
  yield saga.takeEvery(CommentActionTypes.REPLY_TO_COMMENT, replyToComment);
  yield saga.takeLatest(AppActionTypes.FETCH_DATA, fetchData);
}

export function* commentsSaga() {
  yield saga.all([saga.fork(watchFetchRequest)]);
}