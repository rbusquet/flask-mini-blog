<template>
  <post-form
    :form="form"
    title="Edit"
    url="/blog/post/create"
    :delete="deletePost"
  />
</template>

<script>
import { mapState } from "vuex";
import PostForm from "./PostForm.vue";
import { getData, postData } from "../common/helpers";

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
  computed: {
    ...mapState(["user"]),
    url() {
      return `/blog/post/${this.$route.params.id}/update`;
    }
  },
  async mounted() {
    const post = await getData(`/blog/post/${this.$route.params.id}`);
    this.form = post;
  },
  methods: {
    deletePost() {
      // eslint-disable-next-line no-alert
      const confirm = window.confirm("Are you sure?");
      if (confirm) {
        postData(`/blog/post/${this.$route.params.id}/delete`).then(() =>
          this.$router.push("/")
        );
      }
    }
  }
};
</script>
