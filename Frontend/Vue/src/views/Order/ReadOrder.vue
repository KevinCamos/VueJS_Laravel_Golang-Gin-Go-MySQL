<template>
  <div class="container">
       <table class="table table-hover table-striped table-bordered m-2 text-center">
        <caption class="text-center">
          Pedidos
        </caption>
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio/U</th>
            <th>Rest</th>
            <th>Total/U</th>
            <th>Añad</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          <Card-Product
            v-for="productitem in state.productslist"
            :key="productitem.id"
            @increment-count="incrementOrder(productitem.id)"
            @decrement-count="decrementOrder(productitem.id)"
            :productitem="productitem"
            :order="order"
            :card="false"
          ></Card-Product>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="6" >TOTAL PEDIDO</th>
                    <th >{{ state.totalPrice }}€</th>
          </tr>
        </tfoot>
      </table>
  </div>
</template>
<script>
import Constant from "../../Constant";
import OrderItem from "../../components/OrderItem.vue";
import MakeOrder from "../../components/buttons/MakeOrder.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: { OrderItem, MakeOrder },
  setup() {
    const store = useStore();
    const state = reactive({
      orderlist: computed(() => store.getters["order/getOrder"]),
      productslist: computed(() => store.getters["products/getProducts"]),
    });
    // store.dispatch("order/" + Constant.INITIALIZE_ORDER);

    if (!state.orderlist) {
      store.dispatch("products/" + Constant.INITIALIZE_PRODUCTS);
    }
    return { state };
  },
};
</script>

<style></style>
