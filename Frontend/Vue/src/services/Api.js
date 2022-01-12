import axios from 'axios'
import { useRouter } from "vue-router";
import { useStore } from "vuex";


export default (URL) => {
  const router = useRouter();
  const store = useStore();

  const axiosInstance = axios.create({
/*     baseURL: `${secret.LARAVEL_APP_URL}` */
    baseURL: URL
  })

   const token = localStorage.getItem('token')
  if (token) {
    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  } 

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error)
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        store.dispatch("user/" + Constant.USER_REMOVE, {
          succes: true,
        });
        router.push({ name: "signin" });
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
