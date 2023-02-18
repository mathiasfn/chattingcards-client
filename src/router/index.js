import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "category.index",
    path: "/",
    component: () => import("@/pages/CardCategories.vue"),
  },
  {
    name: "category.card.index",
    path: "/categories/:category/cards",
    props: true,
    component: () => import("@/pages/Cards.vue"),
  },
];

export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
