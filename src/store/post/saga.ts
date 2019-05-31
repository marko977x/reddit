import * as saga from "redux-saga/effects";
import { PostActionTypes } from "./types";
import { apiFetch } from "../../services/auth";
import { DATABASE_URL } from "../ui/saga";
import addCommentToDb, { COMMENTS_RESOURCE_URL } from "../comment/saga";

const POSTS_RESOURCE_URL = DATABASE_URL + "posts/";

export function* postSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}

function* watchRequests() {
  yield saga.takeEvery(PostActionTypes.ADD_POST, addPost);
  yield saga.takeEvery(PostActionTypes.ADD_COMMENT_TO_POST, addCommentToPost);
}

function* addPost(action: any) {
  yield null;
}

function* addCommentToPost(action: any) {
  yield addCommentToDb(action.payload);
  yield updatePostCommentsArray(action.payload);
}

function* updatePostCommentsArray(comment: any) {
  const post = yield apiFetch('GET', POSTS_RESOURCE_URL + comment.postId, "");
  post.comments.push(comment.id);
  yield apiFetch('PUT', POSTS_RESOURCE_URL + post.id, post);
}