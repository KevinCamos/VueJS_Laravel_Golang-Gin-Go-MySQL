<template>
  <div class="container">
    <router-link class="btn btn-danger m-2 mt-5" to="/workers/add"
      >Crea un trabajador</router-link
    >

    <table class="table table-hover table-striped table-bordered m-2">
      <!-- Tabla con borde, hover y con alternancia de color -->
      <caption class="text-center">
        <!-- Texto centrado -->
        Trabajadores
      </caption>
      <thead class="thead-dark">
        <!-- cabecera invertida colores -->
        <tr>
          <th>Nombre</th>
          <th>Puesto</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <WorkerItem
          v-for="workeritem in state.workerlist"
          :key="workeritem.id"
          :workeritem="workeritem"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import Constant from "../../Constant";
import WorkerItem from "../../components/WorkerItem.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";

export default {
  components: { WorkerItem },
  setup() {
    const store = useStore();

    const state = reactive({
      workerlist: computed(() => store.getters["worker/getWorkers"]),
    });
    console.log(state.workerlist);

    if (!state.workerlist) {
      console.log("carga treballadors");
      store.dispatch("worker/" + Constant.INITIALIZE_WORKERITEM);
    }

    return { state };
  },
};
</script>

<style></style>
