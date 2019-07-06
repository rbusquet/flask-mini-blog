// @flow
import * as React from "react";
import Form from "common/UserForm";
import WithUserRedirect from "common/WithUserRedirect";
import Title from "../common/Title";

const Register = () => (
  <>
    <Title title="Register" />
    <header>
      <h1>Register</h1>
    </header>
    <WithUserRedirect />
    <Form url="/auth/register" buttonTxt="Register" />
  </>
);

export default Register;
