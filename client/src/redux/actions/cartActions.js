import {
  CART_START,
  CART_SUCCESS,
  CART_FAILURE,
  CART_UPDATE_QUANTITY,
  REMOVE_FROM_CART,
  START_REMOVE_FROM_CART,
  REMOVE_FROM_CART_FAILURE,
  UPDATE_TOTAL_PRICE,
} from "../types/cartTypes";

export const cartStart = () => {
  return { type: CART_START };
};

export const cartSuccess = (data) => {
  return { type: CART_SUCCESS, data };
};

export const cartFailure = (data) => {
  return { type: CART_FAILURE, data };
};
export const cartUpdateQuantity = (data) => {
  return { type: CART_UPDATE_QUANTITY, data };
};

export const removeFromCartStart = () => {
  return { type: START_REMOVE_FROM_CART };
};

export const removeFromCart = (data) => {
  return { type: REMOVE_FROM_CART, data };
};

export const removeFromCartFailure = (data) => {
  return { type: REMOVE_FROM_CART_FAILURE, data };
};

export const updateTotalPrice = (data) => {
  return { type: UPDATE_TOTAL_PRICE, data };
};

export const updateCartCount = (data) => {
  return { type: "UPDATE_CART_COUNT", data };
};
