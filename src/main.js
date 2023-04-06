import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
    router,
    VueRouter,
    axios,
    vuetify: new Vuetify(),
    render: h => h(App)
}).$mount('#app')