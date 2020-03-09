<template>
  <auth-form buttonTxt="Login" url="/auth/login" isLogin></auth-form>
</template>

<script>
import AuthForm from "./Form";

export default {
  components: {
    AuthForm
  }
};
</script>
