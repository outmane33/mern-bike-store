import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../types/authTypes";

const inialValue = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  loading: false,
};

export const authReducer = (state = inialValue, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        ...state,
        user: action.data,
        error: null,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.data,
        loading: false,
        user: null,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};
