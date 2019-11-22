import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'
import firebase from 'Firebase'
import { ipcRenderer } from 'electron'

Vue.use(Vuetify)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    store.dispatch("setUser", user).then(() => {
      return store.dispatch("initialize");
    }).then(() => {
      router.push("/")
    })
  } else {
    store.dispatch("clearData").then(() => {
      router.push("/Login")
    })
  }
});

ipcRenderer.on("message", (event, arg) => {
  console.log(arg); // prints "pong"
  store.dispatch("changeDisplayState", arg.displayState)
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
