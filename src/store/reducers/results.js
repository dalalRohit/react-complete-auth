import { STORE_RES, DEL_RES } from "./../actions/type";

const initState = {
  results: [],
};

export const resultsReducer = (state = initState, action) => {
  switch (action.type) {
    case STORE_RES:
      const newRes = state.results.concat(action.data);
      return {
        results: newRes,
      };
    case DEL_RES:
      const newRes2 = state.results.filter((x) => x.id !== action.data.val);
      return {
        results: newRes2,
      };
    default:
      return state;
  }
};
