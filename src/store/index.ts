import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "@redux-saga/core/effects";
import { commentReducer } from "./comment/reducer";
import { userReducer } from "./user/reducer";
import { postReducer } from "./post/reducer";
import { uiReducer } from "./ui/reducer";
import { uiSaga } from "./ui/saga";
import { userSaga } from "./user/saga";

export interface NormalizedObjects<T> {
  byId: { [id: string]: T },
  allIds: string[]
}

export const rootReducer = combineReducers({
  posts: postReducer,
  comments: commentReducer,
  users: userReducer,
  ui: uiReducer
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
    uiSaga(), userSaga()
  ]);
}