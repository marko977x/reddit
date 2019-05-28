import * as saga from "redux-saga/effects";
import { PostsActionTypes } from "./types";
import { apiFetch } from "../../services";
import { loadAppState } from "./action";

export const ENTITIES_URL = "http://localhost:4000/entities/";

function* handleFetchPosts() {
  const json = yield apiFetch('GET', ENTITIES_URL, "");
  yield saga.put(loadAppState(json));
}

// export const getPost = (state: AppState, id: string): PostState => {
//   return state.postsState.posts[
//     state.postsState.posts.findIndex(post => post.id === id)];
// }

function* handleLikePost(action: any) {
  // const post = yield saga.select(getPost, action.payload);
  // yield apiFetch('PUT', POSTS_URL + "/" + action.payload, post);
  yield null;
}

function* watchLikeRequests() {
  yield saga.takeEvery(PostsActionTypes.LIKE_POST, handleLikePost);
  yield saga.takeEvery(PostsActionTypes.DISLIKE_POST, handleLikePost);
}

function* watchGetRequest() {
  yield saga.takeLatest(PostsActionTypes.FETCH_APP_STATE, handleFetchPosts);
}

export function* postsSaga() {
  yield saga.all([saga.fork(watchGetRequest), saga.fork(watchLikeRequests)]);
}