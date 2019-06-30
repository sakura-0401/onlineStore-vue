import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLocalStorage from 'vue-localstorage'
import BootstrapVue from 'bootstrap-vue'
import './css/bootstrap.min.css'
import './css/main.css'
import axios from 'axios';


axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

Vue.use(VueRouter)
Vue.use(VueLocalStorage)
Vue.use(BootstrapVue)


// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
import Home from './pages/Home.vue'
import page404 from './pages/404.vue'
import signIn from './pages/signIn.vue'
import signUp from './pages/signUp.vue'
import profile from './pages/profile.vue'
import detail from './pages/detail.vue'
import search from './pages/search.vue'
import admin from './pages/admin.vue'
// 可以从其他文件 import 进来

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {path: '/', component: Home},
    {path: '/detail/:id', component: detail},
    {path: '/signIn', component: signIn},
    {path: '/signUp', component: signUp},
    {path: '/profile', component: profile},
    {path: '/search/:name', component: search},
    {path: '/admin', component: admin},
    {path: '*', component: page404}
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes, // （缩写）相当于 routes: routes
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    router
}).$mount('#app')