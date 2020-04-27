import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path:'/login',
      name:'login',
      component:()=>import(/* webpackChunkName:'login'*/ '@/pages/login/index.vue'),
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/home/user-manage',
      component: ()=> import(/* webpackChunkName:'home'*/ '@/pages/home.vue'),
      children:[
        {
          path: '/home/user-manage',
          name: 'user-manage',
          component: ()=> import(/* webpackChunkName:'user-manage'*/ '@/pages/user-manage/index.vue')
        },
        {
          path: '/home/menu-manage',
          name: 'menu-manage',
          component: ()=> import(/* webpackChunkName:'menu-manage'*/ '@/pages/menu-manage/index.vue'),
          children:[
            {
              path: '/home/menu-manage/user',
              name:'user',
              component: ()=> import(/* webpackChunkName:'user'*/ '@/pages/menu-manage/list/user.vue'),
            }

          ]
        },
        {
          path: '/home/hot-comm-manage',
          name: 'hot-comm-manage',
          component: ()=> import(/* webpackChunkName:'hot-comm-manage'*/ '@/pages/hot-comm-manage/index.vue')
        },
        {
          path: '/home/client-manage',
          name: 'client-manage',
          component: ()=> import(/* webpackChunkName:'client-manage'*/ '@/pages/client-manage/index.vue')
        },
        {
          path: '/home/comm-classify-manage',
          name: 'comm-classify-manage',
          component: ()=> import(/* webpackChunkName:'comm-classify-manage'*/ '@/pages/comm-classify-manage/index.vue')
        },
        {
          path: '/home/order-manage',
          name: 'order-manage',
          component: ()=> import(/* webpackChunkName:'order-manage'*/ '@/pages/order-manage/index.vue')
        },
        {
          path: '/home/shop-info-manage',
          name: 'shop-info-manage',
          component: ()=> import(/* webpackChunkName:'shop-info-manage'*/ '@/pages/shop-info-manage/index.vue')
        },
        {
          path: '/home/home-pic-manage',
          name: 'home-pic-manage',
          component: ()=> import(/* webpackChunkName:'home-pic-manage'*/ '@/pages/home-pic-manage/index.vue')
        },
        {
          path: '/home/driver-info-manage',
          name: 'driver-info-manage',
          component: ()=> import(/* webpackChunkName:'driver-info-manage'*/ '@/pages/driver-info-manage/index.vue')
        },
        {
          path: '/home/comm-manage',
          name: 'comm-manage',
          component: ()=> import(/* webpackChunkName:'comm-manage'*/ '@/pages/comm-manage/index.vue')
        },
        {
          path:'/test',
          name:'test',
          component:()=>import(/* webpackChunkName:'login'*/ '@/pages/test/index.vue'),
        },
      ]
    },
  ]
})
