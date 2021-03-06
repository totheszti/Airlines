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
        path: '/routePlanning',
        name: 'RoutePlanning',
        component: () => import(/* webpackChunkName: "routePlanning" */ '../views/Home')
    },
    {
        path: '/city',
        name: 'city',
        component: () => import(/* webpackChunkName: "city" */ '../views/City')
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
        path: '/flight',
        name: 'Flight',
        component: () => import(/* webpackChunkName: "flight" */ '../views/Flight')
    },
    {
        path: '/flight/edit',
        name: 'flightEdit',
        component: () => import(/* webpackChunkName: "flightEdit" */ '../views/FlightEdit')
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
