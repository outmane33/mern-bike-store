import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";

export const routResucer = combineReducers({
  user: userReducer,
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});
