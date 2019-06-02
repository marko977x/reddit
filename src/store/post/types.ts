export interface PostState {
  id: string
  authorId: string,
  topic: string,
  content: string,
  likes: string[],
  dislikes: string[],
  likesCount: number,
  comments: string[]
}

export enum PostActionTypes {
  LOAD_POSTS = "post/LOAD_POSTS",
  ADD_POST = "post/ADD_POST",
  ADD_COMMENT_TO_POST = "post/ADD_COMMENT_TO_POST"
}