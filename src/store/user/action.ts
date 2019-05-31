import { action } from "typesafe-actions";
import { UserActionTypes, UserState, SignUpData } from "./types";
import { NormalizedObjects } from "..";

export const signUp = (signUpData: SignUpData) =>
  action(UserActionTypes.SIGN_UP, signUpData);

export const loadUsers = (users: NormalizedObjects<UserState>) =>
  action(UserActionTypes.LOAD_USERS, users);