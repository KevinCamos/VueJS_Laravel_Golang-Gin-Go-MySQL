import Constant from "../Constant";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default function useAddWorkers() {
  const store = useStore();
  const router = useRouter();
  // var showPassword = reactive(true);
  const currentRoute = useRoute();

  const workeritem = store.state.worker.workerlist.find(
    (item) => item.id === currentRoute.params.id
  );

  const updateWorker = () => {
    router.push({ name: "workerList" });
    store.dispatch("worker/" + Constant.UPDATE_WORKER, {
      workeritem: state.workeritemlocal,
    });
  };

  

  const state = reactive({
    workeritemlocal: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      appointment: "",
    },
    workeritemlocal: { ...workeritem },

    showPassword: true,
  });
  const togglePassword = (toggle) => {
    console.log(toggle);
    state.showPassword = !toggle;
  };
  const addWorker = () => {
    /* Aquí van las validaciones  */
    if (state.workeritemlocal.name.trim().length >= 2) {
      store.dispatch("worker/" + Constant.ADD_WORKER, {
        workeritem: state.workeritemlocal,
      });
      router.push({ name: "workerList" });
    } else {
      alert("Please enter a to-do in at least 2 characters");
    }
  };
  const cancel = () => {
    router.push({ name: "workerList" });
  };

  return {  state, togglePassword, addWorker, cancel , updateWorker };
}
