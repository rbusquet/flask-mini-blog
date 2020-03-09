<template>
  <section key="section" class="content">
    <header>
      <h1>Posts</h1>
      <router-link v-if="user.id" to="/create" class="action">
        New
      </router-link>
    </header>
    <article v-for="post in posts" :key="post.id" class="post">
      <header>
        <div>
          <h1>{{ post.title }}</h1>
          <div class="about">by {{ post.username }} on {{ post.created }}</div>
        </div>
        <router-link
          v-if="user && Number(user.id) === Number(post.author_id)"
          :to="postUrl(post.id)"
          class="action"
        >
          Edit
        </router-link>
      </header>
      <p class="body">
        {{ post.body }}
      </p>
    </article>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { getData } from "../common/helpers";

export default {
  data: () => ({
    posts: []
  }),
  computed: mapState(["user"]),
  async mounted() {
    this.posts = await getData("/blog/posts");
  },
  methods: {
    postUrl(postID) {
      return `/post/${postID}`;
    }
  }
};
</script>
