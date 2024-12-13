import {
  PRODUCTS_START,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAILURE,
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_FAILURE,
} from "../types/productTypes";

export const productStart = () => {
  return { type: PRODUCTS_START };
};

export const productSuccess = (data) => {
  return { type: PRODUCTS_SUCCESS, data };
};

export const productFailure = (data) => {
  return { type: PRODUCTS_FAILURE, data };
};

export const productToEdit = (data) => {
  return { type: EDIT_PRODUCT_START, data };
};

export const editProductFailure = () => {
  return { type: EDIT_PRODUCT_FAILURE };
};

export const setImageCover = (data) => {
  return { type: "SET_IMAGE_COVER", data };
};

export const setImages = (data) => {
  return { type: "SET_IMAGES", data };
};
