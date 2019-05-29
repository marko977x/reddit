import { action } from "typesafe-actions";
import { UiActionTypes } from "./types";

export const setLoggedUser = (userId: string) => 
  action(UiActionTypes.SET_LOGGED_USER, userId);

export const fetchData = () => action(UiActionTypes.FETCH_DATA);

export const setShownPosts = (postsIds: string[]) => 
  action(UiActionTypes.SET_SHOWN_POSTS, postsIds);