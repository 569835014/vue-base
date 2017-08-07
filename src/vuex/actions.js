import * as NAME from '../common/constant'
export const saveUserInfo = function ({commit}, userInfo) {
  commit(NAME.USER_INFO, userInfo)
};

