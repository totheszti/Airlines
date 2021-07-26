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
        path: '/flight/shortest',
        name: 'shortestPath',
        component: () => import(/* webpackChunkName: "shortestPath" */ '../views/ShortestPath')
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
