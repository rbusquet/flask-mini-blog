// @flow
import * as React from "react";
import Form from "common/UserForm";
import WithUserRedirect from "common/WithUserRedirect";
import Title from "../common/Title";

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
