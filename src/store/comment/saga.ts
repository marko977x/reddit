import * as saga from "redux-saga/effects";
import { CommentActionTypes, ReplyToCommentAction } from "./types";
import { apiFetch } from "../../services/auth";
import { UserActionTypes, LikeCommentAction, DislikeCommentAction } from "../user/types";
import { updateUser } from "../post/saga";
import { COMMENTS_RESOURCE_URL } from "..";

export function* commentsSaga() {
  yield saga.all([saga.fork(watchFetchRequest)]);
}

function* watchFetchRequest() {
  yield saga.takeEvery(CommentActionTypes.REPLY_TO_COMMENT, replyToComment);
  yield saga.takeEvery(UserActionTypes.LIKE_COMMENT, likeDislikeUpdate);
  yield saga.takeEvery(UserActionTypes.DISLIKE_COMMENT, likeDislikeUpdate);
}

function* replyToComment(action: ReplyToCommentAction) {
  yield addCommentToDb(action.comment);
  yield updateParentComment(action.comment);
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

function* likeDislikeUpdate(action: LikeCommentAction | DislikeCommentAction) {
  yield updateUser(action.userId);
  yield updateComment(action.commentId);
}

function* updateComment(commentId: string) {
  const comments = yield saga.select(getComments);
  const comment = comments.byId[commentId];
  yield apiFetch('PUT', COMMENTS_RESOURCE_URL + commentId, comment);
}

export const getComments = (state: any) => state.comments;