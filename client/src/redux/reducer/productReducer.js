import {
  PRODUCTS_START,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAILURE,
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_FAILURE,
} from "../types/productTypes";

const initialValue = {
  products: null,
  loading: false,
  error: null,
  productToEdit: null,
};

export const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    case PRODUCTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.data,
        loading: false,
        error: null,
      };
    case PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.data,
        loading: false,
        products: null,
      };
    case EDIT_PRODUCT_START:
      return {
        ...state,
        productToEdit: action.data,
      };
    case EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        productToEdit: null,
      };
    case "SET_IMAGE_COVER":
      return {
        ...state,
        imageCover: action.data,
      };
    case "SET_IMAGES":
      return {
        ...state,
        images: action.data,
      };
    default:
      return state;
  }
};
