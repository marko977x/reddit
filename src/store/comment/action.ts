import { action } from "typesafe-actions";
import { CommentActionTypes, CommentState } from "./types";
import { NormalizedObjects } from "..";

export const loadComments = (comments: NormalizedObjects<CommentState>) =>
  action(CommentActionTypes.LOAD_COMMENTS, comments);

export const replyToComment = (comment: CommentState) =>
  action(CommentActionTypes.REPLY_TO_COMMENT, comment);