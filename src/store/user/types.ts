export interface UserState {
  id: string,
  username: string,
  email: string,
  password: string,
  posts: string[],
  comments: string[]
}

export enum UserActionTypes {
  LOAD_USERS = "user/LOAD_USERS", 
  LOGIN = "user/LOGIN",
  SIGN_UP = "user/SIGN_UP",
  LOGOUT = "user/LOGOUT"
}