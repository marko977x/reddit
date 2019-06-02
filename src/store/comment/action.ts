import { CommentActionTypes, CommentState, LoadCommentsSuccessAction, LoadCommentsAction, ReplyToCommentAction } from "./types";
import { NormalizedObjects } from "..";

export function loadComments(comments: NormalizedObjects<CommentState>): LoadCommentsAction {
  return {type: CommentActionTypes.LOAD_COMMENTS, comments }
}

export function loadCommentsSuccess(comments: NormalizedObjects<CommentState>): LoadCommentsSuccessAction {
  return {type: CommentActionTypes.LOAD_COMMENTS_SUCCESS, comments }
}

export function replyToComment(comment: CommentState): ReplyToCommentAction {
  return {type: CommentActionTypes.REPLY_TO_COMMENT, comment }
}