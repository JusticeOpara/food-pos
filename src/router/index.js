import DashboardView from "@/view/DashboardView.vue";
import NotFoundView from "@/view/NotFoundView.vue";
import SettingView from "@/view/SettingView.vue";
import HomeView from "@/view/HomeView.vue"
import NotificationsView from "@/view/NotificationsView.vue"
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/settings",
      name: "setting",
      component: SettingView,
    },
     {
      path: "/notifications",
      name: "notifications",
      component: NotificationsView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});
export default router;
