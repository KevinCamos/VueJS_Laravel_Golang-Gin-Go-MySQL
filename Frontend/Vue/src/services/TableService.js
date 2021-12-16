import Api from '@/services/Api'
import secret from '../secret.js'

export default {
    getAllTables() {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`table/`)
    },
    getTableById(id) {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`table/${id}`)
    },
    createTable(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('table/', data)
    },
    updateTable(data, id) {
        return Api(`${secret.LARAVEL_APP_URL}`).put(`table/${id}`, data)
    },
    deleteTableById(id) {
        return Api(`${secret.LARAVEL_APP_URL}`).delete(`table/${id}`)
    }
}