import * as saga from "redux-saga/effects";
import { PostActionTypes, AddPostAction, AddCommentToPostAction } from "./types";
import { apiFetch } from "../../services/auth";
import addCommentToDb from "../comment/saga";
import { UserActionTypes, LikePostAction, DislikePostAction } from "../user/types";
import { POSTS_RESOURCE_URL, USERS_RESOURCE_URL } from "..";

export function* postSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}

function* watchRequests() {
  yield saga.takeEvery(PostActionTypes.ADD_POST, addPost);
  yield saga.takeEvery(PostActionTypes.ADD_COMMENT_TO_POST, addCommentToPost);
  yield saga.takeEvery(UserActionTypes.LIKE_POST, likeDislikeUpdate);
  yield saga.takeEvery(UserActionTypes.DISLIKE_POST, likeDislikeUpdate);
}

function* addPost(action: AddPostAction) {
  yield apiFetch('POST', POSTS_RESOURCE_URL, action.post);
}

function* addCommentToPost(action: AddCommentToPostAction) {
  yield addCommentToDb(action.comment);
  yield updatePostCommentsArray(action.comment);
}

function* updatePostCommentsArray(comment: any) {
  const post = yield apiFetch('GET', POSTS_RESOURCE_URL + comment.postId, "");
  post.comments.push(comment.id);
  yield apiFetch('PUT', POSTS_RESOURCE_URL + post.id, post);
}

function* likeDislikeUpdate(action: LikePostAction | DislikePostAction) {
  yield updatePost(action.postId);
  yield updateUser(action.userId);
}

export function* updateUser(userId: string) {
  const users = yield saga.select(getUsers);
  const user = users.byId[userId];
  yield apiFetch('PUT', USERS_RESOURCE_URL + userId, user);
}

export function* updatePost(postId: string) {
  const posts = yield saga.select(getPosts);
  const post = posts.byId[postId];
  yield apiFetch('PUT', POSTS_RESOURCE_URL + postId, post);
}

export const getPosts = (state: any) => state.posts;
export const getUsers = (state: any) => state.users;
