import axios from "axios";

export const ADD_5 = "ADD_5";
export const MUL_5 = "MUL_5";

export const STORE_RES = "STORE_RES";
export const DEL_RES = "DEL_RES";

//sync action
export const syncStoreRes = (data) => {
  return {
    type: STORE_RES,
    data,
  };
};

//async action creator
export const storeRes = (data) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      console.log(getState());
      dispatch(syncStoreRes(data));
    }, 2000);
  };
};

/*--------------------------------- MAIN ACTIONS ------------------------------------ */

//auth actions
export const REGISTER_TRUE = "REGISTER_TRUE";
export const REGISTER_FALSE = "REGISTER_FALSE";

export const LOGIN_TRUE = "LOGIN_TRUE";
export const LOGIN_FALSE = "LOGIN_FALSE";

export const CHECK_AUTH = "CHECK_AUTH";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOGOUT = "LOGOUT";
export const AUTH_START = "AUTH_START";

export const FLASH = "FLASH";
export const CLEAR_FLASH = "CLEAR_FLASH";
export const REDIRECT = "REDIRECT";

export const clearFlash = () => {
  return {
    type: CLEAR_FLASH,
  };
};

export const register = (data) => (dispatch) => {
  dispatch({ type: AUTH_START });

  axios
    .post("/register", data)
    .then((res) => {
      dispatch({ type: REGISTER_TRUE });
      dispatch({
        type: FLASH,
        flash: "success",
        data: "You are registered. Login now!",
        page: "login",
      });
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FALSE });
      dispatch({
        type: FLASH,
        flash: "danger",
        data: err.response.data.msg,
        page: "register",
      });
    });
};

export const login = (data) => (dispatch) => {
  dispatch({ type: AUTH_START });

  axios
    .post("/login", data)
    .then((res) => {
      const data = {
        ...res.data,
        token: res.headers["auth-token"],
      };
      dispatch({ type: LOGIN_TRUE, data });
    })
    .catch((err) => {
      /*{data: {…}, status: 400, statusText: "Bad Request", headers: {…}, config: {…}, …} */
      dispatch({ type: LOGIN_FALSE });
      dispatch({
        type: FLASH,
        flash: "danger",
        data: err.response.data.msg,
        page: "login",
      });
    });
};

export const logout = (total) => (dispatch) => {
  const token = localStorage.getItem("token");

  let headers = {
    "auth-token": token,
  };
  let url = total ? "/logoutall" : "/logout";

  axios
    .get(url, { headers })
    .then((res) => {
      dispatch({ type: LOGOUT });

      dispatch({
        type: FLASH,
        flash: "success",
        data: "You are logged out.",
        page: "login",
      });

      return;
    })
    .catch((err) => {
      dispatch({ type: AUTH_FAIL });
    });
};

export const chechAuth = () => (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch({
      type: FLASH,
      flash: "danger",
      data: "You are not logged in! Login please",
      page: "login",
    });
    return dispatch({ type: AUTH_FAIL });
  } else {
    let headers = {
      "auth-token": token,
    };
    axios
      .get("/check", { headers })
      .then((res) => {
        if (res.data.user) {
          return dispatch({ type: CHECK_AUTH, data: res.data.id });
        }
      })
      .catch(() => {
        dispatch({ type: AUTH_FAIL });

        dispatch({
          type: FLASH,
          flash: "danger",
          data: "You are logged out. Invalid Token",
          page: "login",
        });
      });
  }
};
