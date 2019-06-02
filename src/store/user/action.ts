import { action } from "typesafe-actions";
import { UserActionTypes, UserState, SignUpData } from "./types";
import { NormalizedObjects } from "..";

export const signUp = (signUpData: SignUpData) =>
  action(UserActionTypes.SIGN_UP, signUpData);

export const loadUsers = (users: NormalizedObjects<UserState>) =>
  action(UserActionTypes.LOAD_USERS, users);

export const likePost = (likePostInput: { userId: string, postId: string }) =>
  action(UserActionTypes.LIKE_POST, likePostInput);

export const likeComment = (likeCommentInput: { userId: string, commentId: string }) =>
  action(UserActionTypes.LIKE_COMMENT, likeCommentInput);

export const dislikePost = (dislikePostInput: { userId: string, postId: string }) =>
  action(UserActionTypes.DISLIKE_POST, dislikePostInput);

export const dislikeComment = (dislikeCommentInput: { userId: string, commentId: string }) =>
  action(UserActionTypes.DISLIKE_COMMENT, dislikeCommentInput);