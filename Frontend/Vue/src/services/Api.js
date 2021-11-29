import axios from 'axios'


export default (URL) => {
  console.log(URL);
  const axiosInstance = axios.create({
/*     baseURL: `${secret.LARAVEL_APP_URL}` */
    baseURL: URL
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
