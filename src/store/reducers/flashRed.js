import { FLASH, CLEAR_FLASH } from "../actions/type";

const initState = {
  type: "",
  msg: "",
  page:"" //page describes "route" to which the flash message is intented/meant for.
};

export const flashReducer = (state = initState, action) => {
  switch (action.type) {
    case FLASH:
      return {
        type: action.flash,
        msg: action.data,
        page:action.page
      };
    case CLEAR_FLASH:
      return {
        type: "",
        msg: "",
        page:""
      };
    default:
      return state;
  }
};
