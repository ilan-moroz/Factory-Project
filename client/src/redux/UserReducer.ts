import { User } from "../models/User";

export interface UserState {
  user: User | null;
  token: string | null;
}

export enum UserActionType {
  setLogout = "setLogout",
  setLogin = "setLogin",
  decreaseActionsNumber = "decreaseActionsNumber",
  resetNumOfActions = "resetNumOfActions",
}

export interface UserAction {
  type: UserActionType;
  payload?: any;
}

export const setLogoutAction = (): UserAction => {
  return { type: UserActionType.setLogout };
};

export const setLoginAction = (user: User, token: string): UserAction => {
  return { type: UserActionType.setLogin, payload: { user, token } };
};

export const decreaseActionNumberAction = () => {
  return { type: UserActionType.decreaseActionsNumber };
};

export const resetNumOfActionsAction = () => {
  return { type: UserActionType.resetNumOfActions };
};

export const userReducer = (
  currentState: UserState = {
    user: null,
    token: null,
  },
  action: UserAction
): UserState => {
  const newState = { ...currentState };

  switch (action.type) {
    case UserActionType.setLogout:
      newState.user = null;
      newState.token = null;
      break;

    case UserActionType.setLogin:
      newState.user = action.payload.user;
      newState.token = action.payload.token;
      break;

    case UserActionType.decreaseActionsNumber:
      if (newState.user)
        newState.user = {
          ...newState.user,
          numOfActions: newState.user.numOfActions - 1,
        };
      break;

    case UserActionType.resetNumOfActions:
      if (newState.user)
        newState.user = {
          ...newState.user,
          numOfActions: 10,
        };
      break;

    default:
      return currentState;
  }

  return newState;
};
