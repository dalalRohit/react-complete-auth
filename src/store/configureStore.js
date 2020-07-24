import { applyMiddleware, compose, createStore } from "redux";
import { createRootReducer } from "./reducers/reducer";
import thunk from "redux-thunk";

//https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8226884#overview
/*
const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("[Middleware] Dispatching ", action);
      const result = next(action);
      console.log("[Middleware] next state ", store.getState());
      return result;
    };
  };
};
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

export const configureStore = () => {
  const store = createStore(
    createRootReducer(),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
};
