import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { PostState, PostActionTypes, LoadPostsAction, AddCommentToPostAction, AddPostAction } from "./types";
import { AppActionTypes } from "../app/types";
import { UserActionTypes, LikePostAction, DislikePostAction } from "../user/types";
import { alreadyLiked, removeFrom, addTo, alreadyDisliked } from "../user/reducer";

const initialState: NormalizedObjects<PostState> = {
  byId: {},
  allIds: [],
  isLoaded: false
}

const reducer: Reducer<NormalizedObjects<PostState>> = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.FETCH_DATA: { return state; }
    case PostActionTypes.ADD_POST: {
      const post = (action as AddPostAction).post;
      return {
        ...state, 
        byId: {
          ...state.byId,
          [post.id]: post
        },
        allIds: [...state.allIds, post.id]
      }
    }
    case PostActionTypes.LOAD_POSTS_SUCCESS: {
      return {
        ...state,
        ...(action as LoadPostsAction).posts,
        isLoaded: true
      }
    }
    case PostActionTypes.ADD_COMMENT_TO_POST: {
      const {id, postId} = (action as AddCommentToPostAction).comment;
      return {
        ...state,
        byId: {
          ...state.byId,
          [postId as string]: {
            ...state.byId[postId as string],
            comments: [...state.byId[postId as string].comments, id]
          }
        }
      }
    }
    case UserActionTypes.LIKE_POST: {
      const {postId, userId} = (action as LikePostAction);
      let {likes, dislikes} = state.byId[postId];

      likes = alreadyLiked(likes, userId) ? 
        removeFrom(likes, userId) : addTo(likes, userId);

      dislikes = removeFrom(dislikes, userId);

      return setState(state, postId, likes, dislikes);
    }
    case UserActionTypes.DISLIKE_POST: {
      const {postId, userId} = (action as DislikePostAction);
      let {likes, dislikes} = state.byId[postId];

      dislikes = alreadyDisliked(dislikes, userId) ?
        removeFrom(dislikes, userId) : addTo(dislikes, userId);

      likes = removeFrom(likes, userId);
      
      return setState(state, postId, likes, dislikes);
    }
    default: return state;
  }
}

const setState = (state: any, postId: string, likes: string[], dislikes: string[]) => {
  return {
    ...state,
    byId: {
      ...state.byId,
      [postId]: {
        ...state.byId[postId],
        dislikes: dislikes,
        likes: likes,
        likesCount: likes.length - dislikes.length
      }
    }
  }
}

export { reducer as postReducer }