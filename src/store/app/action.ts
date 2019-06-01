import { action } from "typesafe-actions";
import { AppActionTypes } from "./types";

export const fetchData = () => action(AppActionTypes.FETCH_DATA);