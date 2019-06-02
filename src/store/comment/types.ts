export interface CommentState {
  id: string,
  authorId: string,
  postId: string | null,
  parentCommentId: string | null,
  content: string,
  likes: string[],
  dislikes: string[],
  likesCount: number,
  comments: string[],
}

export interface ReplyToCommentData {
  id: string,
  parentCommentId: string
}

export enum CommentActionTypes {
  LOAD_COMMENTS = "comment/LOAD_COMMENTS",
  REPLY_TO_COMMENT = "comment/REPLY_TO_COMMENT"
}