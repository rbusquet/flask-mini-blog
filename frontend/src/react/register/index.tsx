import React from "react";
import Form from "../common/UserForm";
import useTitle from "../common/useTitle";

function Register() {
  useTitle("Register");
  return (
    <>
      <header>
        <h1>Register</h1>
      </header>
      <Form url="/auth/register" buttonTxt="Register" />
    </>
  );
}

export default Register;
