import VueRouter from "vue-router";

const routes = [
  {
    path: "/user/:id",
    name: "HomePage",
    component: () => import("@/components/HomePage.vue"),
    prop:{}
  },
  {
    path: "/",
    name: "LoginForm",
    component: () => import("@/components/LoginForm.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  routes
});

export default router
