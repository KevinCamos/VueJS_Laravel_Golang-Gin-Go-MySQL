import Api from '@/services/Api'
import secret from '../secret.js'

export default {
    getAllOrders() {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`order/`)
    },
    // getOrderById(id) {
    //     return Api(`${secret.LARAVEL_APP_URL}`).get(`order/${id}`)
    // },
    createOrder(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('order/', data)
    },
    updateOrder(data, id) {
        return Api(`${secret.LARAVEL_APP_URL}`).put(`order/${id}`, data)
    },
    deleteOrderById(id) {
        return Api(`${secret.LARAVEL_APP_URL}`).delete(`order/${id}`)
    }
}