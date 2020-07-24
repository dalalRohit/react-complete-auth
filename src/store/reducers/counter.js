import { ADD_5, MUL_5 } from "./../actions/type";

const initState = {
  counter: 0,
};

export const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_5:
      return {
        counter: state.counter + 5,
      };
    case MUL_5:
      return {
        counter: state.counter * 5,
      };
    default:
      return state;
  }
};
