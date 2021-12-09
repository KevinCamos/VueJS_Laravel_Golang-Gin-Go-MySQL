import Api from '@/services/Api'
import secret from '../secret.js'

export default {
  loginGo(data) {
    return Api(`${secret.GO_APP_URL}`).post('users/login', data)
  }, 
  loginLaravel(data) {
    return Api(`${secret.LARAVEL_APP_URL}`).post('users/', data)
  },


  /* Todas la funciones con la ruta "user/" de GO necesita un Token */
  getAll() {
    return Api(`${secret.GO_APP_URL}`).get(`user/`)
  },
  getById(id) {
    return Api(`${secret.GO_APP_URL}`).get(`user/${id}`)
  },
  createUser(data) {
    return Api(`${secret.GO_APP_URL}`).post('user/', data)
  },
  updateUser(data, id) {
    return Api(`${secret.GO_APP_URL}`).put(`user/${id}`, data)
  },
  deleteById(id) {
    return Api(`${secret.GO_APP_URL}`).delete(`user/${id}`)
  }
}
