import { action } from "typesafe-actions";
import { UserActionTypes, UserState } from "./types";
import { NormalizedObjects } from "..";

export const login = (email: string, password: string) =>
  action(UserActionTypes.LOGIN, email, password);

export const logout = () => action(UserActionTypes.LOGOUT);

export const signUp = (userData: { username: string, email: string, password: string }) =>
  action(UserActionTypes.SIGN_UP, userData);

export const loadUsers = (users: NormalizedObjects<UserState>) =>
  action(UserActionTypes.LOAD_USERS, users);