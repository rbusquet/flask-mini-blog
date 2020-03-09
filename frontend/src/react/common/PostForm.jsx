// @flow
import * as React from "react";
import { Redirect } from "react-router";
import { reducer, setBody, setTitle, setError } from "./postReducer";
import { postData } from "./helpers";

import history from "./history";
import { UserContext } from "./context";

export type Post = {
  title: string,
  body: string
};

type PropTypes = {
  url: string,
  post?: ?Post
};

export default function PostForm(props: PropTypes) {
  const [user] = React.useContext(UserContext);
  const { post } = props;
  const [{ error, ...form }, dispatch] = React.useReducer(reducer, {
    title: "",
    body: "",
    error: ""
  });

  React.useEffect(() => {
    if (post) {
      dispatch(setTitle(post.title));
      dispatch(setBody(post.body));
    }
  }, [post]);
  const onSubmit = ev => {
    ev.preventDefault();
    postData(props.url, form)
      .then(() => history.push("/"))
      .catch(ex => dispatch(setError(ex.error)));
  };

  return (
    <>
      {user ? null : <Redirect to="/login" />}
      {error ? <div className="flash">{error}</div> : null}
      <form method="post" onSubmit={onSubmit}>
        <label htmlFor="title">
          Title
          <input
            onChange={ev => dispatch(setTitle(ev.target.value))}
            name="title"
            id="title"
            value={form.title}
            required
          />
        </label>
        <label htmlFor="body">
          Body
          <textarea
            onChange={ev => dispatch(setBody(ev.target.value))}
            name="body"
            id="body"
            value={form.body}
          />
        </label>
        <input type="submit" value="Save" />
      </form>
    </>
  );
}

PostForm.defaultProps = {
  post: null
};
