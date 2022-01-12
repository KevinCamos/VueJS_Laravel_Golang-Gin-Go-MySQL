import Api from '@/services/Api'
import secret from '../secret.js'

export default {
  getAllCategories() {
    return Api(`${secret.LARAVEL_APP_URL}`).get(`categories/`)
  },
  getCategoryById(id) {
    return Api(`${secret.LARAVEL_APP_URL}`).get(`categories/${id}`)
  },
  createCategory(data) {
    return Api(`${secret.LARAVEL_APP_URL}`).post('categories/', data)
  },
  updateCategory(data, id) {
    return Api(`${secret.LARAVEL_APP_URL}`).post(`categories/${id}?_method=PUT`, data)
  },
  changeStatusCategory(data, id) {
    return Api(`${secret.LARAVEL_APP_URL}`).put(`categories/changeStatus/${id}`, data)
  },
  deleteCategoryById(id) {
    return Api(`${secret.LARAVEL_APP_URL}`).delete(`categories/${id}`)
  }
}
