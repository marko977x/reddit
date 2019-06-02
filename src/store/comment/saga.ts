import * as saga from "redux-saga/effects";
import { CommentActionTypes } from "./types";
import { DATABASE_URL } from "../ui/saga";
import { apiFetch } from "../../services/auth";
import { AppActionTypes } from "../app/types";
import normalize from "../../services/normalizer";
import { loadComments } from "./action";
import { UserActionTypes } from "../user/types";
import { updateUser } from "../post/saga";

export const COMMENTS_RESOURCE_URL = DATABASE_URL + "comments/";

export function* commentsSaga() {
  yield saga.all([saga.fork(watchFetchRequest)]);
}

function* watchFetchRequest() {
  yield saga.takeEvery(CommentActionTypes.REPLY_TO_COMMENT, replyToComment);
  yield saga.takeLatest(AppActionTypes.FETCH_DATA, fetchData);
  yield saga.takeEvery(UserActionTypes.LIKE_COMMENT, likeDislikeUpdate);
  yield saga.takeEvery(UserActionTypes.DISLIKE_COMMENT, likeDislikeUpdate);
}

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

function* likeDislikeUpdate(action: any) {
  yield updateUser(action.payload.userId);
  yield updateComment(action.payload.commentId);
}

function* updateComment(commentId: string) {
  const comments = yield saga.select(getComments);
  const comment = comments.byId[commentId];
  yield apiFetch('PUT', COMMENTS_RESOURCE_URL + commentId, comment);
}

export const getComments = (state: any) => state.comments;