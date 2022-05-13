import * as actionTypes from "store/action-types/userInfo";

const initialState = {};

export default function userInfoReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SAVE_USER_INFO:
      return payload;
    default:
      return state;
  }
}
