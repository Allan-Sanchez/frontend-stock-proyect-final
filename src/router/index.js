import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/adminclient',
    name: 'AdminClient',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminClient/App.vue'),
    children:[
      {
        path:'home',
        name:'AdminClient-Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminClient/Home.vue'),
      },
      {
        path:'users',
        name:'AdminClient-Users',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminClient/Users.vue'),
      }
    ]
    
  },
  {
    path: '/adminprovider',
    name: 'AdminProvider',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminProvider/App.vue'),
    children:[
      {
        path:'home',
        name:'AdminProvider-Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminProvider/Home.vue'),
      },
      {
        path:'users',
        name:'AdminProvider-Users',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminProvider/Users.vue'),
      },
      {
        path:'state',
        name:'AdminProvider-State',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminProvider/State.vue'),
      }
    ]
    
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/provider-home',
    name: 'ProviderHome',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProviderHome.vue')
  },
  {
    path: '/provider-cart',
    name: 'ProviderCart',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProviderCart.vue')
  },
  {
    path: '/provider-state',
    name: 'ProviderState',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProviderState.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
