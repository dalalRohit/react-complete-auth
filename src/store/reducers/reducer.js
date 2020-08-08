// import { counterReducer } from "./counter";
// import { resultsReducer } from "./results";
import { authReducer } from "./authRed";
import { flashReducer } from "./flashRed";

import { combineReducers } from "redux";

export const createRootReducer = (history) =>
  combineReducers({
    // ctr: counterReducer,
    // res: resultsReducer,
    auth: authReducer,
    flash: flashReducer,
  });
