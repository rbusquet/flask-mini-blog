import React from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../common/context";
import { getData } from "../common/helpers";

export default function HeaderButtons(): JSX.Element {
  const [user, setUser] = React.useContext(UserContext);
  async function logout() {
    await getData("/auth/logout");
    setUser(null);
  }

  if (user) {
    return (
      <ul>
        <li>
          <NavLink to="/" onClick={logout}>
            Log Out
          </NavLink>
        </li>
      </ul>
    );
  }
  return (
    <ul>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
    </ul>
  );
}
