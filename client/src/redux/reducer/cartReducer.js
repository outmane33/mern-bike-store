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

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
};

const initialState = {
  cart: getInitialCart(),
  loading: false,
  error: null,
  totalPrice: 0,
  cartCount: 0,
};

const updateLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CART_SUCCESS: {
      updateLocalStorage(action.data);
      return {
        ...state,
        cart: action.data,
        loading: false,
        error: null,
      };
    }

    case CART_FAILURE:
      return {
        ...state,
        error: action.data,
        loading: false,
        cart: [],
      };

    case CART_UPDATE_QUANTITY: {
      updateLocalStorage(action.data);
      return {
        ...state,
        cart: action.data,
        loading: false,
        error: null,
      };
    }
    case START_REMOVE_FROM_CART: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case REMOVE_FROM_CART: {
      updateLocalStorage(action.data);
      return {
        ...state,
        cart: action.data,
        loading: false,
        error: null,
      };
    }

    case REMOVE_FROM_CART_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    }

    case UPDATE_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.data,
      };
    }
    case "UPDATE_CART_COUNT": {
      return {
        ...state,
        cartCount: action.data,
      };
    }
    default:
      return state;
  }
};
