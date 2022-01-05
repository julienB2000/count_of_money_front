import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Crypto from '../views/Crypto.vue'
import News from '../views/News.vue'
import Actu from '../views/Actu.vue'
import Register from '../views/Register.vue'

// import Router from 'vue-router'
// import About from '../views/About.vue'

import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'Crypto',
    path: '/',
    component: Crypto,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    name: 'News',
    path: '/news',
    component: News,
  },
  {
    name: 'Actu',
    path: '/actu/:name',
    component: Actu,
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
