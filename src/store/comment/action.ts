import { action } from "typesafe-actions";
import { CommentActionTypes, CommentState } from "./types";
import { NormalizedObjects } from "..";

export const addComment = () => action(CommentActionTypes.ADD_COMMENT);
export const loadComments = (comments: NormalizedObjects<CommentState>) =>
  action(CommentActionTypes.LOAD_COMMENTS, comments);
