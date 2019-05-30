import { action } from "typesafe-actions";
import { CommentActionTypes, CommentState } from "./types";
import { NormalizedObjects } from "..";

export const createComment = (comment: CommentState) =>
  action(CommentActionTypes.CREATE_COMMENT, comment);

export const loadComments = (comments: NormalizedObjects<CommentState>) =>
  action(CommentActionTypes.LOAD_COMMENTS, comments);

export const addCommentToComment = (parentCommentId: string, id: string) =>
  action(CommentActionTypes.ADD_COMMENT_TO_COMMENT, {parentCommentId, id});