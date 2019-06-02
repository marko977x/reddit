export interface UserState {
  id: string,
  username: string,
  email: string,
  password: string,
  posts: string[],
  comments: string[],
  likedPosts: string[],
  dislikedPosts: string[],
  likedComments: string[],
  dislikedComments: string[]
}

export interface Error {
  error: boolean,
  errorText: string
}

export interface SignUpData {
  username: string,
  email: string,
  password: string,
  id: string
}

export enum UserActionTypes {
  LOAD_USERS = "user/LOAD_USERS",
  SIGN_UP = "user/SIGN_UP",
  LIKE_POST = "ui/LIKE_POST",
  DISLIKE_POST = "ui/DISLIKE_POST",
  LIKE_COMMENT = "ui/LIKE_COMMENT",
  DISLIKE_COMMENT = "ui/DISLIKE_COMMENT"
}