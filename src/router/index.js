import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { hideNavigation: false, requiresAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/users.vue"),
    meta: { hideNavigation: false, requiresAuth: true },
  },
  {
    path: "/CoachValid",
    name: "CoachValidation",
    component: () => import("../views/CoachValid.vue"),
    meta: { hideNavigation: false, requiresAuth: true },
  },
  {
    path: "/ContentMgr",
    name: "ContetManagement",
    component: () => import("../views/ContentMgr.vue"),
    meta: { hideNavigation: false, requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue"),
    meta: { hideNavigation: true },
  },
  {
    path: "/profil",
    name: "profile",
    component: () => import("../views/profil.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // ✅ FIX: Récupère la clé 'access_token' OU 'token'
  const isAuthenticated =
    localStorage.getItem("access_token") || localStorage.getItem("token");

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
