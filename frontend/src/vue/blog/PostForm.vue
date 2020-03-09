<template>
  <section key="section" class="content">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <div v-if="error" class="error" />
    <form @submit.prevent="createPost">
      <ink-field label="Title" id="title">
        <ink-control id="title">
          <input id="title" v-model="form.title" />
        </ink-control>
      </ink-field>
      <label>
        Body
        <textarea v-model="form.body" />
      </label>
      <button type="submit">{{ title }} post</button>
    </form>
    <input v-if="canDelete" class="danger" type="submit" value="Delete" @click.prevent="deletePost" />
  </section>
</template>

<script>
import Control from "../../../ink/Control.vue";
import Field from "../../../ink/Field.vue";
import { postData } from "../common/helpers";

export default {
  components: {
    InkControl: Control,
    InkField: Field
  },
  props: ["title", "form", "url", "delete"],
  data: () => ({
    error: ""
  }),
  computed: {
    canDelete() {
      return Boolean(this.delete);
    }
  },
  methods: {
    deletePost() {
      this.delete();
    },
    async createPost() {
      try {
        await postData(this.url, this.form);
      } catch (e) {
        this.error = e.error;
      }
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
