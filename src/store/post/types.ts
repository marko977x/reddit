import { Action } from "redux";
import { NormalizedObjects } from "..";
import { CommentState } from "../comment/types";

export interface PostState {
  id: string
  authorId: string,
  topic: string,
  content: string,
  likes: string[],
  dislikes: string[],
  likesCount: number,
  comments: string[]
}

export enum PostActionTypes {
  LOAD_POSTS = "post/LOAD_POSTS",
  LOAD_POSTS_SUCCESS = "post/LOAD_POSTS_SUCCESS",
  ADD_POST = "post/ADD_POST",
  ADD_COMMENT_TO_POST = "post/ADD_COMMENT_TO_POST"
}

export interface AddPostAction extends Action {
  post: PostState
}

export interface LoadPostsSuccessAction extends Action {
  posts: NormalizedObjects<PostState>
}

export interface LoadPostsAction extends Action {
  posts: NormalizedObjects<PostState>
}

export interface AddCommentToPostAction extends Action {
  comment: CommentState
}