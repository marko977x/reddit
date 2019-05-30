import { UserState } from "../user/types";

export interface UiState {
  shownPosts: string[],
  openedPostId: string,
  isOpenedSinglePost: boolean,
  loggedUser: UserState,
  isLoginDialogOpened: boolean,
  isSignupDialogOpened: boolean
}

export enum UiActionTypes {
  FETCH_DATA = "ui/FETCH_DATA",
  SET_SHOWN_POSTS = "ui/SET_SHOWN_POSTS",
  SET_LOGGED_USER = "ui/SET_LOGGED_USER",
  LOGOUT_USER = "ui/LOGOUT_USER",
  OPEN_LOGIN_DIALOG = "ui/OPEN_LOGIN_DIALOG",
  CLOSE_LOGIN_DIALOG = "ui/CLOSE_LOGIN_DIALOG",
  OPEN_SIGNUP_DIALOG = "ui/OPEN_SIGNUP_DIALOG",
  CLOSE_SIGNUP_DIALOG = "ui/CLOSE_SIGNUP_DIALOG"
}