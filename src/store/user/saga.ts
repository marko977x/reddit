import * as saga from "redux-saga/effects";
import { UserActionTypes, UserState } from "./types";
import { apiFetch } from "../../services/auth";
import { PostActionTypes } from "../post/types";
import { getUsers } from "../post/saga";
import { CommentActionTypes } from "../comment/types";
import { USERS_RESOURCE_URL } from "..";

export function* userSaga() {
  yield saga.all([saga.fork(watchRequests)]);
}

function* watchRequests() {
  yield saga.takeEvery(UserActionTypes.SIGN_UP, addUser);
  yield saga.takeEvery(PostActionTypes.ADD_POST, addPost);
  yield saga.takeEvery(PostActionTypes.ADD_COMMENT_TO_POST, addComment);
  yield saga.takeEvery(CommentActionTypes.REPLY_TO_COMMENT, addComment);
}

function* addUser(action: any) {
  let user: UserState = {
    ...action.payload,
    comments: [],
    posts: [],
    likedPosts: [],
    likedComments: [],
    dislikedPosts: [],
    dislikedComments: []
  }
  yield apiFetch('POST', USERS_RESOURCE_URL, user);
}

function* addPost(action: any) {
  yield updateUser(action.payload.authorId);
}

function* addComment(action: any) {
  yield updateUser(action.payload.authorId);
}

function* updateUser(userId: string) {
  const users = yield saga.select(getUsers);
  const user = users.byId[userId];
  yield apiFetch('PUT', USERS_RESOURCE_URL + user.id, user);
}