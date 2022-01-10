import useVuelidate from "@vuelidate/core";
import { reactive, computed, watch } from "vue";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
// import { useCssVars } from "vue-demi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default function useLogin() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      form: {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      },
      adminmode: false,
    });

    /**
     * La función watch sirve para que cuando haya un valor con éxito en el store, se redirija a "ver pedidos"
     */
    watch(
      () => store.getters["user/getUser"],
      function () {
        router.push({ name: "orderList" });
      }
    );
   

    const rules = computed(() => {
      return {
        form: {
          name: {
            required,
            min: minLength(4),
          },
          email: {
            required,
            email,
          },
          password: {
            required,
            min: minLength(4),
          },
          repeatPassword: {
            sameAsPassword: sameAs(state.form.password),
          },
        },
      };
    });
    const click = () => {
      console.log(state.adminmode);
    };
    const v$ = useVuelidate(rules, state);

  return {  store, state , click, v$ };
}
