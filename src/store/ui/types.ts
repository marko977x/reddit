export interface UiState {
  shownPosts: string[],
  openedPostId: string,
  isOpenedSinglePost: boolean,
  loggedUserId: string
}

export enum UiActionTypes {
  FETCH_DATA = "ui/FETCH_DATA",
  SET_SHOWN_POSTS = "ui/SET_SHOWN_POSTS",
  SET_LOGGED_USER = "ui/SET_LOGGED_USER"
}