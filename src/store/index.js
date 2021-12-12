import {createStore} from 'vuex'
import {auth} from "./auth.module";
import {user} from "./user.module";


export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        user
    }
})