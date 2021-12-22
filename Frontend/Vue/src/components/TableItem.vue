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
    <span class="m-2"> {{ tableitem.id_table }} </span>
    <span class="m-2"> {{ tableitem.status }} </span>
    <button
      type="button"
      v-bind:class="[
        tableitem.status === 'disable'
          ? 'm-1 btn btn-dark'
          : 'm-1 btn btn-danger',
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
      @click.stop="updateTable(tableitem.id_table, tableitem.status)"
    >
      Change status
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

    const updateTable = (id, status) => {
      if (status != "busy") {
        state.tableitemlocal.status =
          status === "disable" ? "active" : "disable";

        store.dispatch("table/" + Constant.UPDATE_TABLE, {
          tableitem: state.tableitemlocal,
          id,
        });
      } else {
        alert("SORPRESA!!!!", "No pots modificar una taula ocupada!!!! ");
      }
    };

    return { state, deleteTable, updateTable };
  },
};
</script>

<style></style>
