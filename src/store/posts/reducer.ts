import { PostsState, PostsActionTypes } from "./types";
import { Reducer } from "redux";
import { CommentState } from "../post/types";

const initialState: PostsState = {
  posts: []
}

const reducer: Reducer<PostsState> = (state = initialState, action) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS: {
      return state;
    }
    case PostsActionTypes.LOAD_POSTS: {
      return { posts: action.payload }
    }
    case PostsActionTypes.LIKE_POST: {
      return {
        ...state, posts: state.posts.map(post => {
          if (post.id === action.payload) post.likes++;
          return post;
        })
      }
    }
    case PostsActionTypes.DISLIKE_POST: {
      return {
        ...state, posts: state.posts.map(post => {
          if (post.id === action.payload) post.likes--;
          return post;
        })
      }
    }
    case PostsActionTypes.LIKE_COMMENT: {
      return {
        ...state, posts: state.posts.map(post => {
          post.comments.forEach(comment => {
            if(comment.id === action.payload) comment.likes++;
            else likeComment(comment.comments, action.payload);
          });
          return post;
      })
      }
    }
    case PostsActionTypes.DISLIKE_COMMENT: {
      return {
        ...state, posts: state.posts.map(post => {
          post.comments.forEach(comment => {
            if (comment.id === action.payload) comment.likes--;
            else likeComment(comment.comments, action.payload);
          });
          return post;
        })
      }
    }
    default: return state;
  }
}

function likeComment(comments: CommentState[], id: string) {
  return comments.map(comment => {
    if (comment.id === id) comment.likes++;
    likeComment(comment.comments, id);
    return comment;
  });
}

export { reducer as postsReducer };