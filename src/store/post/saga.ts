import * as saga from "redux-saga/effects";
import { PostActionTypes } from "./types";
import { apiFetch } from "../../services/auth";
import { DATABASE_URL } from "../ui/saga";
import addCommentToDb from "../comment/saga";
import { AppActionTypes } from "../app/types";
import normalize from "../../services/normalizer";
import { loadPosts } from "./action";
import { UserActionTypes } from "../user/types";
import { USERS_RESOURCE_URL } from "../user/saga";

const POSTS_RESOURCE_URL = DATABASE_URL + "posts/";

export function* postSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}

function* watchRequests() {
  yield saga.takeLatest(AppActionTypes.FETCH_DATA, fetchData);
  yield saga.takeEvery(PostActionTypes.ADD_POST, addPost);
  yield saga.takeEvery(PostActionTypes.ADD_COMMENT_TO_POST, addCommentToPost);
  yield saga.takeEvery(UserActionTypes.LIKE_POST, likeDislikeUpdate);
  yield saga.takeEvery(UserActionTypes.DISLIKE_POST, likeDislikeUpdate);
}

function* fetchData() {
  let json = yield apiFetch('GET', POSTS_RESOURCE_URL, "");
  yield saga.put(loadPosts(normalize(json)));
}

function* addPost(action: any) {
  yield apiFetch('POST', POSTS_RESOURCE_URL, action.payload);
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

function* likeDislikeUpdate(action: any) {
  yield updatePost(action.payload.postId);
  yield updateUser(action.payload.userId);
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
