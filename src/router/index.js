import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home')
    },
    {
        path: '/city',
        name: 'City',
        component: () => import(/* webpackChunkName: "city" */ '../views/Home')
    },
    {
        path: '/city/edit',
        name: 'cityEdit',
        component: () => import(/* webpackChunkName: "cityEdit" */ '../views/CityEdit')
    },
    {
        path: '/airline',
        name: 'Airline',
        component: () => import(/* webpackChunkName: "airline" */ '../views/Airline')
    },
    {
        path: '/airline/edit',
        name: 'airlineEdit',
        component: () => import(/* webpackChunkName: "airlineEdit" */ '../views/AirlineEdit')
    },
    {
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
