import * as actions from "./type";
import axios from "axios";
import { getToken, removeUserData, setToken } from "./../helper";
export const clearFlash = () => {
  return {
    type: actions.CLEAR_FLASH,
  };
};

export const register = (data) => (dispatch) => {
  dispatch({ type: actions.AUTH_START });

  axios
    .post("/register", data)
    .then((res) => {
      dispatch({ type: actions.REGISTER_TRUE });
      dispatch({
        type: actions.FLASH,
        flash: "success",
        data: "You are registered. Login now!",
        page: "login",
      });
    })
    .catch((err) => {
      dispatch({ type: actions.REGISTER_FALSE });
      dispatch({
        type: actions.FLASH,
        flash: "danger",
        data: err.response.data.msg,
        page: "register",
      });
    });
};

export const login = (data) => (dispatch) => {
  dispatch({ type: actions.AUTH_START });

  axios
    .post("/login", data)
    .then((res) => {
      const data = {
        ...res.data,
        token: res.headers["auth-token"],
      };
      dispatch({ type: actions.LOGIN_TRUE, data });
    })
    .catch((err) => {
      /*{data: {…}, status: 400, statusText: "Bad Request", headers: {…}, config: {…}, …} */
      dispatch({ type: actions.LOGIN_FALSE });
      dispatch({
        type: actions.FLASH,
        flash: "danger",
        data: err.response.data.msg,
        page: "login",
      });
    });
};

export const logout = (total) => (dispatch) => {
  const token = getToken();

  let headers = {
    "auth-token": token,
  };
  let url = total ? "/logoutall" : "/logout";

  axios
    .get(url, { headers })
    .then((res) => {
      dispatch({ type: actions.LOGOUT });

      return dispatch({
        type: actions.FLASH,
        flash: "success",
        data: "You are logged out.",
        page: "login",
      });
    })
    .catch((err) => {
      dispatch({ type: actions.AUTH_FAIL });
    });
};

export const checkAuth = () => (dispatch) => {
  dispatch({ type: actions.AUTH_START });
  const token = getToken();

  if (!token) {
    dispatch({ type: actions.AUTH_FAIL });
    return dispatch({
      type: actions.FLASH,
      flash: "danger",
      data: "You are not logged in! Login please",
      page: "login",
    });
  } else {
    let headers = {
      "auth-token": token,
    };

    axios
      .get("/check", { headers })
      .then((res) => {
        if (res.data.user) {
          dispatch({
            type: actions.USER_CHECKED,
            user: res.data.id,
            token,
          });
        }
      })
      .catch(() => {
        dispatch({ type: actions.AUTH_FAIL });

        dispatch({
          type: actions.FLASH,
          flash: "danger",
          data: "You are logged out. Invalid Token",
          page: "login",
        });
      });
  }
};

export const changePassword = (values, withToken) => (dispatch, getState) => {
  const token = getToken();

  const {
    auth: { user },
  } = getState() || values.id;
  const data = {
    new_password: values.password,
    new_password_confirm: values.password_again,
  };
  dispatch({ type: actions.AUTH_START });

  axios
    .put(`/update/${user}`, data, { headers: { "auth-token": token } })
    .then((res) => {
      dispatch({ type: "AUTH_TRUE" });
      dispatch({
        type: actions.FLASH,
        flash: "success",
        data: "Password changed succesfully!",
        page: "dash",
      });
    })
    .catch((err) => {
      dispatch({ type: actions.AUTH_FAIL });
    });

  return {};
};

export const forgotPassword = () => (dispatch) => {};
