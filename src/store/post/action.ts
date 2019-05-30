import { action } from "typesafe-actions";
import { PostActionTypes, PostState } from "./types";
import { NormalizedObjects } from "..";
import { CommentState } from "../comment/types";

export const addPost = () => action(PostActionTypes.ADD_POST);

export const loadPosts = (posts: NormalizedObjects<PostState>) =>
  action(PostActionTypes.LOAD_POSTS, posts);

export const addCommentToPost = (comment: CommentState) =>
  action(PostActionTypes.ADD_COMMENT_TO_POST, comment);