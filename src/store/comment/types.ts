export interface CommentState {
  id: string,
  authorId: string,
  postId: string | null,
  parentCommentId: string | null,
  content: string,
  likes: number,
  comments: string[]
}

export enum CommentActionTypes {
  LOAD_COMMENTS = "comment/LOAD_COMMENTS",
  CREATE_COMMENT = "comment/CREATE_COMMENT",
  ADD_COMMENT_TO_COMMENT = "comment/ADD_COMMENT_TO_COMMENT"
}