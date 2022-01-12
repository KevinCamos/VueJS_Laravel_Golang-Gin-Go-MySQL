import { createApp } from "vue";
import 'bootstrap/dist/css/bootstrap.css';
import VueLazyLoad from 'vue3-lazyload'
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(router).use(store).use(VueLazyLoad).mount("#app");

