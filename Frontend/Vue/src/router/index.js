import { createRouter, createWebHistory } from "vue-router";
import AddWorker from "../views/AddWorker";
import UpdateWorker from "../views/UpdateWorker";
import AddProduct from "../views/AddProduct";
import UpdateProduct from "../views/UpdateProduct";
import WorkerList from "../views/WorkerList";
import ProductsList from "../views/ProductsList";
import Home from "../views/Home";
import About from "../views/About";
import NotFound from "../views/NotFound";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import AuthGuards from "../services/guards/AuthGuards";


const routes = [
  { path: "", redirect: { name: "home" }, },
  { path: "/home", name: "home", component: Home  },
  { path: "/about", name: "about", component: About },
  { path: "/workers", name: "workerList", component: WorkerList, beforeEnter: AuthGuards.authGuardAdmin  },
  { path: "/workers/add", name: "addWorker", component: AddWorker, beforeEnter: AuthGuards.authGuardAdmin  },
  {
    path: "/workers/update/:id",
    name: "updateWorker",
    component: UpdateWorker, beforeEnter: AuthGuards.authGuardAdmin 
  },
  { path: "/products", name: "productsList", component: ProductsList, beforeEnter: AuthGuards.authGuardWorker  },
  { path: "/products/add", name: "addProduct", component: AddProduct, beforeEnter: AuthGuards.authGuardWorker  },
  {
    path: "/products/update/:id",
    name: "updateProduct",
    component: UpdateProduct, beforeEnter: AuthGuards.authGuardWorker 
  },
  { path: "/signin", name: "signin", component: SignIn  },
  { path: "/signup", name: "signup", component: SignUp  },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
