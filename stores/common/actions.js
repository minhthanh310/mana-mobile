import * as types from "./action-types";

export function changeAppState(state) {
  return {
    type: types.CHANGE_APP_STATE,
    state
  };
}
