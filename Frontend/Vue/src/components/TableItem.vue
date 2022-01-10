<template>
  <li
    v-bind:class="[
      tableitem.status === 'disable'
        ? 'm-2 list-group-item bg-secondary text-white'
        : tableitem.status === 'busy'
        ? 'm-2 list-group-item bg-warning '
        : 'm-2 list-group-item bg-success  text-white',
    ]"
  >
    <span class="m-1 btn btn-primary rounded-circle">
      {{ tableitem.id_table }}
    </span>
    <span class="m-5"> {{ tableitem.status }} </span>
    <button
      type="button"
      v-bind:class="[
        tableitem.status === 'disable'
          ? 'm-1 btn btn-dark'
          : 'm-1 btn btn-secondary',
      ]"
      @click.stop="deleteTable(tableitem.id_table)"
    >
      Delete
    </button>
    <button
      type="button"
      v-bind:class="[
        tableitem.status === 'disable'
          ? 'm-1 btn btn-dark'
          : 'm-1 btn btn-danger',
      ]"
      @click.stop="updateStatus(tableitem.id_table, tableitem.status)"
    >
      Change status
    </button>

    <button
      v-if="tableitem.status === 'active'"
      type="button"
      class="ml-1 btn btn-warning"
      @click.stop="initTable(tableitem.id_table)"
    >
      Ocupar Mesa
    </button>
      <button  v-if="tableitem.status === 'busy'"
        class="m-1 btn btn-primary"
        @click.stop="updateTable(tableitem.order.id_order)"
      >
        Gestionar Mesa
      </button>
      <button  v-if="tableitem.status === 'busy'"
        class="m-1 btn btn-success"
        @click.stop="cancelTable(tableitem.order.id_order, tableitem.id_table)"
      >
        Cancelar Mesa
      </button>
      <button  v-if="tableitem.status === 'busy'" @click="this.$emit('showModal')"  class="m-1 btn btn-success">
        Ver y finalizar
      </button>

  </li>
</template>

<script>
import Constant from "../Constant";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: {
    tableitem: Object,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      tableitemlocal: {
        id_order: null,
        status: "disable",
      },
    });

    const deleteTable = (id) => {
      store.dispatch("table/" + Constant.DELETE_TABLE, { id });
    };

    const updateStatus = (id, status) => {
      if (status != "busy") {
        state.tableitemlocal.status =
          status === "disable" ? "active" : "disable";

        store.dispatch("table/" + Constant.UPDATE_TABLE, {
          tableitem: state.tableitemlocal,
          id,
        });
      } else {
        alert("SORPRESA!!!! No pots modificar una taula ocupada!!!! ");
      }
    };
    const initTable = (id) => {
      router.push({ name: "order", params: { id } });
    };
    const updateTable = (id) => {
      router.push({ name: "updateTable", params: { id } });
    };
    const cancelTable = (id, id_table) => {
      console.log(id);
      alert("crear función");
      store.dispatch("table/" + Constant.CANCEL_ORDER_TABLE, {
        id_order: id,
        id_table: id_table,
      });

      // store.dispatch("table/" + Constant.DELETE_TABLE, { id });
    };
    return {
      state,
      deleteTable,
      updateStatus,
      initTable,
      updateTable,
      cancelTable,
    };
  },
};
</script>

<style>
.circle {
  background-color: darkseagreen;
}
</style>
