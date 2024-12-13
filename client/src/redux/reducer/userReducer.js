import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  LOGOUT,
} from "../types/userTypes";

const initialValue = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  wishlistCount: 0,
};

export const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        ...state,
        user: action.data,
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.data,
        loading: false,
        user: null,
      };

    case UPDATE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.data));
      return {
        ...state,
        user: action.data,
        loading: false,
        error: null,
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    case LOGOUT:
      localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
        error: null,
      };

    case "SET_WISHLIST_COUNT":
      return {
        ...state,
        wishlistCount: action.data,
      };

    default:
      return state;
  }
};
