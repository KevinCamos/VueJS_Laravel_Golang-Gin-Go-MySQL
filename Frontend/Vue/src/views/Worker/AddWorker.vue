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
          <label htmlFor="password">Password :</label>
          <input
            v-if="state.showPassword == true"
            type="password"
            class="form-control"
            id="password"
            v-model="state.workeritemlocal.password"
          />
          <input
            v-else
            type="text"
            class="form-control"
            id="password"
            v-model="state.workeritemlocal.password"
          />

          <button
            v-if="state.showPassword == true"
            class="btn btn-outline-success m-1"
            @click="togglePassword(state.showPassword)"
          >
            Ver contraseña
          </button>
          <button
            v-else
            class="btn btn-outline-danger m-1"
            @click="togglePassword(state.showPassword)"
          >
            Ocultar contraseña
          </button>
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
            <option value="gerente">Gerente</option>
          </select>
          <div>
            Puesto: <b>{{ state.workeritemlocal.appointment }}</b>
          </div>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-danger m-1" @click="addWorker">
            Añadir trabajador
          </button>
          <button type="button" class="btn btn-danger m-1" @click="cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useAddWorkers from "../../composables/addWorkers";

export default {
  setup() {
    const { state, togglePassword, addWorker, cancel } = useAddWorkers();

    // togglePassword(toggle);

    return { state, addWorker, cancel, togglePassword /* validators */ };
  },
};
</script>

<style></style>
