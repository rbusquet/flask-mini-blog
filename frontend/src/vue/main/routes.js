import Register from "../auth/Register.vue";
import Login from "../auth/Login.vue";
import Posts from "../blog/Posts.vue";
import Create from "../blog/Create.vue";
import Edit from "../blog/Edit.vue";

const createRoute = (path, component) => ({
  path,
  component
});

export default [
  createRoute("/register", Register),
  createRoute("/login", Login),
  createRoute("/create", Create),
  createRoute("/post/:id", Edit),
  createRoute("/", Posts)
];
