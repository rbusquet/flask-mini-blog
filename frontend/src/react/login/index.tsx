import React from "react";

import useTitle from "../common/useTitle";
import Form from "../common/UserForm";

function Login() {
  useTitle("Login");
  return (
    <>
      <header>
        <h1>Login</h1>
      </header>
      <Form url="/auth/login" buttonTxt="Login" setUser />
    </>
  );
}

export default Login;
