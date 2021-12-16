import { createRouter, createWebHistory } from "vue-router";
import AuthGuards from "../services/guards/AuthGuards";

const routes = [
  { path: "", redirect: { name: "home" }, },
  { path: "/home", name: "home", component: () => import('../views/Home') },
  { path: "/about", name: "about", component: () => import('../views/About') },
  { path: "/workers", name: "workerList", component: () => import('../views/WorkerList'), beforeEnter: AuthGuards.authGuardAdmin  },
  { path: "/workers/add", name: "addWorker", component: () => import('../views/AddWorker'), beforeEnter: AuthGuards.authGuardAdmin  },
  {
    path: "/workers/update/:id",
    name: "updateWorker",
    component: () => import('../views/UpdateWorker'), beforeEnter: AuthGuards.authGuardAdmin 
  },
  { path: "/products", name: "productsList", component: () => import('../views/ProductsList'), beforeEnter: AuthGuards.authGuardWorker  },
  { path: "/products/add", name: "addProduct", component: () => import('../views/AddProduct'), beforeEnter: AuthGuards.authGuardWorker  },
  {
    path: "/products/update/:id",
    name: "updateProduct",
    component: () => import('../views/UpdateProduct'), beforeEnter: AuthGuards.authGuardWorker 
  },

  { path: "/signin", name: "signin", component: () => import('../views/SignIn') },
  { path: "/signup", name: "signup", component: () => import('../views/SignUp') },
  { path: "/:catchAll(.*)", component: () => import('../views/NotFound') },

  { path: "/table", name: "tableList", component: () => import('../views/TableList') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;