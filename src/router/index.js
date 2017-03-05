import Vue from 'vue'
import Router from 'vue-router'
import Tchat from '../components/Tchat'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Tchat
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
