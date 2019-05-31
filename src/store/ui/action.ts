import { action } from "typesafe-actions";
import { UiActionTypes } from "./types";
import { UserState } from "../user/types";

export const setLoggedUser = (user: UserState) =>
  action(UiActionTypes.SET_LOGGED_USER, user);

export const logoutUser = () => action(UiActionTypes.LOGOUT_USER);

export const fetchData = () => action(UiActionTypes.FETCH_DATA);

export const setShownPosts = (postsIds: string[]) =>
  action(UiActionTypes.SET_SHOWN_POSTS, postsIds);

export const setTopics = (topics: string[]) =>
  action(UiActionTypes.SET_TOPICS, topics);

export const openLoginDialog = () => action(UiActionTypes.OPEN_LOGIN_DIALOG);
export const closeLoginDialog = () => action(UiActionTypes.CLOSE_LOGIN_DIALOG);
export const openSignupDialog = () => action(UiActionTypes.OPEN_SIGNUP_DIALOG);
export const closeSignupDialog = () => action(UiActionTypes.CLOSE_SIGNUP_DIALOG);