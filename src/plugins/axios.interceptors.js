import axios from "axios";
import store from "../store";
import router from "../router";

// probably token time out, redirect to login page.
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        store.dispatch("auth/logout").then(() => router.push('/login'))
    }
    return Promise.reject(error);
});