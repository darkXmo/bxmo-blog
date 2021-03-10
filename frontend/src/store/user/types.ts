// store/user/types.ts

export interface UserState {
  username: string;
  token: string;
}

export const mutationsType: Record<string, string> = {
  SAVE_USER_INFO: "saveUserInfo",
  CLEAR_USER_INFO: "clearUserInfo",
};
