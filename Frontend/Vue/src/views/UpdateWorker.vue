<template>
  <div class="container">
    <div class="row">
      <div class="col p-3">
        <h2>Dar de alta a Trabajador</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="state.workeritemlocal.name"
          />
        </div>
        <div class="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="state.workeritemlocal.email"
          />
        </div>
        <div class="form-group">
          <label htmlFor="phone">Phone :</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="state.workeritemlocal.phone"
          />
        </div>
        <div class="form-group">
          <label htmlFor="address">Adress :</label>
          <input
            type="text"
            class="form-control"
            id="address"
            v-model="state.workeritemlocal.address"
          />
        </div>
        <div class="form-group">
          <label htmlFor="date_active">Dia de alta :</label>
          <input
            type="date"
            class="form-control"
            id="date_active"
            v-model="state.workeritemlocal.date_active"
          />
        </div>
        <div class="form-group">
          <label htmlFor="appointment">Puesto de trabajo :</label>
          <select
            id="appointment"
            name="appointment"
            v-model="state.workeritemlocal.appointment"
            class="form-select"
            aria-label="Default select example"
          >
            <option disabled value="" selected>Define el puesto</option>
            <option value="auxiliar">Auxiliar</option>
            <option value="encargado">Encargado</option>
          </select>
          <div>
            Puesto: <b>{{ state.workeritemlocal.appointment }}</b>
          </div>
        </div>
        <div class="form-group">
          <button
            type="button"
            class="btn btn-primary m-1"
            @click="updateWorker"
          >
            Update
          </button>
          <button type="button" class="btn btn-primary m-1" @click="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constant from "../Constant";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentRoute = useRoute();
    console.log(store.state.worker.workerlist[0].id);
    console.log(currentRoute.params.id);
    const workeritem = store.state.worker.workerlist.find(
      (item) => item.id.toString() === currentRoute.params.id
    );
    console.log(workeritem);
    const state = reactive({
      workeritemlocal: { ...workeritem },
    });
    const updateWorker = () => {
      router.push({ name: "workerList" });
      store.dispatch("worker/" + Constant.UPDATE_WORKER, {
        workeritem: state.workeritemlocal,
      });
    };

    const cancel = () => {
      router.push({ name: "workerList" });
    };

    return { state, updateWorker, cancel };
  },
};
</script>

<style></style>
