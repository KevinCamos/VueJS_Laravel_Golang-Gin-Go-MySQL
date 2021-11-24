import { createRouter, createWebHistory } from "vue-router";
import AddWorker from '../views/AddWorker';
import UpdateWorker from '../views/UpdateWorker';
import WorkerList from '../views/WorkerList';
import Home from '../views/Home';
import About from '../views/About';
import NotFound from '../views/NotFound';

const routes = [
    { path:"", redirect:{ name:"home" } },
    { path:"/home", name:"home", component: Home },
    { path:"/about", name:"about", component: About },
    { path:"/workers", name:"workerList", component: WorkerList },
    { path:"/workers/add", name:"addWorker", component: AddWorker },
    { path:"/workers/update/:id", name:"updateWorker", component: UpdateWorker },
    { path:"/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;