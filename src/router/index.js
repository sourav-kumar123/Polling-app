import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/LoginView.vue"),
  },
  {
    path: "/admin",
    name: "Edit",
    component: () =>
      import( "../views/EditView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import("../views/SignupView.vue"),
  },
  {
    path: "/pollList",
    name: "PollList",
    component: () =>
      import("../views/PollListView.vue"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  var decoded = localStorage.getItem("role_data");
  var data = JSON.parse(localStorage.getItem("loginStatus"));
  if (data && decoded) {
    if (
      (data.isLoggedIN && decoded === "admin" && to.path === "/login") ||
      to.path === "/signup" ||
      to.path === "/"
    ) {
      next("/admin");
    } else if (
      (data.isLoggedIN && decoded === "guest" && to.path === "/login") ||
      to.path === "/signup" ||
      to.path === "/"
    ) {
      next("/pollList");
    } else if (
      data.isLoggedIN &&
      decoded === "guest" &&
      to.path !== "/pollList"
    ) {
      next("/pollList");
      console.log();
    } else if (data.isLoggedIN && decoded === "admin" && to.path !== "/admin") {
      next("/admin");
    } else {
      next();
    }
  } else if (to.path !== "/" && to.path !== "/login" && to.path !== "/signup") {
    next("/login");
  } else {
    next();
  }
});

export default router;
