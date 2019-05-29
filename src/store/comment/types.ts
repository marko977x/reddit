export interface CommentState {
  id: string,
  authorId: string,
  postId: string,
  content: string,
  likes: number,
  comments: string[]
}

export enum CommentActionTypes {
  LOAD_COMMENTS = "comment/LOAD_COMMENTS",
  ADD_COMMENT = "comment/ADD_COMMENT"
}