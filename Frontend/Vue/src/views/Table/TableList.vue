<template>
  <div style="mt-2">
    <div class="row">
      <div class="col p-3">
        <span class="btn btn-danger" @click.stop="addTable()">
          Crea un mesa
        </span>
      </div>
      <Make-Order></Make-Order>
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
                @showModal="showModal(tableitem.order.orderlist)"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <button type="button" class="btn" @click="showModal">Open Modal!</button>  -->
    <Modal
      v-if="state.order && state.productprueba"
      v-show="state.isModalVisible"
      @close="closeModal"
      :order="state.order"
      :productslist="state.productslist"
      :key="state.order.id_order"
    />
  </div>
</template>
<script>
import Constant from "../../Constant";
import TableItem from "../../components/TableItem.vue";
import MakeOrder from "../../components/buttons/MakeOrder.vue";
import Modal from "../../components/Modal";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: { TableItem, MakeOrder, Modal },

  setup() {
    const store = useStore();

    const state = reactive({
      tablelist: computed(() => store.getters["table/getTable"]),
      tableitemlocal: {
        id_order: null,
        status: "active",
      },
      orderlist: computed(() => store.getters["table/getOrder"]),
      productslist: computed(() => store.getters["products/getProducts"]),
      isModalVisible: false,
      order: false,
    });
    if (!state.productslist) {
      store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
    }
    store.dispatch("table/" + Constant.INITIALIZE_TABLE);

    const addTable = () => {
      store.dispatch("table/" + Constant.ADD_TABLE, {
        tableitem: state.tableitemlocal,
      });
    };

    const showModal = (order) => {
      console.log(order);
      state.order = order;

      // console.log(state.productslist)
      // console.log(state.order)
      state.isModalVisible = true;
    };
    const closeModal = () => {

      state.isModalVisible = false;
    };

    return { state, addTable, showModal, closeModal };
  },
};
</script>

<style></style>
