import Api from '@/services/Api'
import secret from '../secret.js'

export default {
  getAllProducts() {
    return Api(`${secret.LARAVEL_APP_URL}`).get(`products/`)
  },
  getProductById(id) {
    return Api(`${secret.LARAVEL_APP_URL}`).get(`products/${id}`)
  },
  createProduct(data) {
    console.log(data);
    return Api(`${secret.LARAVEL_APP_URL}`).post('products/', data)
  },
  updateProduct(data, id) {
    return Api(`${secret.LARAVEL_APP_URL}`).put(`products/${id}`, data)
  },
  deleteProductById(id) {
    return Api(`${secret.LARAVEL_APP_URL}`).delete(`products/${id}`)
  }
}