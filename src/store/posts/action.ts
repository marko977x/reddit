import { action } from "typesafe-actions";
import { PostsActionTypes, PostsState } from "./types";

export const fetchPosts = () => action(PostsActionTypes.FETCH_POSTS);
export const loadPosts = (posts: PostsState) => action(PostsActionTypes.LOAD_POSTS, posts);

export const likePost = (postId: string) => action(PostsActionTypes.LIKE_POST, postId);
export const dislikePost = (postId: string) => action(PostsActionTypes.DISLIKE_POST, postId);

export const likeComment = (commentId: string) => action(PostsActionTypes.LIKE_COMMENT, commentId);

export const dislikeComment = (commentId: string) => action(PostsActionTypes.DISLIKE_COMMENT, commentId);