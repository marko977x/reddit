import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "@redux-saga/core/effects";
import { appReducer } from "./home/reducer";
import { UserState } from "./user/types";
import { PostState } from "./home/types";
import { CommentState } from "./comments/types";
import { postsSaga } from "./home/saga";

export interface NormalizedObjects<T> {
  byId: { [id: string]: T },
  allIds: string[]
}

export interface UiState {
  shownPosts: string[],
  openedPostId: string,
  isOpenedSignlePost: boolean
}

export interface AppState {
  posts: NormalizedObjects<PostState>,
  comments: NormalizedObjects<CommentState>,
  users: NormalizedObjects<UserState>,
  ui: UiState
}

export const rootReducer = combineReducers({
  app: appReducer
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);
  return store;
}

export function* rootSaga() {
  yield all([
    fork(postsSaga)
  ]);
}