import React from "react";
import { Redirect } from "react-router";
import { UserContext } from "./context";

function withUserRedirect<Props>(Component: React.ComponentType<Props>, to = "") {
  function Wrapped(props: Props) {
    const [user] = React.useContext(UserContext);
    if (user) {
      return <Redirect to={to} />;
    }

    return <Component {...props} />;
  }
  Wrapped.displayName = Component.displayName;
  return Wrapped;
}

export default withUserRedirect;
