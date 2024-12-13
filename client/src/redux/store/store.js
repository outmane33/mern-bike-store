import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { routResucer } from "../reducer/routResucer";

export const store = createStore(routResucer, composeWithDevTools());
