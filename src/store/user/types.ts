import { Action } from "redux";
import { NormalizedObjects } from "..";

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
  LOAD_USERS_SUCCESS = "user/LOAD_USERS_SUCCESS",
  SIGN_UP = "user/SIGN_UP",
  LIKE_POST = "ui/LIKE_POST",
  DISLIKE_POST = "ui/DISLIKE_POST",
  LIKE_COMMENT = "ui/LIKE_COMMENT",
  DISLIKE_COMMENT = "ui/DISLIKE_COMMENT"
}

export interface SignUpAction extends Action {
  signUpData: SignUpData
}

export interface LoadUsersAction extends Action {
  users: NormalizedObjects<UserState>
}

export interface LoadUsersSuccessAction extends Action {
  users: NormalizedObjects<UserState>
}

export interface LikePostAction extends Action {
  userId: string,
  postId: string
}

export interface LikeCommentAction extends Action {
  userId: string,
  commentId: string
}

export interface DislikePostAction extends Action {
  userId: string,
  postId: string
}

export interface DislikeCommentAction extends Action {
  userId: string,
  commentId: string
}