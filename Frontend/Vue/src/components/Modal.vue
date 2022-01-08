<template>
  <!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Este es el pedido número {{ order[0].id_order }}
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="this.$emit('close')"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <table
              class="
                table table-hover table-striped table-bordered
                m-2
                text-center
              "
            >
              <caption class="text-center">
                Pedidos
              </caption>
              <thead class="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio/U</th>
                  <th>Total/U</th>

                  <th>Precio Total</th>
                </tr>
              </thead>
              <tbody>
                <Card-Product
                  v-for="productitem in productslist"
                  :key="productitem.id"
                  :productitem="productitem"
                  :order="order"
                  :isCard="false"
                  :isUpdate="false"
                ></Card-Product>
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="4">TOTAL PEDIDO</th>
                  <th>{{ totalPrice() }}€</th>
                </tr>
              </tfoot>
            </table>
          </slot>
        </section>

        <footer class="modal-footer">
          <!-- <slot name="footer"> This is the default footer! </slot> -->
          <div class="row">
            <button
              type="button"
              class="btn btn-danger col-6"
              @click="this.$emit('close')"
              aria-label="Close modal "
            >
              Retroceder
            </button>
            <button
              type="button"
              class="btn btn-success col-6"
              @click="[this.$emit('close'), endOrder(order[0].id_order)]"
              aria-label="Close modal and end oder"
            >
              Finalizar Pedido
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
/* https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component */
import CardProduct from "./CardProduct.vue";
import Constant from "../Constant";
import { useStore } from "vuex";

export default {
  components: { CardProduct },

  emits: ["close"],
  props: {
    order: Object,
    productslist: Object,
  },
  name: "Modal",

  setup(props) {
        const store = useStore();

    const totalPrice = () => {
      var totalPrice = 0;
       console.log(props.order)
      if (props.productslist != undefined) {
        for (let i = 0; i < props.order.length; i++) {
          for (let e = 0; e < props.productslist.length; e++) {
            if (props.order[i].id_product == props.productslist[e].id) {
              console.log(
                props.order[i].qty * props.productslist[e].price,
                props.order[i].qty,
                props.productslist[e].price
              );

              totalPrice += props.order[i].qty * props.productslist[e].price;
              // console.log(totalPrice);
            }
          }
        }
        return totalPrice;
      }
    };
    const endOrder = (id_order) => {
     
      console.log(id_order);
       store.dispatch("order/" + Constant.END_ORDER, {
        id_order: id_order,
      });
    };
    console.log(props.order);
    return { totalPrice, endOrder };
  },
};
</script>
<style>
/* https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component */
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  align-items: inherit;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
