import axios from 'axios'
import { useRouter } from "vue-router";


export default (URL) => {
  const router = useRouter();

  const axiosInstance = axios.create({
/*     baseURL: `${secret.LARAVEL_APP_URL}` */
    baseURL: URL
  })

   const token = localStorage.getItem('token')
  if (token) {
    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
    axiosInstance.defaults.headers.common.Authorization = `TOKEN ${token}`
  } 

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // location.reload()
        router.push({ name: "home" });
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
