// @flow
import * as React from "react";

import Title from "../common/Title";
import WithUserRedirect from "../common/WithUserRedirect";
import Form from "../common/UserForm";

const Login = () => (
  <>
    <Title title="Login" />
    <header>
      <h1>Login</h1>
    </header>
    <WithUserRedirect />
    <Form url="/auth/login" buttonTxt="Login" setUser />
  </>
);

export default Login;
