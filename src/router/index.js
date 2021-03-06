import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/users/User.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/params.vue'
import List from '../components/goods/List.vue'
import Add from '../components/goods/add.vue'
import Order from '../components/order/order.vue'
import Report from '../components/report/report.vue'
Vue.use(VueRouter)

const router = new VueRouter({
        routes: [{
            path: '/',
            redirect: '/login'
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/users', component: User },
                { path: '/rights', component: Rights },
                { path: '/roles', component: Roles },
                { path: '/categories', component: Cate },
                { path: '/params', component: Params },
                { path: '/goods', component: List },
                { path: '/goods/add', component: Add },
                { path: '/orders', component: Order },
                { path: '/reports', component: Report }
            ]
        }]
    })
    //  解决重复点击导航报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next()
    var tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router