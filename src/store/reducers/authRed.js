import * as actions from "../actions/type";
import { getToken, setData, removeUserData, updateObj } from "./../helper";

const initState = {
  register: false,
  auth: false,
  user: null,
  loading: false,
  checked: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return updateObj(state, { loading: true });

    case actions.REGISTER_TRUE:
      return updateObj(state, { loading: false, register: true });

    case actions.REGISTER_FALSE:
      return updateObj(state, { loading: false, register: false });

    case actions.LOGIN_TRUE:
      setData(action.data.token, action.data.user);
      return updateObj(state, {
        loading: false,
        auth: true,
        user: action.data.user,
      });

    case actions.LOGIN_FALSE:
    case actions.AUTH_FAIL:
      removeUserData();
      return updateObj(state, { loading: false, auth: false, user: null });

    case actions.LOGOUT:
      removeUserData();
      return updateObj(state, { loading: false, auth: false, user: null });

    case actions.USER_CHECKED:
      setData(action.token, action.user);

      return updateObj(state, {
        auth: true,
        user: action.user,
        checked: true,
      });

    case actions.AUTH_TRUE:
      return updateObj(state, {
        auth: true,
        user: action.user,
        loading: false,
      });
    default:
      return state;
  }
};
