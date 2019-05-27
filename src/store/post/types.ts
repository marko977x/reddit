export interface PostState {
  id: string
  author: string,
  topic: string,
  content: string,
  likes: number,
  comments: CommentState[]
}

export interface CommentState {
  id: string,
  author: string,
  content: string,
  likes: number,
  comments: CommentState[]
}

export enum PostActionTypes {
  ADD_COMMENT = "@@post/ADD_COMMENT"
}