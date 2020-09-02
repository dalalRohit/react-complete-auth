import * as actions from "../actions/type";
import { setData, removeUserData, updateObj } from "./../helper";

const initState = {
  register: false,
  auth: false,
  user: null,
  loading: false,
  reset: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.REGISTER_TRUE:
      return updateObj(state, { loading: false, register: true });

    case actions.REGISTER_FALSE:
      return updateObj(state, { loading: false, register: false });

    case actions.LOGIN_TRUE:
      return updateObj(state, {
        loading: false,
        auth: true,
        user: action.data.user,
      });

    case actions.LOGIN_FALSE:
      removeUserData();
      return updateObj(state, {
        loading: false,
        auth: false,
        user: null,
      });

    case actions.LOGOUT:
      removeUserData();
      return updateObj(state, { loading: false, auth: false, user: null });

    case actions.AUTH_START:
      return updateObj(state, { loading: true, user: null, auth: false });

    case actions.AUTH_TRUE:
      return updateObj(state, {
        auth: true,
        user: action.user,
        loading: false,
      });

    case actions.AUTH_FALSE:
      removeUserData();
      return updateObj(state, { loading: false, auth: false, user: null });

    case actions.RESET_TRUE:
      return updateObj(state, { reset: true, loading: false });

    case actions.RESET_FALSE:
      return updateObj(state, { reset: false, loading: false });
    default:
      return state;
  }
};
