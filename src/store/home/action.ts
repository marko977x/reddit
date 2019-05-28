import { action } from "typesafe-actions";
import { PostsActionTypes, PostsState } from "./types";

export const fetchAppState = () => action(PostsActionTypes.FETCH_APP_STATE);
export const loadAppState = (posts: PostsState) => action(PostsActionTypes.LOAD_APP_STATE, posts);

export const likePost = (postId: string) => action(PostsActionTypes.LIKE_POST, postId);
export const dislikePost = (postId: string) => action(PostsActionTypes.DISLIKE_POST, postId);
