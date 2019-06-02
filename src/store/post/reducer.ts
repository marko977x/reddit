import { NormalizedObjects } from "..";
import { Reducer } from "redux";
import { PostState, PostActionTypes } from "./types";
import { AppActionTypes } from "../app/types";
import { UserActionTypes } from "../user/types";
import { alreadyLiked, removeFrom, addTo, alreadyDisliked } from "../user/reducer";

const initialState: NormalizedObjects<PostState> = {
  byId: {},
  allIds: []
}

const reducer: Reducer<NormalizedObjects<PostState>> = (state = initialState, action) => {
  switch (action.type) {
    case AppActionTypes.FETCH_DATA: { return state; }
    case PostActionTypes.ADD_POST: {
      const id = action.payload.id;
      return {
        ...state, 
        byId: {
          ...state.byId,
          [id]: action.payload
        },
        allIds: [...state.allIds, id]
      }
    }
    case PostActionTypes.LOAD_POSTS: {
      return action.payload;
    }
    case PostActionTypes.ADD_COMMENT_TO_POST: {
      const {id, postId} = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [postId]: {
            ...state.byId[postId],
            comments: [...state.byId[postId].comments, id]
          }
        }
      }
    }
    case UserActionTypes.LIKE_POST: {
      const {postId, userId} = action.payload;
      let {likes, dislikes} = state.byId[postId];

      likes = alreadyLiked(likes, userId) ? 
        removeFrom(likes, userId) : addTo(likes, userId);

      dislikes = removeFrom(dislikes, userId);

      return setState(state, postId, likes, dislikes);
    }
    case UserActionTypes.DISLIKE_POST: {
      const {postId, userId} = action.payload;
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