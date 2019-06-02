import { PostActionTypes, PostState, AddPostAction, LoadPostsSuccessAction, LoadPostsAction, AddCommentToPostAction } from "./types";
import { NormalizedObjects } from "..";
import { CommentState } from "../comment/types";

export function addPost(post: PostState): AddPostAction { 
  return {type: PostActionTypes.ADD_POST, post }
}

export function loadPosts(posts: NormalizedObjects<PostState>): LoadPostsAction {
  return { type: PostActionTypes.LOAD_POSTS, posts};
}

export function loadPostsSuccess(posts: NormalizedObjects<PostState>): LoadPostsSuccessAction {
  return { type: PostActionTypes.LOAD_POSTS_SUCCESS, posts};
}

export function addCommentToPost(comment: CommentState): AddCommentToPostAction {
  return {type: PostActionTypes.ADD_COMMENT_TO_POST, comment }
}