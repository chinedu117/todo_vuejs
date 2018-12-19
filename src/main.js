// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import {store} from './store'
import EntryTemplate from '@/layout/default/EntryTemplate'
import veeValidate from 'vee-validate'

Vue.use(veeValidate)


Vue.use(Vuetify, {
  theme: {
    primary: '#21CE99',
    secondary: '#D81B60',
    accent: '#805441'
  }
})

window.eventBus = new Vue()

Vue.config.productionTip = false

router.beforeEach((to,from,next) =>
{ 
  
  if(to.matched.some(record =>record.meta.user))
  {
    if(!store.getters.loggedIn)
    {
      next({
        name: 'Login',
      })

    }else{
      next()
    }
 
  }else if(to.matched.some(record =>record.meta.visitor))
  {
    if(store.getters.loggedIn)
    { 
      // Go back to whwere you are coming from 
      // console.log(from.fullPath)
      next({ name: 'Home' })

    }else{
      next()
    }

  }else {
    next()
  }
})

// require('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons')
require('vuetify/dist/vuetify.min.css')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { EntryTemplate },
  template: '<EntryTemplate/>'
})