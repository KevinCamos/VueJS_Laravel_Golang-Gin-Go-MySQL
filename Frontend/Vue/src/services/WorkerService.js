import Api from '@/services/Api'
import secret from '../secret.js'

export default {
  getAll() {
    return Api().get(`${secret.GO_APP_URL}users/`)
  },
  getById(id) {
    return Api().get(`${secret.GO_APP_URL}users/${id}`)
  },
  createUser(data) {
    return Api().post(`${secret.GO_APP_URL}users/`, data)
  },
  updateUser(data, id) {
    return Api().put(`${secret.GO_APP_URL}users/${id}`, data)
  },
  deleteById(id) {
    return Api().delete(`${secret.GO_APP_URL}users/${id}`)
  }
}
