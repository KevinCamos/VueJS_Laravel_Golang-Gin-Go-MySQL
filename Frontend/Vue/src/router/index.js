import { createRouter, createWebHistory } from "vue-router";
import AuthGuards from "../services/guards/AuthGuards";

const routes = [
  { path: "", redirect: { name: "home" }, },
  { path: "/home", name: "home", component: () => import('../views/Home') },
  { path: "/about", name: "about", component: () => import('../views/About') },
  
  { path: "/workers", name: "workerList", component: () => import('../views/Worker/WorkerList'), beforeEnter: AuthGuards.authGuardAdmin  },
  { path: "/workers/add", name: "addWorker", component: () => import('../views/Worker/AddWorker'), beforeEnter: AuthGuards.authGuardAdmin  },
  {
    path: "/workers/update/:id",
    name: "updateWorker",
    component: () => import('../views/Worker/UpdateWorker'), beforeEnter: AuthGuards.authGuardAdmin 
  },

  { path: "/products", name: "productsList", component: () => import('../views/Product/ProductsList'), beforeEnter: AuthGuards.authGuardWorker  },
  { path: "/products/add", name: "addProduct", component: () => import('../views/Product/AddProduct'), beforeEnter: AuthGuards.authGuardWorker  },
  {
    path: "/products/Product/update/:id",
    name: "updateProduct",
    component: () => import('../views/Product/UpdateProduct'), beforeEnter: AuthGuards.authGuardWorker 
  },
  {
    path: "/products/:id",
    name: "viewProduct",
    component: () => import('../views/Product/ViewProduct'), beforeEnter: AuthGuards.authGuardWorker 
  },

  { path: "/categories", name: "CategoriesList", component: () => import('../views/Categories/CategoriesList'), beforeEnter: AuthGuards.authGuardWorker  },
  { path: "/categories/add", name: "addCategory", component: () => import('../views/Categories/AddCategory'), beforeEnter: AuthGuards.authGuardWorker  },
  {
    path: "/categories/Categories/update/:id",
    name: "updateCategory",
    component: () => import('../views/Categories/UpdateCategory'), beforeEnter: AuthGuards.authGuardWorker 
  },
  {
    path: "/categories/:id",
    name: "viewCategory",
    component: () => import('../views/Categories/ViewCategory'), beforeEnter: AuthGuards.authGuardWorker 
  },

  { path: "/:id/order", name: "order", component: () => import('../views/Order/Order') , beforeEnter: AuthGuards.authGuardWorker},
  { path: "/orders", name: "orderList", component: () => import('../views/Order/OrderList.vue') , beforeEnter: AuthGuards.authGuardWorker},
  { path: "/updateOrder/:id", name: "updateOrder", component: () => import('../views/Order/Order.vue') , beforeEnter: AuthGuards.authGuardWorker},
  
  { path: "/signin", name: "signin", component: () => import('../views/Login/SignIn') },
  { path: "/signup", name: "signup", component: () => import('../views/Login/SignUp') },
  { path: "/:catchAll(.*)", component: () => import('../views/NotFound') },

  { path: "/table", name: "tableList", component: () => import('../views/Table/TableList') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;