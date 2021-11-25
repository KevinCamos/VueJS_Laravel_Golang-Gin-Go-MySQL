import Api from '@/services/Api'

export default {
  getAll() {
    return Api().get(`users/`)
  },
  getById(id) {
    return Api().get(`users/${id}`)
  },
  createUser(data) {
    return Api().post('users/', data)
  },
  updateUser(data, id) {
    return Api().put(`users/${id}`, data)
  },
  deleteById(id) {
    return Api().delete(`users/${id}`)
  }
}
