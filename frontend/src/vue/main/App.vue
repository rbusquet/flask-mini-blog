<template>
  <div>
    <app-title title="Posts" />
    <nav>
      <h1>Flaskr</h1>
      <header-buttons />
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AppTitle from "../common/Title.vue";
import HeaderButtons from "../common/HeaderButtons";

export default {
  components: {
    AppTitle,
    HeaderButtons
  }
};
</script>
