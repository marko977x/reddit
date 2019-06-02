import { Action } from "redux";
import { NormalizedObjects } from "..";

export interface CommentState {
  id: string,
  authorId: string,
  postId: string | null,
  parentCommentId: string | null,
  content: string,
  likes: string[],
  dislikes: string[],
  likesCount: number,
  comments: string[],
}

export interface ReplyToCommentData {
  id: string,
  parentCommentId: string
}

export enum CommentActionTypes {
  LOAD_COMMENTS = "comment/LOAD_COMMENTS",
  LOAD_COMMENTS_SUCCESS = "comment/LOAD_COMMENTS_SUCCESS",
  REPLY_TO_COMMENT = "comment/REPLY_TO_COMMENT"
}

export interface LoadCommentsSuccessAction extends Action {
  comments: NormalizedObjects<CommentState>
}

export interface ReplyToCommentAction extends Action {
  comment: CommentState
}

export interface LoadCommentsAction extends Action {
  comments: NormalizedObjects<CommentState>
}