export interface StateType {
  title: string;
  body: string;
  error: string;
}

type ActionType = {
  type: string;
  payload: string;
};

export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_BODY":
      return { ...state, body: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const setTitle = (payload: string): ActionType => ({
  type: "SET_TITLE",
  payload,
});

export const setBody = (payload: string): ActionType => ({
  type: "SET_BODY",
  payload,
});

export const setError = (payload: string): ActionType => ({
  type: "SET_ERROR",
  payload,
});
