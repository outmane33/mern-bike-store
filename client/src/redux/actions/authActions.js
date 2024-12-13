import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../types/authTypes";

export const loginStart = () => {
  return { type: LOGIN_START };
};

export const loginSuccess = (data) => {
  return { type: LOGIN_SUCCESS, data };
};

export const loginFailure = (data) => {
  return { type: LOGIN_FAILURE, data };
};

export const logout = () => {
  return { type: LOGOUT };
};
