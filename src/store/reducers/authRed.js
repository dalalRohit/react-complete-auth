import {
  REGISTER_FALSE,
  REGISTER_TRUE,
  LOGIN_FALSE,
  LOGIN_TRUE,
  CHECK_AUTH,
  LOGOUT,
  AUTH_FAIL,
  AUTH_START,
} from "../actions/type";

const initState = {
  register: false,
  auth: false,
  user: null,
  loading: false,
  token: null,
};

const getToken = () => {
  return localStorage.getItem("token");
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const removeUserData = () => {
  localStorage.removeItem("token");
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_TRUE:
      return {
        ...state,
        loading: false,
        register: true,
      };
    case REGISTER_FALSE:
      return {
        ...state,
        loading: false,
        register: false,
      };

    case LOGIN_TRUE:
      setToken(action.data.token);
      return {
        ...state,
        // loading:false,
        auth: true,
        user: action.data.user,
        token: getToken(),
      };

    case LOGIN_FALSE:
    case AUTH_FAIL:
      removeUserData();
      return {
        ...state,
        loading: false,
        auth: false,
        user: null,
        token: null,
      };

    case LOGOUT:
      removeUserData();
      return {
        ...state,
        loading: false,
        auth: false,
        user: null,
        token: null,
      };
    case CHECK_AUTH:
      return {
        ...state,
        auth: getToken() !== null ? true : false,
        user: action.data,
      };
    default:
      return state;
  }
};
