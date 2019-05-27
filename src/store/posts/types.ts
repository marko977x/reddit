import { PostState } from "../post/types";

export interface PostsState {
  posts: PostState[]
}

export enum PostsActionTypes {
  FETCH_POSTS = "@@posts/FETCH_POSTS",
  LOAD_POSTS = "@@posts/LOAD_POSTS",
  LIKE_POST = "@@posts/LIKE_POST",
  DISLIKE_POST = "@@posts/DISLIKE_POST",
  LIKE_COMMENT = "@@posts/LIKE_COMMENT",
  DISLIKE_COMMENT = "@@posts/DISLIKE_COMMENT"
}