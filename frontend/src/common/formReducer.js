// @flow
export const SET_USERNAME = "SET_USERNAME";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_ERROR = "SET_ERROR";

export type StateType = {
  username: string,
  password: string,
  error: string
};

export type ActionType = {
  type: string,
  payload: string
};

export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const INITIAL_STATE = {
  username: "",
  password: "",
  error: ""
};

const actionBuilder = (action: string) => (payload: string) => ({
  type: action,
  payload
});

export const actions = {
  setUsername: actionBuilder(SET_USERNAME),
  setPassword: actionBuilder(SET_PASSWORD),
  setError: actionBuilder(SET_ERROR)
};
