// @flow
import * as React from "react";
import { Redirect } from "react-router";
import { UserContext } from "./context";

type PropTypes = {
  to?: string
};

const WithUserRedirect = ({ to }: PropTypes) => {
  const [user] = React.useContext(UserContext);
  if (user) {
    return <Redirect to={to} />;
  }
  return null;
};

WithUserRedirect.defaultProps = { to: "/" };

export default WithUserRedirect;
