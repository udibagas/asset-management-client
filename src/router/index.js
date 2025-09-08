import { api } from "@/lib/api";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../pages/Register.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log("Navigating to:", to.fullPath);
  if (to.fullPath === "/login" || to.fullPath === "/register") {
    return next();
  }

  try {
    const { data } = await api.get("/api/profile");
    localStorage.setItem("user", JSON.stringify(data));
    next();
  } catch (error) {
    next("/login");
  }
});

export default router;
