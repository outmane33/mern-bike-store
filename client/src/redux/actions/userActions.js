import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  LOGOUT,
} from "../types/userTypes";

export const signInStart = () => {
  return { type: LOGIN_START };
};

export const signInSuccess = (data) => {
  return { type: LOGIN_SUCCESS, data };
};

export const signInFailure = (data) => {
  return { type: LOGIN_FAILURE, data };
};

export const signOut = () => {
  return { type: LOGOUT };
};

export const updateStart = () => {
  return { type: UPDATE_START };
};

export const updateSuccess = (data) => {
  return { type: UPDATE_SUCCESS, data };
};

export const updateFailure = (data) => {
  return { type: UPDATE_FAILURE, data };
};

export const wishlistCount = (data) => {
  return { type: "SET_WISHLIST_COUNT", data };
};
