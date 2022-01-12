import { createRouter, createWebHistory } from "vue-router";
import AuthGuards from "../services/guards/AuthGuards";

const routes = [
  { path: "", redirect: { name: "home" }, },
  { path: "/home", name: "home", component: () => import('../views/Home') },
  { path: "/about", name: "about", component: () => import('../views/About') },
  { path: "/signin", name: "signin", component: () => import('../views/Login/SignIn') },
  { path: "/signup", name: "signup", component: () => import('../views/Login/SignUp') },
  { path: "/:catchAll(.*)", component: () => import('../views/NotFound') },

  { 
    path: "/dashboard", name: "dashboard", 
    component: () => import('../views/Dashboard'), 
    beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true } 
  },
  /* ------------------------ workers -------------------------- */
  { 
    path: "/workers", name: "workerList",
    component: () => import('../views/Worker/WorkerList'), 
    beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true }  
  },
  { 
    path: "/workers/add", name: "addWorker", 
    component: () => import('../views/Worker/AddWorker'), 
    beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true }  
  },
  {
    path: "/workers/update/:id", name: "updateWorker",
    component: () => import('../views/Worker/UpdateWorker'), 
    beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true }
  },
  /* ------------------------ products -------------------------- */
  { 
    path: "/products", name: "productsList", 
    component: () => import('../views/Product/ProductsList'), 
    beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true }  
  },
  { 
    path: "/products/add", name: "addProduct", 
    component: () => import('../views/Product/AddProduct'), 
    beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true }
  },
  {
    path: "/products/Product/update/:id", name: "updateProduct",
    component: () => import('../views/Product/UpdateProduct'), 
    beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true }
  },
  {
    path: "/products/:id", name: "viewProduct",
    component: () => import('../views/Product/ViewProduct'), 
    beforeEnter: AuthGuards.authGuardAdmin, meta: { requiresAuth: true }
  },
  /* ------------------------ categories -------------------------- */
  { 
    path: "/categories", name: "CategoriesList", 
    component: () => import('../views/Categories/CategoriesList'), 
    beforeEnter: AuthGuards.authGuardWorker, meta: { requiresAuth: true }
  },
  { 
    path: "/categories/add", name: "addCategory", 
    component: () => import('../views/Categories/AddCategory'), 
    beforeEnter: AuthGuards.authGuardWorker, meta: { requiresAuth: true }  
  },
  {
    path: "/categories/Categories/update/:id", name: "updateCategory", 
    component: () => import('../views/Categories/UpdateCategory'), 
    beforeEnter: AuthGuards.authGuardWorker, meta: { requiresAuth: true }
  },
  { 
    path: "/categories/:id", name: "viewCategory", 
    component: () => import('../views/Categories/ViewCategory'), 
    beforeEnter: AuthGuards.authGuardWorker, meta: { requiresAuth: true }
  },
  /* ------------------------ order -------------------------- */
  { 
    path: "/:id/order", name: "order", 
    component: () => import('../views/Order/Order') , 
    beforeEnter: AuthGuards.authGuardWorker, meta: { requiresAuth: true }
  },
  { 
    path: "/orders", name: "orderList", 
    component: () => import('../views/Order/OrderList.vue') , 
    beforeEnter: AuthGuards.authGuardWorker, meta: { requiresAuth: true }
  },
  { 
    path: "/updateOrder/:id", name: "updateOrder", 
    component: () => import('../views/Order/Order.vue') , 
    beforeEnter: AuthGuards.authGuardWorker, meta: { requiresAuth: true }
  },
  /* ------------------------ table -------------------------- */
  { 
    path: "/updateTable/:id", name: "updateTable", 
    component: () => import('../views/Order/Order.vue') , 
    beforeEnter: AuthGuards.authGuardWorker, meta: { requiresAuth: true }
  },
  { 
    path: "/table", name: "tableList", 
    component: () => import('../views/Table/TableList'), 
    beforeEnter: AuthGuards.authGuardWorker, meta: {  requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("beforeEach");
  if(to.matched.some(record => record.meta.requiresAuth)) {
    console.log("1");
    if (localStorage.getItem('token') != null && localStorage.token) {
      console.log("2");
      next()
      return
    }
    next('/signin') 
  } else {
    next() 
  }
})

export default router;