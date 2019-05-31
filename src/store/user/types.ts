export interface UserState {
  id: string,
  username: string,
  email: string,
  password: string,
  posts: string[],
  comments: string[]
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
  SIGN_UP = "user/SIGN_UP"
}