<template>
  <ul v-if="user.id">
    <li>
      <router-link to="/" @click.native="logout">Log out</router-link>
    </li>
  </ul>
  <ul v-else>
    <li>
      <router-link to="/register">Register</router-link>
    </li>
    <li>
      <router-link to="/login">Log In</router-link>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getData } from "./helpers";

export default {
  methods: {
    ...mapMutations(["clearUser"]),
    logout() {
      getData("/auth/logout");
      this.clearUser();
    }
  },
  computed: mapState(["user"])
};
</script>
