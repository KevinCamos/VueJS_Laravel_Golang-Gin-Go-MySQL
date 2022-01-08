<template>
  <tr :id="orderitem.id_order">
    <td>
      {{ orderitem.id_order }}
    </td>
    <td @click.stop="editOrder(orderitem.id_order)" class="edit">Editar</td>
    <td @click.stop="deleteOrder(orderitem.id_order)" class="delete">
      Eliminar
    </td>
    <td @click="this.$emit('showModal')" class="read">Ver y finalizar</td>
  </tr>
</template>

<script>
import Constant from "../Constant";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  emits: ["showModal"],

  props: {
    orderitem: Object,
    productslist: Object,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const deleteOrder = (id) => {
      console.log("delete");

      console.log(id);

      store.dispatch("order/" + Constant.CANCEL_ORDER, { id });
    };
    const editOrder = (id) => {
      console.log("eh");
      router.push({ name: "updateOrder", params: { id } });
    };

    return { deleteOrder, editOrder };
  },
};
</script>

<style>
tr:hover {
  cursor: pointer;
}
.edit:hover {
  background-color: yellow;
}
.delete:hover {
  background-color: #ff8080;
}
.read:hover {
  background-color: rgb(144, 238, 144);
}
</style>
