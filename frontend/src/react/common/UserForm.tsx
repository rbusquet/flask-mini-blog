import React from "react";
import { reducer as formReducer, actions, INITIAL_STATE } from "./formReducer";
import { postData } from "./helpers";
import { UserContext, User } from "./context";
import history from "./history";

type PropTypes = {
  url: string;
  buttonTxt: string;
  setUser?: boolean;
};

export default function UserForm(props: PropTypes) {
  const [, setUser] = React.useContext(UserContext);
  const { buttonTxt } = props;
  const [{ error, ...form }, dispatch] = React.useReducer(formReducer, INITIAL_STATE);

  const onSubmit = React.useCallback(
    (ev) => {
      ev.preventDefault();
      const post = async () => {
        try {
          const user = await postData<User, typeof form>(props.url, form);
          dispatch(actions.setError(""));
          if (props.setUser) {
            setUser(user);
          }
          history.push("/");
        } catch (ex) {
          dispatch(actions.setError(ex.error));
        }
      };
      post();
    },
    [form, props.setUser, props.url, setUser],
  );
  return (
    <>
      {error ? <div className="flash">{error}</div> : null}
      <form method="post" onSubmit={onSubmit}>
        <label htmlFor="username">
          Username
          <input
            name="username"
            id="username"
            required
            value={form.username}
            onChange={(ev) => dispatch(actions.setUsername(ev.target.value))}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            required
            value={form.password}
            onChange={(ev) => dispatch(actions.setPassword(ev.target.value))}
          />
        </label>

        <input type="submit" value={buttonTxt} />
      </form>
    </>
  );
}

UserForm.defaultProps = {
  setUser: false,
};
