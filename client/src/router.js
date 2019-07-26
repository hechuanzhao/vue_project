import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: 'index'
        },
        {
            path: '/index',
            name: 'index',
            component: () =>
                import ('@/views/index'),
            meta: { title: '首页' },
            redirect: '/home',
            children: [{
                    path: '/home',
                    name: 'home',
                    component: () =>
                        import ('@/views/home/home'),
                    meta: { title: '首页' }
                },
                {
                    path: '/staff',
                    name: 'staff',
                    component: () =>
                        import ('@/views/staff'),
                    meta: { title: '用户信息' }
                },
                {
                    path: '/ListUser',
                    name: 'ListUser',
                    component: () =>
                        import ('@/views/ListUser'),
                    meta: { title: '信息列表' }
                },
                {
                    path: '/map',
                    name: 'map',
                    component: () =>
                        import ('@/views/map'),
                    meta: { title: '地图展示' }
                },
                {
                    path: '/FundList',
                    name: 'FundList',
                    component: () =>
                        import ('@/views/fundmanage/FundList'),
                    meta: { title: '资金流水' }
                },
                {
                    path: '/PayList',
                    name: 'PayList',
                    component: () =>
                        import ('@/views/fundmanage/PayList'),
                    meta: { title: '支付单据' }
                },
                {

                    path: '/MarkDown',
                    name: 'MarkDown',
                    component: () =>
                        import ('@/views/MarkDown'),
                    meta: { title: 'MarkDown' }
                },
                {

                    path: '/infoShow',
                    name: 'infoShow',
                    component: () =>
                        import ('@/views/infoShow'),
                    meta: { title: 'infoShow' }
                }
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/views/login')
        },
        {
            path: "/register",
            name: "register",
            component: () =>
                import ("./views/register")
        },

    ]
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false
    if (to.path === '/login' || to.path === '/register') {
        next()
    } else {
        isLogin ? next() : next('/login')
    }
})
export default router