<template>
  <div class="container">
    <Make-Order></Make-Order>

    <table class="table table-hover table-striped table-bordered m-2">
      <caption class="text-center">
        Pedidos
      </caption>
      <thead class="thead-dark">
        <tr>
          <th>ID Pedido</th>
          <th>Editar</th>
          <th>Eliminar</th>
          <th>Ver y Finalizar</th>
        </tr>
      </thead>
      <tbody>
        <OrderItem
          v-for="orderitem in state.orderlist"
          v-show="orderitem.id_worker == state.user.id || state.user.appointment == 'gerente'"
          :key="orderitem"
          :orderitem="orderitem"
          :productslist="state.productslist"
          @showModal="showModal(orderitem)"
        />
      </tbody>
    </table>
    <!-- <button type="button" class="btn" @click="showModal">Open Modal!</button> -->
    <Modal v-if="state.order && state.productslist"
  
      v-show="state.isModalVisible"
      @close="closeModal"
      :order="state.order"
      :productslist="state.productslist"
    />
  
  </div>
</template>
<script>
import Constant from "../../Constant";
import OrderItem from "../../components/OrderItem.vue";
import MakeOrder from "../../components/buttons/MakeOrder.vue";
import Modal from "../../components/Modal.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

// import { useRouter } from "vue-router";

export default {
  components: { OrderItem, MakeOrder, Modal },
  setup() {
    const store = useStore();
    const state = reactive({
      orderlist: computed(() => store.getters["order/getOrder"]),
      productslist: computed(() => store.getters["products/getProducts"]),
      isModalVisible: false,
      order: "",
      user: JSON.parse(localStorage.getItem("user"))
    });

    if (!state.productslist) {
      store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
    }
    // console.log(state.orderlist);
    store.dispatch("order/" + Constant.INITIALIZE_ORDER);

    const showModal = (order) => {
      //  console.log(order)
       console.log(order)

      state.order = order.order_list;

      // console.log(state.productslist)
      // console.log(state.order)
      state.isModalVisible = true;
    };
    const closeModal = () => {
      state.isModalVisible = false;
    };

    return { state, closeModal, showModal };
  },
};
</script>

<style></style>
components: {
