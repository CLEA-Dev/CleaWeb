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
    meta: { hideNavigation: true }, //l'etiquette
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  // 1. On vérifie si la route demande une authentification
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 2. On vérifie si on a un token stocké (on simulera avec false pour tester)
  const isAuthenticated = localStorage.getItem("token");

  if (requiresAuth && !isAuthenticated) {
    // Si la page est privée et qu'on n'est pas connecté, on redirige vers le login
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    // Si on est déjà connecté et qu'on essaie d'aller sur login, on renvoie au dashboard
    next("/");
  } else {
    // Sinon, on laisse passer !
    next();
  }
});

export default router;
