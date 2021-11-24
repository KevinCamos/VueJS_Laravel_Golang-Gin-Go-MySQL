import axios from 'axios'
import secret from '../secret.js'
export default () => {
  const axiosInstance = axios.create({
    baseURL: `${secret.GO_APP_URL}`
  })

/*   const token = localStorage.getItem('token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  } */

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        location.reload()
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
