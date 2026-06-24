import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },

  {
    path: "/users",
    name: "Users",
    component: () => import("../views/users.vue"),
  },

  {
    path: "/CoachValid",
    name: "CoachValidation",
    component: () => import("../views/CoachValid.vue"),
  },

  {
    path: "/ContentMgr",
    name: "ContetManagement",
    component: () => import("../views/ContentMgr.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
