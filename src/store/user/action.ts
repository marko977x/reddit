import { UserActionTypes, UserState, SignUpData, SignUpAction, LoadUsersAction, LikePostAction, LikeCommentAction, DislikePostAction, DislikeCommentAction, LoadUsersSuccessAction } from "./types";
import { NormalizedObjects } from "..";

export function signUp(signUpData: SignUpData): SignUpAction {
  return { type: UserActionTypes.SIGN_UP, signUpData };
}

export function loadUsers(users: NormalizedObjects<UserState>): LoadUsersAction {
  return { type: UserActionTypes.LOAD_USERS, users };
}

export function loadUsersSuccess(users: NormalizedObjects<UserState>): LoadUsersSuccessAction {
  return { type: UserActionTypes.LOAD_USERS_SUCCESS, users };
}

export function likePost(likePostInput: { userId: string, postId: string }): LikePostAction {
  return {
    type: UserActionTypes.LIKE_POST,
    postId: likePostInput.postId,
    userId: likePostInput.userId
  };
}

export function likeComment(likeCommentInput: { userId: string, commentId: string }): LikeCommentAction {
  return { 
    type: UserActionTypes.LIKE_COMMENT,
    commentId: likeCommentInput.commentId,
    userId: likeCommentInput.userId 
  };
}

export function dislikePost(dislikePostInput: { userId: string, postId: string }): DislikePostAction {
  return {
    type: UserActionTypes.DISLIKE_POST,
    postId: dislikePostInput.postId,
    userId: dislikePostInput.userId
  };
}

export function dislikeComment(dislikeCommentInput: { userId: string, commentId: string }): DislikeCommentAction {
  return { 
    type: UserActionTypes.DISLIKE_COMMENT,
    commentId: dislikeCommentInput.commentId,
    userId: dislikeCommentInput.userId
  };
}