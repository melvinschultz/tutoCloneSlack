// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Tchat from './components/Tchat'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import router from './router'
import firebase from 'firebase'
import store from './store'

Vue.config.productionTip = false

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyA7jyMRS9nCZAbsgDCwz0Og8YvifQ8HUa4',
  authDomain: 'tutocloneslack.firebaseapp.com',
  databaseURL: 'https://tutocloneslack.firebaseio.com',
  storageBucket: 'tutocloneslack.appspot.com',
  messagingSenderId: '555254229950'
}
firebase.initializeApp(config)

// window.firebase = firebase // permet de ne pas avoir à import le composant firebase dans toutes les pages

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
    Tchat,
    Login,
    Register
  }
})
