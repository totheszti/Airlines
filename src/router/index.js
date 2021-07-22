import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "login" */ '../views/Home')
    },
    {
        path: '/airline',
        name: 'Airline',
        component: () => import(/* webpackChunkName: "login" */ '../views/Airline')
    },
    {
        path: '/airline/edit',
        name: 'airlineEdit',
        component: () => import(/* webpackChunkName: "login" */ '../views/AirlineEdit')
    },    {
        path: '*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
