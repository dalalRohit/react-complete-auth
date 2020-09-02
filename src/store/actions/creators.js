import * as actions from "./type";
import axios from "axios";
import { getToken } from "./../helper";

//CLEARFLASH ACTION CREATOR
export const clearFlash = () => {
  return {
    type: actions.CLEAR_FLASH,
  };
};

// REGISTER ACTION CREATOR
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

// LOGIN ACTION CREATOR
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
      console.log("[loginC] logged in..");
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

// LOGOUT ACTION CREATOR
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
      dispatch({ type: actions.AUTH_FALSE });
    });
};

// CHANGEPASSWORD ACTION CREATOR
export const changePassword = (values) => (dispatch, getState) => {
  const token = getToken();

  const {
    auth: { user },
  } = getState();
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
      dispatch({ type: actions.AUTH_FALSE });
    });

  return {};
};

//FORGOTPASSWORD ACTION CREATOR
export const forgotPassword = (values) => (dispatch) => {
  const data = {
    new_password: values.password,
    new_password_confirm: values.password_again,
  };
  const id = values.id;
  dispatch({ type: actions.AUTH_START });
  axios
    .put(`/forgot/${id}`, data)
    .then((res) => {
      console.log(res);
      dispatch({ type: actions.RESET_TRUE });
      dispatch({
        type: actions.FLASH,
        flash: "success",
        data: "Password reset succesfull!",
        page: "login",
      });
    })
    .catch((err) => {
      dispatch({ type: actions.RESET_FALSE });
      dispatch({
        type: actions.FLASH,
        flash: "danger",
        data: "Password reset unsuccesfull!",
        page: "forgot",
      });
    });
};
