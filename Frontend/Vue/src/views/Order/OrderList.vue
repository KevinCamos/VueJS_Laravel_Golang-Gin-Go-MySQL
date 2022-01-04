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
        </tr>
      </thead>
      <tbody>
        <OrderItem
          v-for="orderitem in state.orderlist"
          :key="orderitem"
          :orderitem="orderitem"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import Constant from "../../Constant";
import OrderItem from "../../components/OrderItem.vue";
import MakeOrder from "../../components/buttons/MakeOrder.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";

export default {
  components: { OrderItem, MakeOrder },
  setup() {
    const store = useStore();
    const state = reactive({
      orderlist: computed(() => store.getters["order/getOrder"]),
    });
    console.log(state.orderlist);
    store.dispatch("order/" + Constant.INITIALIZE_ORDER);

    return { state };
  },
};
</script>

<style></style>
