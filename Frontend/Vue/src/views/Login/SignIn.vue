<template>
  <section class="h- mt-5">
    <div class="container h-100 mt-5">
      <div class="row justify-content-sm-center h- mt-5">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
          <div class="card shadow-lg">
            <SignForm type="Sign In" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SignForm from "@/components/SignForm.vue";
// import { reactive, computed } from "vue";
// import { useStore } from "vuex";

export default {
  components: { SignForm },
  setup() {
    // const store = useStore();

    // const state = reactive({
    //   user: computed(() => store.getters["user/getUser"]),

      
    // });

    
    // console.log(state.user);

    // if (state.user){
    //     console.log("eh")
    // }
    return {};
  },
};
</script>

<style></style>
