import { action } from "typesafe-actions";
import { CommentActionTypes, CommentsState } from "./types";

export const fetchComments = () => action(CommentActionTypes.FETCH_COMMENTS);

export const addComment = () => action(CommentActionTypes.ADD_COMMENT);

export const loadComments = (commentsState: CommentsState) =>
  action(CommentActionTypes.LOAD_COMMENTS, commentsState);
