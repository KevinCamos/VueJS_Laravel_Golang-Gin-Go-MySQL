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
          <button type="button" class="btn btn-primary m-1" @click="addWorker">
            Añadir trabajador
          </button>
          <button type="button" class="btn btn-primary m-1" @click="cancel">
            Cancelar
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
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    /* 
 "name": "Alex",
"email": "Alex@gmail.com",
"phone": "845774411",
"address": "C/ L'estació, 21"
"date_active": "12-06-2020",
"appointment": "auxiliar"
 */
    const state = reactive({
      workeritemlocal: {
        name: "",
        email: "",
        phone: "",
        address: "",
        date_active: "",
        appointment: "",
      },
    });

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

    return { state, addWorker, cancel };
  },
};
</script>

<style></style>
