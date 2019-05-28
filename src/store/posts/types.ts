import { NormalizedObjects, UiState } from "..";
import { UserState } from "../user/types";
import { CommentState } from "../comments/types";

export interface PostsState {
  posts: NormalizedObjects<PostState>,
  users: NormalizedObjects<UserState>,
  comments: NormalizedObjects<CommentState>,
  ui: UiState
}

export interface PostState {
  id: string
  authorId: string,
  topic: string,
  content: string,
  likes: number,
  comments: string[]
}

export enum PostsActionTypes {
  FETCH_POSTS = "@@posts/FETCH_POSTS",
  LOAD_POSTS = "@@posts/LOAD_POSTS",
  LIKE_POST = "@@posts/LIKE_POST",
  DISLIKE_POST = "@@posts/DISLIKE_POST"
}