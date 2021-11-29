<template>
  <li :class="checked(workeritem.active)" @click="toggleDone(true)">
    <span
      :class="{ pointer: true, 'todo-done': workeritem.active }"
      :title="'Explanation : ' + workeritem.name" :id="workeritem.id"
    >
      {{ workeritem.name }}
      ({{ workeritem.appointment }})

      {{ workeritem.done ? " (done)" : "" }}
    </span>
    <div class="float-right">
      <span
        class="badge badge-secondary pointer ml-1"
        @click.stop="editWork(workeritem.id)"
        >Edit</span
      >
      <span
        class="badge badge-secondary pointer ml-1"
        @click.stop="deleteWork(workeritem.id)"
        >Delete</span
      >
    </div>
  </li>
</template>

<script>
import Constant from "../Constant";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: {
    workeritem: Object,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const checked = (active) => {
      console.log("checked");
      return { "list-group-item": true, "list-group-item-success": active };
    };
    const toggleDone = (id) => {
      console.log("toggle");

      store.dispatch(Constant.TOGGLE_DONE, { id });
    };
    const deleteWork = (id) => {
      console.log("delete");
  
      console.log(id);

      store.dispatch("worker/"+Constant.DELETE_WORKER, { id });
    };
    const editWork = (id) => {
      // store.dispatch("worker/"+Constant.UPDATE_WORKER, {
      //   workeritem: { ...props.workeritem },
      // });
      router.push({ name: "updateWorker", params: { id } });
    };

    return { toggleDone, deleteWork, editWork, checked };
  },
};
</script>

<style></style>
