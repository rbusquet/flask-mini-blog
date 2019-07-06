// @flow
import * as React from "react";
import { Redirect } from "react-router";
import { UserContext } from "common/context";

type PropTypes = {
  children: React.ChildrenArray<any>
};

export default ({ children }: PropTypes) => {
  const [user] = React.useContext(UserContext);
  if (user) {
    return children;
  }
  return <Redirect to="/login" />;
};
