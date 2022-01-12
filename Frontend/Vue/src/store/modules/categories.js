import Constant from '../../Constant';
// import shortid from 'shortid';
import CategoriesService from '@/services/CategoriesService'

export const categories = {
    namespaced: true,
    state: {
        
    },
    mutations: {
        [Constant.ADD_CATEGORIES]: (state, payload) => {
            state.categorieslist.push({ ...payload});
        },
        [Constant.DELETE_CATEGORIES]: (state, payload) => {
            let index = state.categorieslist.findIndex((item) => item.id === payload.id);
            state.categorieslist.splice(index, 1);
        },
        [Constant.UPDATE_CATEGORIES]: (state, payload) => {
            let index = state.categorieslist.findIndex((item) => item.id === payload.id);
            state.categorieslist[index] = payload;
        },
        [Constant.UPDATE_STATUS_CATEGORIES]: (state, payload) => {
            let index = state.categorieslist.findIndex((item) => item.id === payload.id);
            state.categorieslist[index] = payload;
        },
        [Constant.INITIALIZE_CATEGORIES]: (state, payload) => {
            if (payload) {
                state.categorieslist = payload;
            } else {
                state.categorieslist = {
                    id: "",
                    name: "",
                    image:""
                };
            }
        },
    },
    actions: {
        [Constant.ADD_CATEGORIES]: (store, payload) => {
            let formData = new FormData();

            formData.append("name",  payload.categoriesitem.name);
            formData.append("image",  payload.categoriesitem.image);

            CategoriesService.createCategory(formData)
            .then(function (res) {
                store.commit(Constant.ADD_CATEGORIES, res.data.data);
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.DELETE_CATEGORIES]: (store, payload) => {
            CategoriesService.deleteCategoryById(payload.id)
            .then(function (res) {
                if (res.data.message !== "OK") {
                    throw new Error({ 'Message': 'Ha habido algún problema al eliminar el producto' })
                }
                store.commit(Constant.DELETE_CATEGORIES, payload);
            }
            )
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.UPDATE_CATEGORIES]: (store, payload) => {
            let formData = new FormData();

            formData.append("name",  payload.categoriesitem.name);
            formData.append("image",  payload.categoriesitem.image);           
        
            CategoriesService.updateCategory(formData, payload.categoriesitem.id)
            .then(function (res) {
                store.commit(Constant.UPDATE_CATEGORIES, res.data.data[0]);
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.UPDATE_STATUS_CATEGORIES]: (store, payload) => {
            CategoriesService.changeStatusCategory(payload.categories, payload.id)
            .then(function (res) {
                store.commit(Constant.UPDATE_STATUS_CATEGORIES, res.data.data);
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.INITIALIZE_CATEGORIES]: (store) => {
            CategoriesService.getAllCategories()
            .then(function (res) {
                store.commit(Constant.INITIALIZE_CATEGORIES, res.data.data);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    getters: {
        getCategories(state) {
            return state.categorieslist;
        }
    }

}