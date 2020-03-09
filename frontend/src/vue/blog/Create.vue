<template>
  <post-form :form="form" title="Create" url="/blog/post/create" />
</template>

<script>
import { mapState } from "vuex";
import PostForm from "./PostForm.vue";

export default {
  components: {
    PostForm
  },
  data: () => ({
    error: "",
    form: {
      title: "",
      body: ""
    }
  }),
  computed: mapState(["user"])
};
</script>
