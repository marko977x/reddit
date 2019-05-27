import * as saga from "redux-saga/effects";
import { PostsActionTypes } from "./types";
import { loadPosts } from "./action";
import { AppState } from "..";
import { PostState } from "../post/types";
import { apiFetch } from "../../services";

const POSTS_URL = "http://localhost:4000/posts";

function* handleFetchPosts() {
  const json = yield fetch(POSTS_URL).then(response => {
    return response.json();
  });

  yield saga.put(loadPosts(json));
}
export const getPost = (state: AppState, id: string): PostState => {
  return state.postsState.posts[
    state.postsState.posts.findIndex(post => post.id === id)];
}
function* handleLikePost(action: any) {
  const post = yield saga.select(getPost, action.payload);
  yield apiFetch('PUT', POSTS_URL + "/" + action.payload, post);
}

function* watchLikeRequests() {
  yield saga.takeEvery(PostsActionTypes.LIKE_POST, handleLikePost);
  yield saga.takeEvery(PostsActionTypes.DISLIKE_POST, handleLikePost);
  yield saga.takeEvery(PostsActionTypes.LIKE_COMMENT, handleLikePost);
  yield saga.takeEvery(PostsActionTypes.DISLIKE_COMMENT, handleLikePost);
}

function* watchGetRequest() {
  yield saga.takeLatest(PostsActionTypes.FETCH_POSTS, handleFetchPosts);
}

export function* postsSaga() {
  yield saga.all([saga.fork(watchGetRequest), saga.fork(watchLikeRequests)]);
}