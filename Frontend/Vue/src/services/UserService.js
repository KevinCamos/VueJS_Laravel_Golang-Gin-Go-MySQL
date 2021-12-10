import Api from '@/services/Api'
import secret from '../secret.js'

export default {
    login(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('login/', data)
    },
    register(data) {
        console.log(data);
        return Api(`${secret.LARAVEL_APP_URL}`).post('register/', data)
    },
}
