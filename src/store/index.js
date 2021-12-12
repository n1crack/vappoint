import {createStore} from 'vuex'
import {auth} from "./auth.module";
import {user} from "./user.module";
import {appointment} from "./appointment.module";


export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        user,
        appointment
    }
})