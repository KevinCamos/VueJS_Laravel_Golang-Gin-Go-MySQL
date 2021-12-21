<template>
  <div style="mt-2">
    <div class="row">
      <div class="col p-3">
        <span class="btn btn-danger" @click.stop="addProduct()">
          Crea un mesa
        </span>
      </div>
      <div class="col p-3 ">
                  <router-link class="btn btn-danger ml-5"  to="/pedido/order">Hacer Pedido</router-link>

      </div>
    </div>
    <div class="card card-default card-borderless">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <ul class="list-group">
              <TableItem
                v-for="tableitem in state.tablelist"
                :key="tableitem.id_table"
                :tableitem="tableitem"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Constant from "../Constant";
import TableItem from "../components/TableItem.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: { TableItem },
  setup() {
    const store = useStore();

    const state = reactive({
      tablelist: computed(() => store.getters["table/getTable"]),
      tableitemlocal: {
        id_order: null,
        status: "active",
      },
    });
    store.dispatch("table/" + Constant.INITIALIZE_TABLE);

    const addProduct = () => {
      store.dispatch("table/" + Constant.ADD_TABLE, {
        tableitem: state.tableitemlocal,
      });
    };

    return { state, addProduct };
  },
};
</script>

<style></style>
