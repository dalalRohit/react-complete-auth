export const ADD_5 = "ADD_5";
export const MUL_5 = "MUL_5";

export const STORE_RES = "STORE_RES";
export const DEL_RES = "DEL_RES";

//sync action
const syncStoreRes = (data) => {
  return {
    type: STORE_RES,
    data,
  };
};

//async action creator
const storeRes = (data) => {
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

export const RESET_TRUE = "RESET_TRUE";
export const RESET_FALSE = "RESET_FALSE";

export const LOGOUT = "LOGOUT";

export const AUTH_START = "AUTH_START";
export const AUTH_FALSE = "AUTH_FAIL";
export const AUTH_TRUE = "AUTH_TRUE";

export const USER_CHECKED = "USER_CHECKED";

// flash actions
export const FLASH = "FLASH";
export const CLEAR_FLASH = "CLEAR_FLASH";

export const CHANGE_PSWD = "CHANGE_PSWD";
