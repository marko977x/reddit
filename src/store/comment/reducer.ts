import { CommentActionTypes, CommentState, LoadCommentsAction, ReplyToCommentAction } from "./types";
import { Reducer } from "redux";
import { NormalizedObjects } from "..";
import { PostActionTypes, AddCommentToPostAction } from "../post/types";
import { AppActionTypes } from "../app/types";
import { UserActionTypes, LikeCommentAction, DislikeCommentAction } from "../user/types";
import { alreadyLiked, removeFrom, addTo, alreadyDisliked } from "../user/reducer";

const initialState: NormalizedObjects<CommentState> = {
  byId: {},
  allIds: [],
  isLoaded: false
}

const reducer: Reducer<NormalizedObjects<CommentState>> = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.FETCH_DATA: { return state; }
    case CommentActionTypes.LOAD_COMMENTS_SUCCESS: {
      return {
        ...(action as LoadCommentsAction).comments,
        isLoaded: true
      }
    }
    case PostActionTypes.ADD_COMMENT_TO_POST: {
      const comment = (action as AddCommentToPostAction).comment;
      return {
        ...state,
        byId: {
          ...state.byId,
          [comment.id]: comment
        },
        allIds: [...state.allIds, comment.id]
      }
    }
    case CommentActionTypes.REPLY_TO_COMMENT: {
      const comment = (action as ReplyToCommentAction).comment;
      const parentCommentId: string = comment.parentCommentId as string;
      return {
        ...state,
        byId: {
          ...state.byId,
          [parentCommentId]: {
            ...state.byId[parentCommentId],
            comments: [...state.byId[parentCommentId].comments, comment.id]
          },
          [comment.id]: comment
        },
        allIds: [...state.allIds, comment.id]
      }
    }
    case UserActionTypes.LIKE_COMMENT: {
      const { commentId, userId } = (action as LikeCommentAction);
      let {likes, dislikes} = state.byId[commentId];

      likes = alreadyLiked(likes, userId) ?
        removeFrom(likes, userId) : addTo(likes, userId);

      dislikes = removeFrom(dislikes, userId);

      return setState(state, commentId, likes, dislikes);
    }
    case UserActionTypes.DISLIKE_COMMENT: {
      const { commentId, userId } = (action as DislikeCommentAction);
      let {likes, dislikes} = state.byId[commentId];

      dislikes = alreadyDisliked(dislikes, userId) ?
        removeFrom(dislikes, userId) : addTo(dislikes, userId);

      likes = removeFrom(likes, userId);

      return setState(state, commentId, likes, dislikes);
    }
    default: return state;
  }
}

const setState = (state:any, commentId: string, likes: string[], dislikes: string[]) => {
  return {
    ...state,
    byId: {
      ...state.byId,
      [commentId]: {
        ...state.byId[commentId],
        dislikes: dislikes,
        likes: likes,
        likesCount: likes.length - dislikes.length
      }
    }
  }
}

export { reducer as commentReducer };