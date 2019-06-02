export interface UiState {
  shownPosts: string[],
  openedPostId: string,
  isOpenedSinglePost: boolean,
  loggedUser: string,
  isLoginDialogOpened: boolean,
  isSignupDialogOpened: boolean,
  topics: string[]
}

export enum UiActionTypes {
  SET_SHOWN_POSTS = "ui/SET_SHOWN_POSTS",
  SET_LOGGED_USER = "ui/SET_LOGGED_USER",
  SET_TOPICS = "ui/SET_TOPICS",
  LOGOUT_USER = "ui/LOGOUT_USER",
  OPEN_LOGIN_DIALOG = "ui/OPEN_LOGIN_DIALOG",
  CLOSE_LOGIN_DIALOG = "ui/CLOSE_LOGIN_DIALOG",
  OPEN_SIGNUP_DIALOG = "ui/OPEN_SIGNUP_DIALOG",
  CLOSE_SIGNUP_DIALOG = "ui/CLOSE_SIGNUP_DIALOG"
}