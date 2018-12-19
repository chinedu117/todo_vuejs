import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '@/pages/LandingPage'
import TodoApp from '@/components/TodoApp'
import Login from '@/auth/Login'
import Register from '@/auth/Register'
import Logout from '@/auth/Logout'


Vue.use(VueRouter)



const Router = new VueRouter({

  mode: 'history',
  routes: [
    
    {
      path: '/',
      name: 'Home',
      component: LandingPage,
    
    },
    {
      path: '/todo',
      name: 'Todo',
      component: TodoApp,
      meta: {
        user:true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      
      props: true, //allow the component to receive props router, see register component for example
      meta: {
        visitor:true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        visitor:true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        user:true
      }
    },

  ]
})



export default Router