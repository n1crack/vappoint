import {createApp} from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './assets/tailwind.css'
import './plugins/axios.interceptors'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')

