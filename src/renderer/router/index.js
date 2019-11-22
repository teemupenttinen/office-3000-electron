import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

function requireAuth(to, from, next){
  if (store.getters.getUser == null) {
    next('/Login');
  } else {
    next();
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/Main').default,
      beforeEnter: requireAuth
    },
    {
      path: '/Login',
      name: 'Login',
      component: require('@/components/Login').default,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
