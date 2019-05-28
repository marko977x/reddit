import { UserState } from "../user/types";

export interface CommentsState {
  comment: CommentState,
  user: UserState
}

export interface CommentState {
  id: string,
  authorId: string,
  postId: string,
  content: string,
  likes: number,
  comments: string[]
}

export enum CommentActionTypes {
  FETCH_COMMENTS = "@@comment/FETCH_COMMENTS",
  LOAD_COMMENTS = "@@comment/LOAD_COMMENTS",
  ADD_COMMENT = "@@comment/ADD_COMMENT"
}