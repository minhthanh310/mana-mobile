import * as types from "./action-types";

const initialState = {
  app: {
    state: undefined
  }
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_APP_STATE:
      return {
        ...state,
        app: {
          ...state.app,
          state: action.state
        }
      };
    default:
      return state;
  }
}
