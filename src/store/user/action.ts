import { action } from "typesafe-actions";
import { UserActionTypes, UserState } from "./types";
import { NormalizedObjects } from "..";

export const signUp = (userData: { username: string, email: string, password: string, id:string }) =>
  action(UserActionTypes.SIGN_UP, userData);

export const loadUsers = (users: NormalizedObjects<UserState>) =>
  action(UserActionTypes.LOAD_USERS, users);