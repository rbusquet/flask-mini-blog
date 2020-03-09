<template>
  <section class="content">
    <app-title :title="buttonTxt" />
    <header>
      <h1>{{ buttonTxt }}</h1>
    </header>
    <form method="post" @submit.prevent="onSubmit">
      <div v-if="error" class="flash">{{ error }}</div>
      <label for="username">
        Username
        <input name="username" id="username" required v-model="form.username" />
      </label>

      <label for="password">
        Password
        <input id="password" type="password" name="password" required v-model="form.body" />
      </label>
      <button type="submit">{{ buttonTxt }}</button>
    </form>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import AppTitle from "../common/Title.vue";
import { postData } from "../common/helpers";

export default {
  components: {
    AppTitle
  },
  props: {
    buttonTxt: String,
    url: String,
    isLogin: Boolean
  },
  methods: {
    ...mapMutations(["setUser"]),
    onSubmit() {
      const post = async () => {
        try {
          const user = await postData(this.url, this.form);
          this.error = "";
          if (this.isLogin) {
            this.setUser(user);
          }
          this.$router.push("/");
        } catch (ex) {
          this.error = ex.error;
        }
      };
      post();
    },
    data: () => ({
      error: "",
      form: {
        username: "",
        password: ""
      }
    })
  }
};
</script>
