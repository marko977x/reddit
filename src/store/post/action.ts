import { action } from "typesafe-actions";
import { PostActionTypes, PostState } from "./types";
import { NormalizedObjects } from "..";

export const addPost = () => action(PostActionTypes.ADD_POST);
export const loadPosts = (posts: NormalizedObjects<PostState>) => 
  action(PostActionTypes.LOAD_POSTS, posts);