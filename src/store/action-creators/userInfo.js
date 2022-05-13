import * as actionTypes from "store/action-types/userInfo";

export const saveUserInfo = (payload) => ({
  type: actionTypes.SAVE_USER_INFO,
  payload,
});
