import * as saga from "redux-saga/effects";
import { CommentActionTypes } from "./types";
import { apiFetch } from "../../services/auth";
import { UserActionTypes } from "../user/types";
import { updateUser } from "../post/saga";
import { DATABASE_URL } from "../user/saga";

export const COMMENTS_RESOURCE_URL = DATABASE_URL + "comments/";

export function* commentsSaga() {
  yield saga.all([saga.fork(watchFetchRequest)]);
}

function* watchFetchRequest() {
  yield saga.takeEvery(CommentActionTypes.REPLY_TO_COMMENT, replyToComment);
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