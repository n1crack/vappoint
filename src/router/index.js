import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'
import Appointment from '../components/Appointment.vue'
import AppointmentCreate from '../components/AppointmentCreate.vue'
import VueRouteMiddleware from 'vue-route-middleware';
import auth from '../middleware/auth';
import guest from '../middleware/guest';

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            middleware: guest
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            middleware: auth
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            middleware: guest
        }
    },
    {
        path: '/appointment',
        name: 'Appointment',
        component: Appointment,
        meta: {
            middleware: auth
        }
    },
    {
        path: '/appointment/create',
        name: 'AppointmentCreate',
        component: AppointmentCreate,
        meta: {
            middleware: auth
        }
    },
    // {
    //   path: '/profile',
    //   name: 'Profile',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(VueRouteMiddleware());

export default router
