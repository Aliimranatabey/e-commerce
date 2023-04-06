import Vue from 'vue'
import VueRouter from 'vue-router'
import Company from '../views/Company.vue'
import Customer from '../views/Customer.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/customer',
        name: 'Customer',
        component: Customer
    },
    {
        path: '/company',
        name: 'Company',
        component: Company
            // // route level code-splitting
            // // this generates a separate chunk (about.[hash].js) for this route
            // // which is lazy-loaded when the route is visited.
            // component: () =>
            //     import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router