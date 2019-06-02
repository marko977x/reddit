import { UiActionTypes } from "./types";
import { Action } from "redux";

export interface SetLoggedUserAction extends Action {
  user: string
}

export function setLoggedUser(user: string): SetLoggedUserAction {
  return {type: UiActionTypes.SET_LOGGED_USER, user }
}

export interface SetTopicsAction extends Action {
  topics: string[]
}

export function setTopics(topics: string[]): SetTopicsAction {
  return {type: UiActionTypes.SET_TOPICS, topics }
}
  
export function logoutUser() { return {type: UiActionTypes.LOGOUT_USER }}
export function openLoginDialog() { return {type: UiActionTypes.OPEN_LOGIN_DIALOG }}
export function closeLoginDialog() { return {type: UiActionTypes.CLOSE_LOGIN_DIALOG }}
export function openSignupDialog() { return {type: UiActionTypes.OPEN_SIGNUP_DIALOG }}
export function closeSignupDialog() { return {type: UiActionTypes.CLOSE_SIGNUP_DIALOG }}