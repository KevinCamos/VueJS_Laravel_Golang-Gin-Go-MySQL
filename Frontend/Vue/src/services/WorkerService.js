import Api from '@/services/Api'
import secret from '../secret.js'

export default {
  getAll() {
    return Api(`${secret.GO_APP_URL}`).get(`users/`)
  },
  getById(id) {
    return Api(`${secret.GO_APP_URL}`).get(`users/${id}`)
  },
  createUser(data) {
    return Api(`${secret.GO_APP_URL}`).post('users/', data)
  },
  updateUser(data, id) {
    return Api(`${secret.GO_APP_URL}`).put(`users/${id}`, data)
  },
  deleteById(id) {
    return Api(`${secret.GO_APP_URL}`).delete(`users/${id}`)
  }
}
